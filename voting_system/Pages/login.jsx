import React, { useState, useContext } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  VStack,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { api } from "../utils/utils.";

// Using yup for validation
const validationSchema = Yup.object().shape({
  adm_no: Yup.string().required("Admission number is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values, { resetForm }) => {
    try {
      setIsLoading(true);
      const res = await api.post("login", values);

      toast.success(res.data.message);
      // reset form
      resetForm();
      // 1. store inside local storage
      localStorage.setItem("session", JSON.stringify(res.data));
      setIsAuthenticated(true);
      // 2. navigate user to homepage
      navigate("/home");
    } catch (error) {
      const data = error.response.data;

      toast.error(data.message);
      console.log("Unable to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      bgImage="url('https://media.istockphoto.com/id/1474020789/photo/autonomous-community-of-madrid-elections-democraty-referendum-for-government-vote-hand-posing.webp?b=1&s=170667a&w=0&k=20&c=Xki8Aq9OrBaG0d55XSHzDBk6jLB5U16Ki8W22rGLkBg=')"
      bgSize="cover"
      bgPosition="center"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box p={4} borderRadius="md" bg="rgba(255,255,255,0.8)" shadow="md">
        <Formik
          initialValues={{
            adm_no: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <VStack spacing={4} align="stretch">
              <Field name="adm_no">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.adm_no && form.touched.adm_no}
                  >
                    <label style={{ color: "black" }}>
                      Enter your admission number
                    </label>
                    <Input
                      {...field}
                      placeholder="admission number"
                      borderRadius="md"
                      borderColor="black"
                      _placeholder={{ color: "black" }}
                      _focus={{ borderColor: "black" }}
                      color="black"
                    />
                    <FormErrorMessage>{form.errors.adm_no}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <label style={{ color: "black" }}>Enter Password</label>
                    <InputGroup>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        borderRadius="md"
                        borderColor="black"
                        _placeholder={{ color: "black" }}
                        _focus={{ borderColor: "black" }}
                        color="black"
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          variant="ghost"
                          onClick={() => setShowPassword(!showPassword)}
                          icon={
                            showPassword ? (
                              <AiFillEyeInvisible />
                            ) : (
                              <AiFillEye />
                            )
                          }
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                colorScheme="green"
                type="submit"
                isLoading={isLoading}
                borderRadius="md"
              >
                Log In
              </Button>
              <Link to="/signup">
                <p style={{ color: "black" }}>Don't have an account?</p>
                <br />
                <Button colorScheme="teal" borderRadius="md">
                  Sign Up
                </Button>
              </Link>
            </VStack>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
