import React from 'react'
import { useNavigate } from "react-router-dom";
const Button = ({navigating, text}) => {
    const navigate = useNavigate();
  return (
    <button
      className="bg-[#0d282ecd]/80 w-fit text-white px-6 py-3 rounded-md font-Satoshi font-semibold text-2xl hover:bg-[#0d282ecb]/90 transition-all duration-300"
      onClick={() => navigate(navigating)}>
      {text}
    </button>
  );
}

export default Button