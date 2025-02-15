import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Settings,
  User,
  HelpingHand,
  MessageCircle,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out bg-zinc-900 md:relative flex flex-col z-50 ${
          isOpen
            ? "w-64 translate-x-0"
            : "w-12 -translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-4 h-16">
          {isOpen && (
            <div className="flex items-center space-x-2">
              <HelpingHand className="text-orange-400 w-8 h-8" />
              <h1 className="text-lg text-white font-semibold">
                Serenify: Support
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
          <div className="p-4 space-y-4 overflow-auto flex-1">
            <button
              className="
              flex items-center justify-start gap-x-2 w-full px-4 py-2 text-zinc-900 font-bold rounded-lg cursor-pointer
              bg-orange-400 transition duration-200 ease-in-out hover:bg-orange-500
            "
            >
              <MessageCircle size={20} />
              <span>Talk to Someone</span>
            </button>
          </div>
        )}

        {/* Bottom Icons */}
        {/* Creating a Line with 80% width */}
        <div className="border-t border-gray-400 w-[90%] mx-auto rounded-full"></div>
        {/* Bottom Icons */}
        <div className="p-4 flex flex-col space-y-4 mt-auto">
          <button className="text-white hover:text-orange-400 flex items-center space-x-2 cursor-pointer transition-colors duration-200 ease-in">
            <Settings className="text-orange-400" size={20} />
            {isOpen && <span>Settings</span>}
          </button>
          <button
            className="
            text-white hover:text-orange-400 flex items-center space-x-2 cursor-pointer transition-colors duration-200 ease-in
          "
          >
            <LogOut
              className="
              text-orange-400
            "
              size={20}
            />
            {isOpen && <span>Log Out</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between p-4 bg-zinc-900 h-16">
          <button
            className="text-gray-600 hover:text-gray-500 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={24} />
          </button>
          <div className="relative ml-auto">
            <button
              className="p-2 border-orange-400 border-2 rounded-full hover:bg-orange-100 transition duration-200 cursor-pointer profile-button"
              onClick={() => setProfileDropdown(!profileDropdown)}
            >
              <User size={24} className="text-orange-400" />
            </button>
            {profileDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg dropdown-menu">
                <ul className="py-2">
                  <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Settings
                  </li>
                  <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 overflow-auto bg-gray-50"></main>
      </div>
    </div>
  );
}
