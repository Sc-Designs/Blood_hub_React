import React from "react";
import { useNavigate } from "react-router-dom";
const DonarStricks = ({ bloodGroup, date, time, id }) => {
  const navigate = useNavigate();
  return (
    <div className="border-2 border-gray-500 bg-linear-to-b from-10% from-transparent to-violet-700/80 rounded-lg p-5 lg:p-3 flex flex-col gap-y-2 w-full lg:w-[32%]">
      <h3 className="text-2xl font-Helvetica">RQ Type - {bloodGroup}</h3>
      <p className="text-2xl font-Helvetica">RQ Date - {date}</p>
      <p className="text-2xl font-Helvetica">RQ Time - {time}</p>
          <button
            onClick={() => navigate(`/map/${id}`)}
            className="w-full py-2 font-Satoshi uppercase text-xl font-semibold rounded bg-sky-400 drop-shadow-[0px_0px_20px_rgba(0,208,255,0.9)] cursor-pointer hover:bg-sky-500 transition-all duration-200">
            Map
          </button>
    </div>
  );
};

export default DonarStricks;
