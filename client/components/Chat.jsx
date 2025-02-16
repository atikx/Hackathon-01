import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Send, User } from "lucide-react";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { showLoadingToast } from "../src/utils/toastConfig";

const Chat = ({ display }) => {
  const { id } = useParams();
  axios.defaults.withCredentials = true;
  const API_URL = import.meta.env.VITE_API_URL;

  const { register, handleSubmit, reset } = useForm();
  const [showQuickChat, setShowQuickChat] = useState(true);
  const chatEndRef = useRef(null); // Reference for scrolling

  const getChat = async () => {
    try {
      const res = await axios.get(`${API_URL}/chat/getChat/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const { data, refetch } = useQuery({
    queryKey: ["chat", id],
    queryFn: getChat,
    refetchInterval: 1000,
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.messages]);

  const onSubmit = (formData) => {
    if (formData.message.trim() !== "") {
      mutate(formData);
      showLoadingToast("Getting Response...", "top-center");
      reset(); // Clear input immediately after submission
    }
  };

  const { mutate, isLoading } = useMutation(
    async (formData) => {
      return axios.post(`${API_URL}/chat/sendMsg/${id}`, {
        que: formData.message,
      });
    },
    {
      onSuccess: () => {
        setShowQuickChat(false);
        refetch(); // Fetch updated messages from server
      },
      onError: (error) => {
        console.error("Error sending message:", error);
      },
    }
  );

  return (
    <div className="flex flex-col relative h-screen w-full bg-gray-50">
      {/* Top Bar */}
      <div className="w-full bg-white p-4 border-b shadow-md flex flex-col md:flex-row md:items-center justify-between px-6">
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
      <div className="overflow-y-scroll h-[65%] md:h-[70%] space-y-4 p-4">
        {(data?.messages || []).map((msg, index) => (
          <div key={index} className="flex flex-col space-y-1">
            <div className="flex items-end justify-end gap-2.5">
              <div className="bg-orange-300 p-3 rounded-lg w-full md:w-1/3 shadow-md text-gray-800 font-medium">
                <p className="text-sm mt-1">{msg.que}</p>
              </div>
              <User
                className="border-2 border-orange-300 rounded-full p-2 bg-orange-100 shadow-md"
                size={32}
              />
            </div>
            <div className="flex items-start gap-2.5">
              <User
                className="border-2 border-gray-300 rounded-full p-2 bg-gray-100 shadow-md"
                size={32}
              />
              <div className="bg-gray-300 p-3 rounded-lg w-full md:w-1/2 shadow-md text-gray-800 font-medium">
                <span className="text-xs font-semibold text-gray-900">
                  Therapist Bot
                </span>
                <p className="text-sm mt-1">{msg.ans}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} /> {/* Invisible element to scroll to bottom */}
      </div>

      {/* Chat Input Form */}
      <div className="flex flex-1 items-end -translate-y-28absolute bottom-0 justify-center p-6">
        <div className="w-full max-w-4xl text-center space-y-2">
          {showQuickChat && (
            <>
              <h2
                className="text-3xl md:text-5xl font-bold text-gray-800"
                style={{ display: display }}
              >
                Let's Talk.
              </h2>
              <p
                className="text-gray-600 mb-8 font-light text-md:text-lg"
                style={{ display: display }}
              >
                We're here to listen. Share your thoughts and feelings.
              </p>
            </>
          )}

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
