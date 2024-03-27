import React from "react";
import "./home.css";

function home() {
  return (
    <div>
      <div className="homepage">
        <div className="text">
          <h2>
            <h1> Welcome to Kenyatta University Voting Application</h1>
            <br />
            This platform is about Empowering Democracy,
            <br /> One Vote at a Time. We believe in the power <br /> of
            democracy and the importance of every <br /> voice being heard. our
            platform is dedicated <br /> to facilitating fair, accessible, and
            transparent <br /> voting processes for all.
          </h2>
        </div>
        <div className="image">
          <img
            src="https://img.freepik.com/premium-vector/election-day-people-vote-polling-stations-people-put-ballots-box_180264-265.jpg?w=826"
            alt=""
            srcset=""
          />
        </div>
      </div>
      <h1 className="abouttext">About</h1>
      <div className="about">
        <div className="image">
          <img
            src="https://static.vecteezy.com/system/resources/previews/009/953/143/non_2x/political-candidate-cartoon-hand-drawn-illustration-with-debates-concept-for-promotion-election-campaign-active-discussion-and-get-votes-vector.jpg"
            alt=""
            srcset=""
          />
        </div>
        <div className="text">
          <h2>
            We are dedicated to facilitating fair, <br />
            accessible, and transparent voting processes for all. <br />
            Join us in shaping the future and making a difference. Explore our{" "}
            <br />
            user-friendly interface, discover upcoming elections, and exercise{" "}
            <br />
            your right to vote with confidence.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default home;
