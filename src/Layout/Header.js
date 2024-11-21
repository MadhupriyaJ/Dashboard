import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBell, faEnvelope, faGear } from "@fortawesome/free-solid-svg-icons";
import ronald from "../Assets/ronald.jpg";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

const Header = ({ isSidebarOpen }) => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/");
  };
  const handlespeechClick = () => {
    navigate("/speech-to-text");
  };
  return (
    <header
      className={`bg-slate-200 text-gray-300 fixed top-0 shadow-slate-500 shadow-lg ${
        isSidebarOpen ? "left-[240px]" : "left-[80px]"
      } right-0 h-[70px] flex justify-between items-center px-6 z-10`}
    >
      <div className="flex"><div className="text-gray-400 hover:bg-white rounded-md">
        <button className="text-black px-4 py-2"
          onClick={handleDashboardClick}>
          Dashboard
        </button>
      </div>
      <div className="text-gray-400 hover:bg-white rounded-md">
        <button className="text-black px-4 py-2"
          onClick={handlespeechClick }>
          speechToText
        </button>
      </div></div>
{/*       
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded-md bg-white border-2 border-slate-500 bg-opacity-100 text-gray-400 pl-10"
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#63E6BE" }} />
        </span>
      </div> */}

      <div className="flex items-center space-x-4 ">
        <div className="flex items-center space-x-2 gap-4">
          <FontAwesomeIcon icon={faBell} style={{ color: "#212121", fontSize: "24px" }} />
          <FontAwesomeIcon icon={faEnvelope} style={{ color: "#212121", fontSize: "24px" }} />
          <FontAwesomeIcon icon={faGear} style={{ color: "#212121", fontSize: "24px" }} />
          <img src={ronald} alt="User Avatar" className="w-8 h-8 rounded-full" />
        </div>
      </div>
    </header>
  );
};

export default Header;


