import React, { useContext, useEffect } from 'react'
import { receiveMessage, sendMessage } from '../config/Socket';
import { UserContext } from '../context/user.context';
import { useNavigate } from 'react-router-dom';
import PdfDownloader from './PdfDownloader';
const Stricks = ({bloodGroup, date, time, status, id}) => {
  const {setUser} = useContext(UserContext);
  const navigator = useNavigate()
  const handelDelete = (id)=>{
    sendMessage("delete-Post",id);
  }
  useEffect(() => {
    const handleUpdate = async (data) => {
      await setUser(data);
    };

    receiveMessage("update-Post", handleUpdate);
  }, []);

  return (
    <div className="border-2 border-gray-500 bg-linear-to-b from-10% from-transparent to-violet-700/80 rounded-lg p-5 lg:p-3 flex flex-col gap-y-2 w-full lg:w-[32%]">
      <h3 className="text-2xl font-Helvetica">RQ Type - {bloodGroup}</h3>
      <p className="text-2xl font-Helvetica">RQ Date - {date}</p>
      <p className="text-2xl font-Helvetica">RQ Time - {time}</p>
      {status === "pending" ? (
        <button
          onClick={() => {
            handelDelete(id);
          }}
          className="w-full py-2 font-Satoshi uppercase text-xl font-semibold rounded bg-red-400 drop-shadow-[0px_0px_20px_rgba(158,20,0,0.9)]">
          Delete
        </button>
      ) : (
        <div className="flex gap-x-2">
          <button
            onClick={() => navigator(`/map/${id}`)}
            className="w-full py-2 font-Satoshi uppercase text-xl font-semibold rounded bg-sky-400 drop-shadow-[0px_0px_20px_rgba(0,208,255,0.9)] cursor-pointer hover:bg-sky-500 transition-all duration-200">
            Map
          </button>
          <PdfDownloader id={id} />
        </div>
      )}
    </div>
  );
}

export default Stricks