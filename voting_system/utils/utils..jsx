import axios from "axios";

export const BASE_URL = `http://127.0.0.1:5000`;

export const api = axios.create({
  baseURL: BASE_URL,
  responseType: "json",
  // sending of cookies to the server
  // withCredentials: true,
});

api.interceptors.request.use((req) => {
  // check if the is no auth header and then provide it
  if (!req.headers["Authorization"]) {
    const session = JSON.parse(localStorage.getItem("session"));
    req.headers["Authorization"] = `Bearer ${session?.access_token}`;
  }

  return req;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;

    // if the status is 401 it means probably the access token has expired
    // so we can try to refresh it
    if (err?.response?.status === 401 && !originalConfig._retry) {
      // retry renewing access token only once
      originalConfig._retry = true;

      // get refresh token from local storage
      const session = JSON.parse(localStorage.getItem("session"));

      // if no token, terminate the process
      if (!session.refresh_token) {
        return Promise.reject(err);
      }

      try {
        const { data } = await axios.post(
          `${BASE_URL}/refresh-access`,
          undefined,
          {
            headers: {
              Authorization: `Bearer ${session.refresh_token}`,
            },
          }
        );

        if (data?.access_token) {
          // update local storage
          session["access_token"] = data?.access_token;

          localStorage.setItem("session", JSON.stringify(session));
          // provide the new access token as the auth header
          originalConfig.headers[
            "Authorization"
          ] = `Bearer ${data?.access_token}`;
        }

        // it`s going to rerun the fetch query one more time
        return api(originalConfig);
      } catch (error) {
        // catch any errors associated with our refresh token
        // this means that it`s invalid and we need to logout the user
        localStorage.removeItem("session");
        // reload the page which will logout the user completely
        window.location.reload();
      }
    }

    return Promise.reject(err);
  }
);
