import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Send, Smile, Heart, Brain, CloudRain, User } from "lucide-react";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const Chat = ({ display }) => {
  const { id } = useParams();
  axios.defaults.withCredentials = true;
  const API_URL = import.meta.env.VITE_API_URL;

  const { register, handleSubmit, reset } = useForm(); // React Hook Form
  const [showQuickChat, setShowQuickChat] = React.useState(true);

  const getChat = async () => {
    try {
      const res = await axios.get(`${API_URL}/chat/getChat/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const { data } = useQuery(["chat", id], getChat);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const onSubmit = (formData) => {
    if (formData.message.trim() !== "") {
      setShowQuickChat(false);
      console.log("Message Sent:", formData.message);
      reset(); // Reset the input field after sending
      try {
        const res = axios.post(`${API_URL}/chat/sendMsg/${id}`, {
          que: formData.message,
        });
        console.log(res);
      } catch (error) {
        console.error(error);
      }
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
          Type of Chat:{" "}
          <span className="text-orange-500 font-bold">
            {data?.title || "Chat"}
          </span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="overflow-x-scroll h-[65%] md:h-[70%]">
        <div className="space-y-4">
          {data?.messages?.map((msg, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <div className="flex items-end justify-end gap-2.5 m-4">
                <div className="bg-orange-300 p-3 rounded-lg self-end w-fit max-w-xs shadow-md text-gray-800 font-medium">
                  <span className="text-xs font-semibold text-gray-900">
                    John Doe
                  </span>
                  <p className="text-sm mt-1">{msg.que}</p>
                </div>
                <User
                  className="border-2 border-orange-300 rounded-full p-2 bg-orange-100 shadow-md"
                  size={32}
                />
              </div>
              <div className="flex items-start gap-2.5 m-4">
                <User
                  className="border-2 border-gray-300 rounded-full p-2 bg-gray-100 shadow-md"
                  size={32}
                />
                <div className="bg-gray-300 p-3 rounded-lg self-start w-fit max-w-xs shadow-md text-gray-800 font-medium">
                  <span className="text-xs font-semibold text-gray-900">
                    Therapist Bot
                  </span>
                  <p className="text-sm mt-1">{msg.ans}</p>
                </div>
              </div>
            </div>
          ))}
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
            </>
          )}

          {/* Chat Input Form with React Hook Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex ml-5 md:ml-0 w-80 md:w-full border border-gray-300 rounded-lg shadow-md overflow-hidden"
          >
            <textarea
              {...register("message", { required: true })}
              className="flex-1 p-4 text-base md:text-lg outline-none resize-none"
              placeholder="Type your message here..."
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
