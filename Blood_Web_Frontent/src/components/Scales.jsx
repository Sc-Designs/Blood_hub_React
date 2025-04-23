import React from 'react'

const Scales = ({text,count, para}) => {
  return (
    <div className="flex flex-col items-start gap-y-3">
        <h3 className='text-4xl font-Helvetica'>{text}</h3>
        <p className='text-5xl font-Helvetica text-sky-400/80'>{count}<span className='font-Satoshi text-4xl text-white'> {para}</span></p>
    </div>
  )
}

export default Scales