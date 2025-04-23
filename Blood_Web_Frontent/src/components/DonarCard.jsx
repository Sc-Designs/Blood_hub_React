import React from 'react'
import DonateForm from './DonateForm';

const DonarCard = ({data, btn, fn}) => {
  return (
    <>
      <DonateForm
        modal={btn}
        dataId={data._id}
        modalfn={fn}
        name={data.reciventId.name}
      />
      <div className="w-full lg:w-[32%] flex flex-col gap-y-4 border-2 border-gray-600 rounded-lg p-5 bg-linear-to-b from-transparent from-20% to-[#67007ee8]">
        <div className="flex flex-col gap-y-2">
          <div className="w-20 aspect-square overflow-hidden rounded-full">
            <img
              src={`data:${data.reciventId.pictype};base64,${data.reciventId.profilepic}`}
              alt="Profile Image"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="font-Helvetica text-2xl">
            Name: {data.reciventId.name}
          </h1>
        </div>
        <h4 className="font-Satoshi text-2xl">RQ : {data.bloodType}</h4>
        <h4 className="font-Satoshi text-2xl">Date : {data.date}</h4>
        <h4 className="font-Satoshi text-2xl">Time : {data.time}</h4>
        <button
          onClick={() => fn(true)}
          className="bg-linear-to-t from-zinc-800 from-10% rounded-md drop-shadow-xl/25 to-red-800 py-4 font-Helvetica tracking-widest text-2xl shadow-[0_0px_35px_rgba(255,0,0,0.3)] hover:-translate-y-2 transition-all duration-200">
          Donate
        </button>
      </div>
    </>
  );
}

export default DonarCard