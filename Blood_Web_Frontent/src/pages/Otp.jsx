import React, { useState, useRef, useEffect, useContext } from "react";
import {UserContext} from "../context/user.context"
import Axios from "../config/Axois"
import { useNavigate } from "react-router-dom";

const Otp = () => {
    const { user } = useContext(UserContext);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const inputsRef = useRef([]);
  const intervalRef = useRef(null);
  const [error , setError] = useState(false);
  const navigate =  useNavigate()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) clearInterval(intervalRef.current);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    setOtp(["", "", "", ""]);
    setTimer(60);
    inputsRef.current[0]?.focus();
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) clearInterval(intervalRef.current);
        return prev - 1;
      });
    }, 1000);
    await Axios.post("/users/resendOtp", {email : user.email});
  };

  const otpValue = otp.join("");

  const otpSubmiter = async (e) => {
    e.preventDefault();
    try{
        if(otpValue.length == 4){
            const res = await Axios.post("/users/otp-verify",{email: user.email, otpValue});
            console.log(res.data)
            localStorage.setItem("userToken", res.data.token);
            navigate("/users/profile")
            setError(false)
        }
        else setError(true)
    }catch(err){
        console.log(err);
    }
  }

  return (
    <div className="w-full min-h-screen text-white bg-black flex justify-center items-center">
      <div className="border-2 border-zinc-700 shadow-[0px_0px_40px_rgba(255,255,255,0.1)] rounded-lg px-8 py-13 flex flex-col gap-y-10 items-center">
        <h1 className="text-4xl mb-10 font-Helvetica uppercase border-b-2 border-r-2 shadow-[15px_15px_35px_rgba(0,0,255,0.8)] border-blue-400 px-4 pb-2">
          OTP Center
        </h1>
        <form className="flex flex-col gap-y-2 items-center lg:px-5">
          <div className="flex gap-x-5">
            {otp.map((digit, index) => (
              <input
                key={index}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="bg-zinc-900 text-2xl font-Satoshi block rounded-2xl w-15 px-4 py-6 text-center outline-none transition-all duration-200 border-2 border-zinc-800 focus:border-sky-400"
                type="text"
              />
            ))}
          </div>
          {error && <p className="text-red-400 font-Satoshi">⚠️Current OTP is Not Acceptable!</p>}
          <input type="hidden" value={otpValue} />
          <button
            type="submit"
            onClick={otpSubmiter}
            className="bg-sky-600 font-Helvetica text-2xl py-4 px-26 mt-8 rounded-lg cursor-pointer transition-shadow duration-200 hover:shadow-[0px_0px_50px_rgba(0,208,255,0.85)]">
            Confirm
          </button>
        </form>

        {timer > 0 ? (
          <p>
            Resend OTP in <span className="text-blue-400">{timer}s</span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="bg-amber-600 font-Helvetica text-2xl py-4 px-18 rounded-lg cursor-pointer transition-shadow duration-200 hover:shadow-[0px_0px_30px_rgba(255,128,0,0.85)]">
            Re-Send OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default Otp;
