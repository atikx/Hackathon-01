import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AOS from "aos";
import "aos/dist/aos.css";
import { Send, Smile, Heart, Brain, CloudRain } from "lucide-react";
import axios from "axios";


const Chat = ({ display }) => {
  axios.defaults.withCredentials = true;
  const API_URL = import.meta.env.VITE_API_URL;

  const { register, handleSubmit, reset } = useForm();
  const [showQuickChat, setShowQuickChat] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleSendMessage = (data) => {
    try {
      const res = axios.post(`${API_URL}/chat/newchat`, {
        ...data,
        title: selectedTopic,
      });
      setShowQuickChat(false);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e, submit) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents a new line
      submit(); // Calls the form submit function
    }
  };

  return (
    <div className="flex flex-col relative h-screen w-full bg-gray-50">
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
        <div className="w-full max-w-4xl absolute bottom-0 text-center space-y-2">
          {showQuickChat && (
            <>
              <h2
                className="text-3xl md:text-5xl font-bold text-gray-800 font-rubik"
                data-aos="fade-up"
                style={{ display: display }}
              >
                Let's Talk.
              </h2>
              <p
                className="text-gray-600 mb-8 font-light text-md:text-lg font-rubik"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                We're here to listen. Share your thoughts and feelings.
              </p>

              {/* Quick Chat Buttons */}
              <div
                id="quickChatBTNS"
                style={{ display: display }}
                className="flex flex-wrap justify-center gap-4 mb-6"
              >
                {[
                  {
                    label: "Stress",
                    icon: <Smile size={20} />,
                    color: "#ff7f50",
                  },
                  {
                    label: "Relationships",
                    icon: <Heart size={20} />,
                    color: "#6495ed",
                  },
                  {
                    label: "Anxiety",
                    icon: <Brain size={20} />,
                    color: "#32cd32",
                  },
                  {
                    label: "Depression",
                    icon: <CloudRain size={20} />,
                    color: "#ff69b4",
                  },
                ].map((topic) => (
                  <button
                    key={topic.label}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm transition cursor-pointer ${
                      selectedTopic === topic.label
                        ? "bg-gray-300 border-gray-500 scale-105"
                        : "hover:bg-gray-100"
                    }`}
                    style={{
                      color:
                        selectedTopic === topic.label ? "white" : topic.color,
                      backgroundColor:
                        selectedTopic === topic.label
                          ? topic.color
                          : "transparent",
                    }}
                    onClick={() => {
                      console.log("Button Clicked:", topic.label);
                      setSelectedTopic(topic.label);
                    }}
                  >
                    {topic.icon} {topic.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Chat Input Form */}
          <form
            onSubmit={handleSubmit(handleSendMessage)}
            className="flex w-80 md:w-full border border-gray-300 rounded-lg shadow-md overflow-hidden"
          >
            <textarea
              {...register("que", { required: true })}
              className="flex-1 p-4 text-base md:text-lg outline-none resize-none"
              placeholder="Type your message here..."
              onKeyDown={(e) =>
                handleKeyDown(e, handleSubmit(handleSendMessage))
              }
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 flex items-center justify-center hover:bg-orange-600 transition duration-200 cursor-pointer"
            >
              <Send size={24} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
