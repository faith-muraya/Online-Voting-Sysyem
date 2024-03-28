import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../utils/utils.";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  VStack,
  Center,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import toast from "react-hot-toast";

// Validation schema using Yup
const schema = Yup.object().shape({
  adm_no: Yup.string().required("Admission number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  role: Yup.string().required("Role is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (values, { resetForm }) => {
    try {
      setIsLoading(true);
      const res = await api.post("register", values);

      toast.success(res.data.message);
      // reset form
      resetForm();
      // Redirect to login page
      navigate("/");
    } catch (error) {
      const data = error.response.data;

      toast.error(data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center
      h="100vh"
      bgImage="url('https://media.istockphoto.com/id/1474020789/photo/autonomous-community-of-madrid-elections-democraty-referendum-for-government-vote-hand-posing.webp?b=1&s=170667a&w=0&k=20&c=Xki8Aq9OrBaG0d55XSHzDBk6jLB5U16Ki8W22rGLkBg=')"
      bgSize="cover"
    >
      <Box p={4} borderRadius="md" bg="rgba(255, 255, 255, 0.8)" shadow="md">
        <Formik
          initialValues={{
            adm_no: "",
            email: "",
            role: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={schema}
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
                      Enter admission number
                    </label>
                    <Input
                      {...field}
                      placeholder="Admission number"
                      color="black"
                    />
                    <FormErrorMessage>{form.errors.adm_no}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <label style={{ color: "black" }}>Enter Email</label>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email"
                      color="black"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="role">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.role && form.touched.role}
                  >
                    <label style={{ color: "black" }}>Enter role: Member</label>
                    <Input {...field} placeholder="Role" color="black" />
                    <FormErrorMessage>{form.errors.role}</FormErrorMessage>
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
                        color="black"
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label={
                            showPassword ? "Hide Password" : "Show Password"
                          }
                          icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          onClick={() => setShowPassword(!showPassword)}
                          variant="ghost"
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="confirmPassword">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.confirmPassword &&
                      form.touched.confirmPassword
                    }
                  >
                    <label style={{ color: "black" }}>Confirm Password</label>
                    <InputGroup>
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        color="black"
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label={
                            showConfirmPassword
                              ? "Hide Password"
                              : "Show Password"
                          }
                          icon={
                            showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />
                          }
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          variant="ghost"
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {form.errors.confirmPassword}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button colorScheme="green" type="submit" isLoading={isLoading}>
                Sign Up
              </Button>
              <Link to="/">
                <p style={{ color: "black" }}>Already have an account?</p>
                <br />
                <Button colorScheme="teal" borderRadius="md">
                  log in
                </Button>
              </Link>
            </VStack>
          </Form>
        </Formik>
      </Box>
    </Center>
  );
};

export default Signup;
