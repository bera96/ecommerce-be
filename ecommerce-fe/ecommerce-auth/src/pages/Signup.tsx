import { FormButton } from "../components/buttons/FormButton";
import FormInput from "../components/inputs/FormInput";
import { useAuth } from "../utils/hooks/useAuth";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setUser } from "../store/reducer";
import { useAppSelector } from "../store/store";
import { useEffect } from "react";
import Logo from "../assets/logo.png";
import React from "react";

const Signup: React.FC<{}> = () => {
  const { handleSignup } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.login.user);
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async () => {
      const response = await handleSignup(values);
      if (response) {
        dispatch(setUser(response));
      }
    },
  });

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/products");
    }
  }, [user]);

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src={Logo} className="mx-auto h-10 w-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <FormInput
            label="First Name"
            type="text"
            name="firstName"
            autoComplete="firstName"
            required
            onChange={handleChange}
            value={values.firstName}
            color={errors.firstName ? "error" : "primary"}
          />
          <p className="text-red-500">{errors.firstName}</p>
          <FormInput
            label="Last Name"
            type="text"
            name="lastName"
            autoComplete="lastName"
            required
            onChange={handleChange}
            value={values.lastName}
            color={errors.lastName ? "error" : "primary"}
          />
          <p className="text-red-500">{errors.lastName}</p>
          <FormInput
            label="Email address"
            type="email"
            name="email"
            autoComplete="email"
            required
            onChange={handleChange}
            value={values.email}
            color={errors.email ? "error" : "primary"}
          />
          <p className="text-red-500">{errors.email}</p>
          <FormInput
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            required
            onChange={handleChange}
            value={values.password}
            color={errors.password ? "error" : "primary"}
          />
          <p className="text-red-500">{errors.password}</p>
          <div>
            <FormButton text="Sign up" type="button" onClick={() => handleSubmit()} />
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
