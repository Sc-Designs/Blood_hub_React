import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.context";
import Axios from "../config/Axois";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useContext(UserContext);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const { name, email, password } = data;
    try {
      const res = await Axios.post("/users/register", {name, email, password });
      setUser(res.data.user);
      navigate("/otp");
    } catch (error) {
      setServerError(error.response?.data?.message || "Register failed");
    }
  };
  const googleHandel = () => {
    
  }
  return (
    <div className="w-full min-h-screen text-white bg-black flex justify-center items-center">
      <div className="border-2 border-zinc-800 flex flex-col gap-y-5 items-center w-[90%] lg:w-[40%] shadow-[0px_0px_30px_rgba(255,255,255,0.25)] rounded-md py-10 lg:py-5 px-5">
        <h1 className="font-Helvetica text-xl uppercase">
          Register Your Self Today
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[98%] py-5 flex flex-col gap-y-5 items-center">
          <div className="w-[90%]">
            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 6,
                  message: "Name must be at least 6 characters",
                },
              })}
              type="text"
              className="bg-zinc-900 border border-zinc-900 focus:border-sky-400 outline-none transition-all duration-200 px-2 py-2 block w-full rounded-md"
              placeholder="Name...."
            />
            {errors.password && (
              <p className="text-red-500 font-Satoshi">{errors.name.message}</p>
            )}
          </div>
          <div className="w-[90%]">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className="bg-zinc-900 border border-zinc-900 focus:border-sky-400 outline-none transition-all duration-200 px-2 py-2 block w-full rounded-md"
              placeholder="Email...."
            />
            {errors.password && (
              <p className="text-red-500 font-Satoshi">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="w-[90%]">
            <input
              type="password"
              className="bg-zinc-900 border border-zinc-900 focus:border-sky-400 outline-none transition-all duration-200 px-2 py-2 block w-full rounded-md"
              placeholder="Password...."
            />
            {errors.password && (
              <p className="text-red-500 font-Satoshi">
                {errors.password.message}
              </p>
            )}
          </div>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            className="bg-zinc-900 border border-zinc-900 focus:border-sky-400 outline-none transition-all duration-200 px-2 py-2 block w-[90%] rounded-md"
            placeholder="Confirm password...."
          />
          <button
            type="submit"
            className="bg-sky-600 text-2xl py-2 w-[90%] rounded-md mt-5">
            Confirm
          </button>
          {serverError && (
            <p className="text-red-500 text-center">{serverError}</p>
          )}
        </form>
        <div className="w-[90%] flex gap-x-2 items-center">
          <div className="h-[1.5px] w-full bg-sky-400"></div>
          <h1 className="font-Satoshi text-2xl">Or</h1>
          <div className="h-[1.5px] w-full bg-sky-400"></div>
        </div>
        <div className="flex w-[90%] gap-x-3 lg:gap-x-5 justify-center">
          <h1 className="font-Helvetica text-2xl lg:text-xl">Register with</h1>
          <button
            onClick={googleHandel}
            className="font-Satoshi text-xl text-sky-500 cursor-pointer">
            Google
          </button>
        </div>
        <div className="flex w-[90%] gap-x-3 lg:gap-x-10 justify-center">
          <h1 className="font-Helvetica text-lg lg:text-xl">
            Already have an account ?
          </h1>
          <button
            onClick={() => navigate("/login")}
            className="font-Satoshi text-xl text-sky-500 cursor-pointer">
            Login
          </button>
        </div>
        <div>
          <p className="text-center font-Satoshi text-lg">
            By signing up, you agree to our{" "}
            <span className="text-sky-500">Terms of Service</span> and{" "}
            <span className="text-sky-500">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
