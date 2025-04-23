import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "../config/Axois";
import { UserContext } from "../context/user.context";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const res = await Axios.post("/users/login", { email, password });
      setUser(res.data.user);
      navigate("/otp");
    } catch (error) {
      setServerError(error.response?.data?.message || "Login failed");
    }
  };

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await Axios.post("/google-auth/verify", {
        token: credentialResponse.credential,
      });
      setUser(res.data);
      navigate("/otp");
    } catch (err) {
      setServerError("Google login failed. Please try again.");
      console.error("Google login failed:", err);
    }
  };

  const handleLoginError = () => {
    setServerError("Login failed. Please try again.");
    console.log("Login Failed");
  };

  return (
    <div className="w-full h-screen bg-zinc-900/70 flex justify-center items-center text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-[90%] lg:w-[40%] border-2 border-zinc-800 shadow-[0px_0px_30px_rgba(255,255,255,0.25)] px-5 py-10 rounded-lg">
        <h1 className="text-3xl font-Helvetica text-center uppercase">
          Login Now
        </h1>

        <div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="font-Satoshi mt-2 outline-none focus:border-sky-400 transition-all duration-200 border-2 border-zinc-900 bg-zinc-900 p-2 rounded w-full"
            placeholder="Enter your email..."
            type="email"
            id="email"
          />
          {errors.email && (
            <p className="text-red-500 font-Satoshi">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="font-Satoshi mt-2 outline-none focus:border-sky-400 transition-all duration-200 border-2 border-zinc-900 bg-zinc-900 p-2 rounded w-full"
            placeholder="Enter your password..."
            type="password"
            id="password"
          />
          {errors.password && (
            <p className="text-red-500 font-Satoshi">
              {errors.password.message}
            </p>
          )}
        </div>

        {serverError && (
          <p className="text-red-500 text-center">{serverError}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 rounded-md text-xl bg-sky-600 mt-5">
          Login
        </button>

        <div>
          <p className="text-center font-Satoshi text-lg">
            Don't have an account?
            <span
              onClick={() => navigate("/register")}
              className="text-sky-500 cursor-pointer">
              {" "}
              Register
            </span>
          </p>
        </div>

        <div className="flex justify-center items-center gap-2">
          <span className="w-[100px] h-[1px] bg-sky-500"></span>
          <p className="text-lg">Or</p>
          <span className="w-[100px] h-[1px] bg-sky-500"></span>
        </div>

        <div className="flex justify-center items-center gap-x-4">
          <p className="text-lg">Login with</p>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        </div>

        <div>
          <p className="text-center font-Satoshi text-lg flex flex-col gap-y-2">
            Don't remember your password?
            <span className="text-sky-500 cursor-pointer">
              {" "}
              Forget Password
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
