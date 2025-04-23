import React from 'react'
import Navbar from '../utils/Navbar'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Animate from "../components/Animate";
const ContactUs = () => {
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
      console.log(data);
      navigate("/users/profile")
    };
  return (
    <Animate>
    <div className="w-full min-h-screen bg-black">
      <Navbar
        field={[
          { link: "/users/profile", name: "Profile" },
          { link: "/", name: "Home" },
          { link: "/donate/request-list", name: "Donate" },
          { link: "/reciver/blood", name: "Blood" },
          { link: "/about", name: "About" },
        ]}
      />
      <div className="w-full h-screen flex justify-center items-center text-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-[90%] lg:w-[40%]">
          <div>
            <label className="font-Helvetica text-xl" htmlFor="name">
              Name:
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="font-Satoshi mt-2 outline-none border p-2 rounded w-full "
              placeholder="Enter your name..."
              type="text"
              id="name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="font-Helvetica text-xl" htmlFor="email">
              Email:
            </label>
            <input
              placeholder="Enter your email..."
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="font-Satoshi mt-2 border p-2 rounded w-full outline-none"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="font-Helvetica text-xl" htmlFor="message">
              Message:{" "}
            </label>
            <textarea
              name=""
              id="message"
              className="font-Satoshi border p-2 mt-2 rounded w-full outline-none h-50"
              placeholder="Enter your message..."
              {...register("message", {
                required: "Message is required",
              })}></textarea>
            {errors.message && (
              <p className="text-red-500">{errors.message.message}</p>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)();
            }}
            type="submit"
            className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
    </Animate>
  );
}

export default ContactUs