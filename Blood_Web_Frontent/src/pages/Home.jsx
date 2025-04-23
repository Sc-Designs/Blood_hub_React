import React from 'react'
import Navbar from "../utils/Navbar"
import { FaHandHoldingHeart } from "react-icons/fa";
import { LuMapPinCheck } from "react-icons/lu";
import { TiPinOutline } from "react-icons/ti";
import Para from '../components/Para';
import { MdAutoGraph } from "react-icons/md";
import Button from '../components/Button';
import Footer from '../components/Footer';
import Animate from "../components/Animate";

const Home = () => {
  return (
    <Animate>
    <div className="w-full min-h-[100vh] bg-black">
      <Navbar
        field={[
          { link: "/users/profile", name: "Profile" },
          { link: "/donate/request-list", name: "Donate" },
          { link: "/reciver/blood", name: "Blood" },
          { link: "/about", name: "About" },
          { link: "/users/contactUs", name: "Contact Us" },
        ]}
      />
      <div className="w-full h-screen">
        <div className="w-full h-full flex items-center justify-center">
          <div
            id="view_1"
            className="w-full h-screen px-2 flex flex-col items-center justify-center gap-y-20 lg:gap-y-4 text-white">
            <h1 className="text-7xl lg:text-8xl drop-shadow-[0px_0px_20px_rgba(0,0,0,0.9)] text-center lg:whitespace-nowrap font-Helvetica font-bold">
              Welcome to <span className="italic">Blood_Hub</span>
            </h1>
            <Button navigating={"/users/profile"} text={"Join With Us"} />
          </div>
        </div>
      </div>
      <div className="w-full min-h-screen flex flex-col items-start justify-center gap-y-20 py-2">
        <div className="w-full h-full flex flex-col items-center justify-center gap-y-20 lg:gap-y-18 px-4 lg:px-10">
          <h1 className="text-6xl lg:text-7xl text-white font-Helvetica font-bold lg:w-[90%]">
            Welcome to LifeSaver – Connecting Blood Donors & Receivers
          </h1>
          <p className="text-2xl lg:text-3xl tracking-tight text-white font-Satoshi font-normal lg:w-[90%] opacity-75 italic">
            Every drop counts! LifeSaver is a platform that bridges the gap
            between those in need of blood and willing donors. Whether you're
            looking to donate or find a donor, our easy-to-use system helps you
            connect instantly.
          </p>
        </div>
        <div className="flex flex-col gap-y-15 py-5 lg:gap-x-10 lg:flex-row">
          <Para
            H6={"Become a Lifesaver -"}
            Icon={<FaHandHoldingHeart />}
            Para={
              "Sign up as a donor and help save lives in just a few clicks."
            }
          />
          <Para
            H6={"Location-Based Matching -"}
            Icon={<LuMapPinCheck />}
            Para={"Connect with donors and recipients effortlessly with Map."}
          />
        </div>
      </div>
      <div className="w-full h-fit font-Helvetica text-white flex items-center text-7xl text-center">
        <p className="py-20 lg:py-40 lg:px-20 leading-20 italic opacity-45">
          "The blood you donate today may be the gift of life for someone
          tomorrow."
        </p>
      </div>
      <div className="flex flex-col gap-y-15 py-5 lg:gap-x-10 lg:flex-row">
        <Para
          H6={"Our Mission"}
          Icon={<TiPinOutline />}
          Para={
            "To create a safe, sustainable, and transparent community that empowers people to contribute to the fight against low Blood supply in high demand."
          }
        />
        <Para
          H6={"Our Vision"}
          Icon={<MdAutoGraph />}
          Para={
            "To create a global community that uses technology to empower people to contribute Blood for save the life and called as a LifeSaver."
          }
        />
      </div>
      <div className="w-full h-fit px-4 lg:px-30 py-10 flex flex-col text-white gap-y-10">
        <h1 className="text-6xl lg:text-8xl lg:leading-30  font-Helvetica">
          So Why you watting, <br className="hidden lg:block" /> Hurry and Join
          Us Today!
        </h1>
        <Button navigating={"/users/profile"} text={"Sign Up As a LifeSaver"} />
      </div>
      <Footer />
    </div>
    </Animate>
  );
}

export default Home