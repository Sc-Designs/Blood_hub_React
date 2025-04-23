import React from 'react'

const Para = ({H6,Icon,Para}) => {
  return (
    <div className="flex flex-col lg:mx-20 items-start justify-center lg:bg-linear-to-b from-30% from-transparent to-[#c300ff7d] gap-y-4 lg:border-2 border-zinc-700 lg:rounded-lg lg:py-4 w-fit lg:gap-y-5 text-white px-4 lg:px-10">
      <h6 className="text-5xl font-Helvetica flex gap-x-2">
        {Icon}
        {H6}
      </h6>
      <p className="font-Satoshi text-3xl italic opacity-75 px-2">{Para}</p>
    </div>
  );
}

export default Para