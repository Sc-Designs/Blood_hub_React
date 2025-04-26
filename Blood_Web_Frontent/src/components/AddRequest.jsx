import React, { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { CgCloseR } from "react-icons/cg";
import {sendMessage} from "../config/Socket";
const AddRequest = () => {
  const [Mortal, setMortal] = useState(false);
  const ref = useRef();
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitFrom = (data)=>{
    try{
      const {bloodGroup, number} = data;
      const fromHandeler = async ()=> {
      sendMessage("blood-request",{bloodGroup, number});
      document.querySelector("#selection").selectedIndex = 0;
      document.querySelector("#number").value = "";
    }
    fromHandeler();
    setMortal(false);
    }catch(err){
        console.log(err);
    }
  }
    useEffect(() => {
      if (!ref.current) return;

      if (Mortal) {
        ref.current.classList.add("block");
        ref.current.classList.remove("hidden");
      } else {
        ref.current.classList.remove("block");
        ref.current.classList.add("hidden");
      }
    }, [Mortal]);
  return (
    <div className="border-2 border-gray-500 rounded-lg p-5 flex flex-col gap-y-10 lg:flex-row lg:justify-between lg:items-center w-full lg:px-4">
      <h1 className="font-Helvetica text-5xl text-center lg:text-4xl">
        Add Blood Request
      </h1>
      <button
        onClick={() => setMortal(true)}
        className="font-Satoshi text-3xl bg-linear-to-b from-10% from-red-300/60 to-red-500/90 py-4 rounded-2xl lg:px-10 lg:py-2 lg:rounded-xl lg:font-semibold">
        Add Request
      </button>
      <div
        ref={ref}
        className="hidden fixed top-0 left-0 w-full h-screen backdrop-blur-3xl z-50">
        <div className="border-2 w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-gray-500 rounded-lg pt-25 px-5 pb-10 flex flex-col gap-y-10 lg:gap-y-5 bg-zinc-900 lg:justify-between lg:items-center lg:w-[40%] lg:px-4">
          <CgCloseR
            onClick={() => setMortal(false)}
            className="absolute top-5 right-5 text-5xl cursor-pointer z-50"
          />
          <form
            className="flex flex-col gap-y-5 w-full"
            onSubmit={handleSubmit(submitFrom)}>
            <select
              id="selection"
              {...register("bloodGroup", {
                required: "Please select a blood group",
                validate: (value) =>
                  value !== "default" || "Please select a valid blood group",
              })}
              className="bg-zinc-800 w-full text-white text-xl font-Satoshi py-4 px-4 rounded-lg border-2 border-gray-500 outline-none">
              <option value="default">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            {errors.number && (
              <p className="text-red-500 text-xl font-Satoshi">
                {errors.number.type === "minLength"
                  ? "Number must be exactly 10 digits"
                  : "Phone number is required"}
              </p>
            )}

            <input
              id="number"
              type="number"
              placeholder="Enter Number"
              {...register("number", { required: true, minLength: 10 })}
              maxLength={10}
              className="bg-zinc-800 w-full text-white text-xl font-Satoshi py-4 px-4 rounded-lg border-2 border-gray-500 outline-none tracking-widest"
            />
            <button
              type="submit"
              className="bg-zinc-800 text-white text-3xl font-Helvetica py-4 px-4 lg:px-10 lg:py-2 rounded-lg border-2 border-gray-500 outline-none">
              Confirm
            </button>
          </form>
          <p className="text-gray-500 text-xl font-Satoshi text-center">
            By clicking confirm, you agree to our terms and conditions.
            <br /> Thank you for your request! We will notify you when we find a
            match for you.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddRequest