import { useState, useEffect } from "react";
import {
  showConfirmationAlert,
  showErrorAlert,
} from "../src/utils/alertConfig";
import { showSuccessToast, showErrorToast } from "../src/utils/toastConfig";
import {
  Menu,
  X,
  Settings,
  User,
  HelpingHand,
  MessageCircle,
  LogOut,
  MessageSquare,
} from "lucide-react";
import Chat from "./Chat";
import Newchat from "./NewChat";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners"; // Import Spinner

export default function Sidebar() {
  axios.defaults.withCredentials = true;
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const [profileDropdown, setProfileDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown-menu") &&
        !event.target.closest(".profile-button")
      ) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsOpen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    const confirmLogout = await showConfirmationAlert(
      "Are you sure you want to logout?"
    );
    if (confirmLogout.isConfirmed) {
      try {
        const res = await axios.get(`${API_URL}/auth/logout`);
        showSuccessToast(res.data, "top-right");
        navigate("/");
      } catch (error) {
        showErrorToast("Internal server error", "top-center");
      }
    }
  };

  const getProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/getProfile`);
      return res.data;
    } catch (error) {
      showErrorToast(
        error.response?.data || "Internal server error",
        "top-center"
      );
      navigate("/login");
      return { chats: [] };
    }
  };

  // Use TanStack Query for fetching profile data
  const { data = { chats: [] }, isLoading } = useQuery("user", getProfile);

  return (
    <div className="flex h-screen pl-4 md:pl-0 bg-zinc-900 relative overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out bg-zinc-900 md:relative flex flex-col z-50 
        ${
          isOpen
            ? "w-64 translate-x-0"
            : "w-12 -translate-x-full md:translate-x-0"
        } rounded-tr-[50px]`}
      >
        <div className="flex items-center justify-between p-4 h-16">
          {isOpen && (
            <div className="flex items-center space-x-2">
              <HelpingHand className="text-orange-400 w-8 h-8" />
              <h1 className="text-2xl text-white font-kreon tracking-wide font-bold">
                MindBridge
              </h1>
            </div>
          )}
          <button
            className="text-gray-600 hover:text-gray-500 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {isOpen && (
          <div className="p-4 space-y-4 flex-1">
            <button className="flex items-center justify-start gap-x-2 w-full px-4 py-2 text-zinc-900 font-semibold rounded-lg cursor-pointer bg-orange-400 transition duration-200 ease-in-out hover:bg-orange-500">
              <MessageCircle size={20} />
              <span>Start a Chat</span>
            </button>

            {/* Previous Chats Section */}
            <div className="mt-4">
              <h2 className="text-gray-400 text-sm uppercase font-semibold tracking-widest">
                Previous Chats
              </h2>
              <ul className="mt-2 space-y-2">
                {data?.chats?.length > 0 ? (
                  data.chats.map((chat) => (
                    <li
                      key={Math.random()}
                      className="flex items-center gap-x-2 px-4 py-2 text-white bg-zinc-800 rounded-lg cursor-pointer transition duration-200 hover:bg-zinc-700"
                      onClick={() => console.log(`Opening chat ${chat.id}`)}
                    >
                      <MessageSquare size={18} className="text-orange-400" />
                      <span className="text-sm">{chat.title}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No chats available</p>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Bottom Icons */}
        <div className="border-t border-gray-400 w-[90%] mx-auto rounded-full"></div>
        <div className="p-4 flex flex-col space-y-4 mt-auto">
          <button className="text-white hover:text-orange-400 flex items-center space-x-2 cursor-pointer transition-colors duration-200 ease-in">
            <Settings className="text-orange-400" size={20} />
            {isOpen && <span>Settings</span>}
          </button>
          <button
            className="text-white hover:text-orange-400 flex items-center space-x-2 cursor-pointer transition-colors duration-200 ease-in"
            onClick={handleLogout}
          >
            <LogOut className="text-orange-400" size={20} />
            {isOpen && <span>Log Out</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10 pr-4 bg-zinc-900 pb-4">
        {/* Navbar */}
        <header className="flex items-center justify-between p-4 bg-zinc-900 h-16">
          <button
            className="text-gray-600 hover:text-gray-500 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={24} />
          </button>

          {/* Profile Dropdown & Loading Spinner */}
          <div className="relative ml-auto">
            <button
              className="p-2 border-orange-400 border-2 rounded-full hover:bg-orange-100 transition duration-200 cursor-pointer profile-button"
              onClick={() => setProfileDropdown(!profileDropdown)}
            >
              <User size={24} className="text-orange-400" />
            </button>

            {profileDropdown && (
              <div className="absolute right-0 z-[50000000] mt-2 w-56 bg-white border rounded-lg shadow-xl dropdown-menu">
                {/* Profile Section */}
                <div className="p-4 flex items-center space-x-3 border-b bg-gray-100">
                  <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center">
                    <User className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {data && data.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {data && data.email}
                    </p>
                  </div>
                </div>

                {/* Dropdown Items */}
                <ul className="py-2 ">
                  <li className="px-4 py-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition">
                    <Settings size={18} className="text-orange-400" />
                    <span>Settings</span>
                  </li>
                  <li
                    className="px-4 py-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} className="text-orange-400" />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden bg-white border-zinc-900 border-2 rounded-2xl">
          <Newchat display="" />
        </main>
      </div>
    </div>
  );
}
