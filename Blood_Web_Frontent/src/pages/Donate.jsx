import React, { useContext, useEffect, useState } from "react";
import Navbar from "../utils/Navbar";
import DonarCard from "../components/DonarCard";
import Axios from "../config/Axois";
import { DonarContext } from "../context/donate.context";
import { receiveMessage } from "../config/Socket";
import { CiNoWaitingSign } from "react-icons/ci";
import Animate from "../components/Animate";

const Donate = () => {
  const { DonatePost, setDonatePost } = useContext(DonarContext);
  const [post, SetPost] = useState(DonatePost);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.post("/donar/donateDets");
        const sorted = [...res.data].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setDonatePost(sorted);
        SetPost(sorted);
      } catch (err) {
        console.error("❌ Error fetching donation data:", err);
      }
    };

    fetchData();

    receiveMessage("newUpdate", (data) => {
      if (data) {
        const sorted = [...data].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setDonatePost(sorted);
        SetPost(sorted);
      }
    });
    
    receiveMessage("new-post", (data) => {
      const sorted = [...data].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      console.log("New Post : " + sorted);
      setDonatePost(sorted);
      SetPost(sorted);
    });
  }, []);

  return (
    <Animate>
      <div className="w-full min-h-screen bg-black text-white pt-20 pb-4">
        <Navbar
          field={[
            { link: "/users/profile", name: "Profile" },
            { link: "/", name: "Home" },
            { link: "/reciver/blood", name: "Blood" },
            { link: "/about", name: "About" },
            { link: "/users/contactUs", name: "Contact Us" },
          ]}
        />
        <div className="px-5 flex flex-col gap-y-4 lg:flex-row gap-x-4 flex-wrap">
          {post.length > 0 ? (
            [...post]
              .sort((a, b) => {
                const getDateTime = (item) =>
                  new Date(
                    `${item.date.split("/").reverse().join("-")} ${item.time}`
                  );
                return getDateTime(b) - getDateTime(a);
              })
              .map((item, index) => (
                <DonarCard
                  btn={modal === item._id}
                  fn={(state) => setModal(state ? item._id : null)}
                  data={item}
                  key={index}
                />
              ))
          ) : (
            <p className="text-xl flex gap-x-2 items-center">
              <CiNoWaitingSign className="text-2xl text-red-500" />
              No Request Found!
            </p>
          )}
        </div>
      </div>
    </Animate>
  );
};

export default Donate;
