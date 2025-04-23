import React from 'react'
import { LiaUserClockSolid } from "react-icons/lia";
import { PiConfettiBold } from "react-icons/pi";
const RequestCard = ({data ,user}) => {
  return (
    <div className="w-full lg:w-[32%] flex flex-col gap-y-4 border-2 border-gray-600 rounded-lg p-5 bg-linear-to-t from-[#8f00c776] to-transparent">
      <div className="flex flex-col gap-y-1">
        <div className="w-20 aspect-square overflow-hidden rounded-full">
          <img
            src={`data:${user.pictype};base64,${user.profilepic}`}
            alt="Profile Image"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="font-Helvetica text-2xl">Name: {user.name}</h1>
        <h1 className="font-Satoshi text-xl text-gray-500">id : {user._id}</h1>
      </div>
      <h4 className="font-Satoshi text-2xl">RQ : {data.bloodType}</h4>
      <h4 className="font-Satoshi text-2xl">Date : {data.date}</h4>
      <h4 className="font-Satoshi text-2xl">Time : {data.time}</h4>
      {data.status === "pending" ? (
        <button className="bg-orange-400 shadow-[0_0px_70px_rgb(255,137,4,0.7)] py-4 font-Helvetica text-2xl flex gap-x-2 items-center justify-center">
          <LiaUserClockSolid />
          Pending
        </button>
      ) : (
        <button className="bg-green-400 shadow-[0_0px_70px_rgba(5,223,114,0.7)] py-4 font-Helvetica text-2xl flex gap-x-2 items-center justify-center">
          <PiConfettiBold />
          Accepted
        </button>
      )}
    </div>
  );
}

export default RequestCard