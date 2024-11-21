import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import control from "../Assets/control.png";
import Chart_fill from "../Assets/Chart_fill.png";
import Chat from "../Assets/Chat.png";
import User from "../Assets/User.png";
import Calendar from "../Assets/Calendar.png";
import Search from "../Assets/Search.png";
import Chart from "../Assets/Chart.png";
import Folder from "../Assets/Folder.png";
import Setting from "../Assets/Setting.png";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onToggle }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const toggleSidebar = () => {
    setOpen(!open);
    onToggle(!open); // Notify parent about the toggle
  };

  const Menus = [
    { title: "Dashboard", src: Chart_fill, link: "/" },
    { title: "Speech to Text", src: Chart_fill, link: "/speech-to-text" },
    { title: "Inbox", src: Chat, link: "/inbox" },
    { title: "Accounts", src: User, gap: true, link: "/accounts" },
    { title: "Schedule", src: Calendar, link: "/schedule" },
    { title: "Search", src: Search, link: "/search" },
    { title: "Analytics", src: Chart, link: "/analytics" },
    { title: "Files", src: Folder, gap: true, link: "/files" },
    { title: "Setting", src: Setting, link: "/settings" },
  ];

  return (
    <aside
      className={`${open ? "w-60" : "w-20"
        } bg-madhu fixed left-0 top-0 h-full p-5 pt-8 duration-300 shadow-slate-500 shadow-lg`}
    >
      <img
        src={control}
        alt=""
        className={`absolute cursor-pointer -right-0 top-12 w-7 border-dark-purple border-2 rounded-full ${!open && "rotate-180"
          }`}
        onClick={toggleSidebar} // Call the toggle function
      />
      <div className="flex gap-x-4 items-center">
      {/* <Link to="/" className="flex items-center"> */}
      <img
        src={logo}
        alt="Logo"
        onClick={handleLogoClick}
        className={`cursor-pointer duration-500 ${open ? "w-14 h-14 rotate-[360deg]" : "w-10 h-10"}`}
      />
    {/* </Link> */}

        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
            }`}
        >
          Cerulean Solutions
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-chinese_blue ${Menu.gap ? "mt-9" : "mt-2"
              }`}
          >
            <Link to={Menu.link} className="flex items-center gap-x-4">
              {Menu.src && <img src={Menu.src} alt={Menu.title} />}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;