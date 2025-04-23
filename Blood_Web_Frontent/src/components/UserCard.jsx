import React, { useContext } from 'react'
import {receiveMessage, sendMessage} from "../config/Socket";
import { AllUsersContext } from '../context/AllUsers.context';
const UserCard = ({data}) => {
  const { setAllUsers } = useContext(AllUsersContext);
  const blockHandeler = (id)=>{
    sendMessage("blockUnblock-user", id);
    receiveMessage("Update-blockUser", (data)=>{
      setAllUsers(data)
    });
  }
  return (
    <div className="w-full py-5 px-4 flex flex-col gap-y-4 rounded-md border-2 text-white lg:w-100 lg:px-5 hover:-translate-y-2 transition-all duration-200">
      <div className="flex items-center gap-x-4">
        <div className="w-30 h-30 rounded-full overflow-hidden bg-zinc-900">
          <img
            className="w-full h-full object-cover"
            src={`data:${data.pictype};base64,${data.profilepic}`}
            alt=""
          />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-Satoshi font-semibold">{data.name}</h1>
          <h3 className="text-xs font-Helvetica opacity-50">{data.email}</h3>
        </div>
      </div>
      {data.block === true ? (
          <button 
          onClick={()=>blockHandeler(data._id)}
          className="bg-linear-to-b rounded-md shadow-[0px_15px_30px_rgba(0,208,255,0.8)] from-10% from-transparent to-sky-400 text-2xl py-2 font-Satoshi cursor-pointer">
          UnBlock User
          </button> 
          ): (
            <button
            onClick={() => blockHandeler(data._id)}
            className="bg-linear-to-b rounded-md shadow-[0px_15px_30px_rgba(255,0,0,0.8)] from-10% from-transparent to-red-400 text-2xl py-2 font-Satoshi cursor-pointer">
            Block User
            </button>
          )}
    </div>
  );
}

export default UserCard