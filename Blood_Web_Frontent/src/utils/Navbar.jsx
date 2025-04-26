import React, {useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TbMenu } from "react-icons/tb";
import { CgCloseR } from "react-icons/cg";
const Navbar = ({ field }) => {
  const [sidenav, setSidenav] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) return;

    if (sidenav) {
      ref.current.classList.add("left-0");
      ref.current.classList.remove("left-[100%]");
    } else {
      ref.current.classList.remove("left-0");
      ref.current.classList.add("left-[100%]");
    }
  }, [sidenav]);
  const handelLogOut = ({link})=>{
    if(link == "/adminLogout"){
      localStorage.removeItem("adminToken");
      navigate("/admin/login");
    } else {
      localStorage.removeItem("userToken");
      navigate("/login")
    }
  }
  return (
    <div className="w-full pr-5 lg:pr-20 py-4 flex justify-end backdrop-blur-sm fixed top-0 z-40">
      <div className="hidden lg:flex gap-10 text-xl font-Satoshi font-medium cursor-pointer text-white">
        {field.map((item, index) => {
          if (item.name !== "Logout") {
            return (
              <Link key={index} to={item.link}>
                {item.name}
              </Link>
            );
          } else {
            return (
              <button onClick={()=> handelLogOut({link: item.link})} key={index}>
                Logout
              </button>
            );
          }
        })}
      </div>
      <div className="block lg:hidden text-4xl text-white cursor-pointer">
        <TbMenu onClick={() => setSidenav(true)} />
      </div>
      <div
        ref={ref}
        className="fixed flex flex-col items-center justify-center gap-y-15 text-4xl uppercase transition-all duration-300 ease-in-out bg-black text-white top-0 left-[100%] w-full h-screen z-50 lg:hidden">
        <CgCloseR
          onClick={() => setSidenav(false)}
          className="absolute top-5 right-5 text-5xl"
        />
        {field.map((item, index) => {
          if (item.name !== "Logout") {
            return (
              <Link key={index} to={item.link}>
                {item.name}
              </Link>
            );
          } else {
            return (
              <button
                onClick={() => handelLogOut({ link: item.link })}
                key={index}>
                Logout
              </button>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Navbar