import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Send, Smile, Heart, Brain, CloudRain } from "lucide-react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [inputHeight, setInputHeight] = useState("auto");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    setInputHeight("auto");
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50">
      {/* Top Bar */}
      <div
        className="w-full bg-white p-4 border-b shadow-md flex flex-col md:flex-row md:items-center justify-between px-6"
        data-aos="fade-down"
      >
        <div className="text-gray-700 font-semibold text-lg">
          Chat Conducted on{" "}
          {new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
        <div className="text-sm text-gray-600 font-medium mt-2 md:mt-0">
          Your Current Chat ID:{" "}
          <span className="text-orange-500 font-bold">Ab3C4Dke</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 items-end -translate-y-28 justify-center p-6">
        <div className="w-full max-w-4xl text-center space-y-2">
          <h2
            className="text-5xl font-bold text-gray-800 font-rubik"
            data-aos="fade-up"
          >
            Let's Talk.
          </h2>
          <p
            className="text-gray-600 mb-8 font-light text-lg font-rubik"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            We're here to listen. Share your thoughts and feelings.
          </p>

          {/* Quick Chat Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-100 transition cursor-pointer"
              style={{ color: "#ff7f50" }}
            >
              <Smile size={20} /> Stress
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-100 transition cursor-pointer"
              style={{ color: "#6495ed" }}
            >
              <Heart size={20} /> Relationships
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-100 transition cursor-pointer"
              style={{ color: "#32cd32" }}
            >
              <Brain size={20} /> Anxiety
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-100 transition cursor-pointer"
              style={{ color: "#ff69b4" }}
            >
              <CloudRain size={20} /> Depression
            </button>
          </div>

          {/* Chat Input */}
          <div className="flex w-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <textarea
              className="flex-1 p-4 text-lg outline-none resize-none"
              style={{ height: inputHeight, minHeight: "50px" }}
              placeholder="Type your message here..."
              value={message}
              onChange={handleInputChange}
            />
            <button className="bg-orange-500 text-white px-6 flex items-center justify-center hover:bg-orange-600 transition duration-200 cursor-pointer">
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
