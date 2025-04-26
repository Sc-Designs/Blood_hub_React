import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../utils/Navbar'
import { PiGooglePhotosLogoFill } from "react-icons/pi";
import Scales from '../components/Scales';
import AddRequest from '../components/AddRequest';
import Stricks from '../components/Stricks';
import { UserContext } from '../context/user.context';
import UploadForm from '../components/UploadForm';
import { receiveMessage } from '../config/Socket';
import BlockInterface from '../components/BlockInterface';
import Animate from '../components/Animate';
import { MdVerified } from "react-icons/md";
import DonarStricks from '../components/DonarStricks';
import Form from "../components/Form"

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [userDets, setUserDets] = useState(user);
  const [picModal, setPicModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  
  useEffect(()=>{
    receiveMessage("allPost",(data)=>{
      setUser(data);
      setUserDets(data)
    })
    
    receiveMessage("reciver-update", (data) => {
      setUser(data)
      setUserDets(data)
    });

    receiveMessage("updateBlock-center", (data)=>{
      setUser(data)
      setUserDets(data)
    });
  },[])

  useEffect(()=>{
      setUserDets(user)
  },[user])

  useEffect(() => {
    if (userDets?.number === null) {
      setFormModal(true);
    }
  }, [userDets?.number]);

  return (
    <Animate>
      {formModal &&
        <Form fn={setFormModal} />
      }
      <div className="bg-zinc-900/70 w-full h-fit text-white">
        <Navbar
          field={[
            { link: "/", name: "Home" },
            { link: "/donate/request-list", name: "Donate" },
            { link: "/reciver/blood", name: "Blood" },
            { link: "/about", name: "About" },
            { link: "/users/contactUs", name: "Contact Us" },
            { link: "/login", name: "Logout" },
          ]}
        />
        <div className="flex flex-col pt-20 gap-y-7 items-center lg:flex-row lg:justify-center lg:gap-x-70">
          {picModal && <UploadForm fn={setPicModal} email={userDets.email} />}
          <div className="flex flex-col items-center">
            <div className="w-62 h-62  rounded-full relative flex items-center justify-center">
              {userDets?.profilepic && userDets?.pictype && (
                <img
                  src={`data:${userDets.pictype};base64,${userDets.profilepic}`}
                  alt="Profile"
                  className="w-62 h-62 rounded-full object-cover"
                />
              )}
              <PiGooglePhotosLogoFill
                onClick={() => {
                  setPicModal(!picModal);
                }}
                className="absolute z-20 text-white bg-zinc-800 text-7xl bottom-0 right-0 rounded-full p-2 cursor-pointer"
              />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-3xl font-Satoshi">{userDets.name}</h3>
              <p className="text-gray-500 font-Helvetica text-xl">
                {userDets.email}
              </p>
            </div>
          </div>
          <div className="border-2 border-gray-500 rounded-lg p-5 flex flex-col gap-y-1 ml-5 mr-5 lg:w-1/3">
            <h3 className="text-3xl font-Helvetica">Welcome Message to</h3>
            <h3 className="text-3xl font-Helvetica">{userDets.name}</h3>
            <p className="font-Satoshi text-2xl pt-5">
              Welcome to{" "}
              <b>
                <i>Blood_Hub</i>
              </b>{" "}
              ! ❤️
              <br /> Thank you for joining us in saving lives. Whether you're
              donating or searching for a donor, your support matters. Together,
              we will make a better India. Enjoy your day, Thank You! 🤗
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-5 gap-x-10 items-start mt-10 mb-2 border-2 border-gray-500 rounded-lg p-5 mx-5">
          <h1 className="font-Helvetica text-4xl">Your Streaks Info</h1>
          <div className="flex flex-col gap-y-5 lg:flex-row lg:justify-between lg:w-full lg:px-4">
            <Scales
              text={"Donate"}
              count={userDets.Donate.length}
              para={"Time"}
            />
            <Scales
              text={"Blood Requests"}
              count={userDets.bloodRequest.length}
              para={"Time"}
            />
            <div className="flex flex-col items-start gap-y-3">
              <h3 className="text-4xl font-Helvetica">Verified</h3>
              {userDets.verified && (
                <p className="text-5xl font-Helvetica flex gap-x-2 ">
                  <MdVerified className="text-sky-400/80" />
                  <span className="font-Satoshi text-4xl"> Yes</span>
                </p>
              )}
            </div>
            <div className="flex flex-col items-start gap-y-3">
              <h3 className="text-4xl font-Helvetica">Blood Group</h3>
              <p className="text-5xl font-Helvetica flex gap-x-2 text-red-400/80">
                {userDets.bloodgroup}
              </p>
            </div>
          </div>
        </div>
        <div className="px-5 py-2 flex justify-center">
          {userDets.block === true ? <BlockInterface /> : <AddRequest />}
        </div>
        <div className="px-5 py-2">
          <div className="border-2 border-gray-500 rounded-lg p-5 flex flex-col gap-y-5">
            <h1 className="font-Helvetica text-4xl">Your All Request</h1>
            <div
              id="scroller"
              className={`min-h-10 max-h-96 w-full ${
                userDets.block === true
                  ? "opacity-20 pointer-events-none"
                  : "opacity-100 pointer-events-auto"
              } p-2 border-2 border-gray-500 rounded-lg overflow-y-auto flex flex-col gap-y-5 lg:gap-y-2 lg:gap-x-2 lg:flex-row lg:flex-wrap`}>
              {[...(userDets?.bloodRequest || [])]
                .filter((item) => item?.date && item?.time)
                .sort((a, b) => {
                  const getDateTime = (item) =>
                    new Date(
                      `${item.date.split("/").reverse().join("-")} ${item.time}`
                    );
                  return getDateTime(b) - getDateTime(a);
                })
                .map((item, index) => (
                  <Stricks
                    key={index}
                    bloodGroup={item.bloodType}
                    date={item.date}
                    time={item.time}
                    status={item.status}
                    id={item._id}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="px-5 py-2">
          <div className="border-2 border-gray-500 rounded-lg p-5 flex flex-col gap-y-5">
            <h1 className="font-Helvetica text-4xl">Your All Donation</h1>
            <div
              id="scroller"
              className={`min-h-10 max-h-96 w-full ${
                userDets.block === true
                  ? "opacity-20 pointer-events-none"
                  : "opacity-100 pointer-events-auto"
              } p-2 border-2 border-gray-500 rounded-lg overflow-y-auto flex flex-col gap-y-5 lg:gap-y-2 lg:gap-x-2 lg:flex-row lg:flex-wrap`}>
              {[...(userDets?.Donate || [])]
                .filter((item) => item?.date && item?.time)
                .sort((a, b) => {
                  const getDateTime = (item) =>
                    new Date(
                      `${item.date.split("/").reverse().join("-")} ${item.time}`
                    );
                  return getDateTime(b) - getDateTime(a);
                })
                .map((item, index) => (
                  <DonarStricks
                    key={index}
                    bloodGroup={item.bloodType}
                    date={item.date}
                    time={item.time}
                    id={item._id}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </Animate>
  );
}

export default Profile