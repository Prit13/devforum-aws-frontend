import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";
import { ThemeContext } from "../context/ThemeContext"; // Import ThemeContext

function Navbar() {
  const { user } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext); // Get theme state and toggle function

  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="bg-blue-200 dark:bg-blue-950 flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-2xl font-extrabold text-black dark:text-white ">
        <Link to="/">DevForum</Link>
      </h1>

      {path === "/" && (
        <div className="flex justify-center items-center space-x-0">
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none px-4 rounded-full h-9 w-80 dark:bg-gray-800 dark:text-white"
            placeholder="Search question"
            type="text"
          />
          <p
            onClick={() => navigate(prompt ? "?search=" + prompt : navigate("/"))}
            className="px-3 cursor-pointer dark:text-white"
          >
            <BsSearch />
          </p>
        </div>
      )}

      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle Button */}
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {theme === "light" ? <FaMoon className="text-black" /> : <FaSun className="text-yellow-400" />}
          </button>
        
        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
          {user ? (
            <h3 className="text-lg italic hover:text-cyan-400 dark:hover:text-cyan-400 dark:text-white transition">
              <Link to="/write">
                <b>Ask</b>
              </Link>
            </h3>
          ) : (
            <h3 className="dark:text-white">
              <Link to="/login">Login</Link>
            </h3>
          )}
          

          {user ? (
            <div onClick={showMenu}>
              <p className="cursor-pointer relative dark:text-white p-1 transition">
                <FaBars />
              </p>
              {menu && <Menu />}
            </div>
          ) : (
            <h3 className="dark:text-white">
              <Link to="/register">Register</Link>
            </h3>
          )}
        </div>

        <div className="md:hidden text-lg" onClick={showMenu}>
          <p className="cursor-pointer relative dark:text-white">
            <FaBars />
          </p>
          {menu && <Menu />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
