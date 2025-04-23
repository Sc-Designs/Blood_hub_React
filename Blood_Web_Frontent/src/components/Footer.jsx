import React from 'react'
import Button from './Button';

const Footer = () => {
  return (
    <>
      <div className="w-full h-fit py-7 px-10 gap-y-10 text-white bg-zinc-900 flex flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-y-5">
          <h1 className="font-Helvetica text-4xl lg:text-2xl">Service</h1>
          <Button navigating={"/donate/request-list"} text={"Donation"} />
          <Button navigating={"/reciver/blood"} text={"Receiver"} />
        </div>
        <div className="flex flex-col gap-y-5">
          <h1 className="font-Helvetica text-4xl lg:text-2xl">Helps</h1>
          <Button navigating={"/admin"} text={"Admin"} />
          <Button navigating={"/users/contactUs"} text={"Contact"} />
        </div>
        <div className="flex flex-col gap-y-5">
          <h1 className="font-Helvetica text-4xl lg:text-2xl">Legal</h1>
          <a
            className="text-2xl px-6 py-3 bg-[#0f172a] w-fit"
            href="src/assets/pdfs/Terms of Use.pdf"
            download="Terms Of Use">
            Terms of Use
          </a>
          <a
            className="text-2xl px-6 py-3 bg-[#0f172a] w-fit"
            href="src/assets/pdfs/Privacy Policy.pdf"
            download="Privacy Policy">
            Privacy Policy
          </a>
          <a
            className="text-2xl px-6 py-3 bg-[#0f172a] w-fit"
            href="src/assets/pdfs/Cookie Policy.pdf"
            download="Cookie Policy">
            Cookie Policy
          </a>
        </div>
      </div>
      <p className="bg-zinc-900 text-white text-center py-2 font-Satoshi text-2xl">
        © copyright reserve by Blood_hub
      </p>
    </>
  );
}

export default Footer