import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import logo from "./Assets/logo.png";
import control from "./Assets/control.png";
import Chart_fill from "./Assets/Chart_fill.png";
import Chat from "./Assets/Chat.png";
import User from "./Assets/User.png";
import Calendar from "./Assets/Calendar.png";
import Search from "./Assets/Search.png";
import Chart from "./Assets/Chart.png";
import Folder from "./Assets/Folder.png";
import Setting from "./Assets/Setting.png";
import ronald from "./Assets/ronald.jpg";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: Chart_fill },
    { title: "Inbox", src: Chat },
    { title: "Accounts", src: User, gap: true },
    { title: "Schedule ", src: Calendar },
    { title: "Search", src: Search },
    { title: "Analytics", src: Chart },
    { title: "Files ", src: Folder, gap: true },
    { title: "Setting", src: Setting },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      
      <aside className="bg-madhu relative">
        <div
          className={` ${
            open ? "w-60" : "w-20 "
          } bg-madhu  p-5  pt-8 relative duration-300`}
        >
          <img
            src={control}
            alt=""
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <img
              src={logo}
              alt=""
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Designer
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-chinese_blue
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                <img src={Menu.src} alt={Menu.title} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <img
          src={control}
          alt=""
          className={`absolute cursor-pointer -right-3 bottom-64 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
      </aside>

      {/* Main Content */}
      <div className=" flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-madhu  text-white flex justify-between items-center p-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 rounded bg-gray-800 border-2 border-gray-700 bg-opacity-100 text-gray-400 pl-10"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ color: "#63E6BE" }}
              />
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8">
                <FontAwesomeIcon icon={faBell} style={{ color:'white', fontSize: "24px" }} />
              </div>
              <div className="w-8">
                <FontAwesomeIcon icon={faEnvelope} style={{color:'white', fontSize: "24px" }}/>
              </div>
              <div className="w-8">
                <FontAwesomeIcon icon={faGear} style={{color:'white', fontSize: "24px" }} />
              </div>
              <img
                src={ronald}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </header>

        <main className="p-6 bg-chinese_black flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
