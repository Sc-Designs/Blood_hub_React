import React from 'react'

const AboutCards = ({src,name,role,para}) => {
  return (
    <div className="border-2 border-gray-500 rounded py-2 px-2 flex flex-col lg:flex-row-reverse gap-x-4 gap-y-2 items-center justify-between bg-linear-to-b from-10% from-transparent to-sky-700/80 ">
      <div className="w-full lg:w-1/3 aspect-square overflow-hidden">
        <img
          src={src}
          alt="Profile Pic"
          className="object-cover h-full w-full object-[25%_25%] transition-all duration-300 lg:hover:scale-110"
        />
      </div>
      <div className="flex flex-col gap-y-2 w-full lg:w-2/4 lg:gap-y-5">
        <h1 className="text-3xl font-bold font-Helvetica">{name}</h1>
        <h1 className="text-2xl font-semibold font-Satoshi">Role: {role}</h1>
        <h1 className="text-2xl font-semibold font-Satoshi">Department: BCA </h1>
        <h1 className="text-2xl font-semibold font-Satoshi">
          College : ABS Accademy Science, Technology & Management
        </h1>
        <p className="text-xl text-gray-300">{para}</p>
      </div>
    </div>
  );
}

export default AboutCards