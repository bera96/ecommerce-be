import { FormButton } from "@/components/buttons/FormButton";
import FormInput from "@/components/inputs/FormInput";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAuth } from "../utils/hooks/useAuth";
import { setUser } from "@/store/reducer";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/store";
import { useEffect } from "react";
import Logo from "@/assets/logo.png";
const Login = () => {
  const { handleLogin } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.login.user);
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async () => {
      const response = await handleLogin(values);
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
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <FormInput
            onChange={handleChange}
            value={values.email}
            label="Email address"
            type="email"
            name="email"
            autoComplete="email"
            color={errors.email ? "error" : "primary"}
            required
          />
          <p className="text-red-500">{errors.email}</p>
          <FormInput
            onChange={handleChange}
            value={values.password}
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            color={errors.password ? "error" : "primary"}
            required
          />
          <p className="text-red-500">{errors.password}</p>
          <div>
            <FormButton text="Sign in" type="button" onClick={() => handleSubmit()} />
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
