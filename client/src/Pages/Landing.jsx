import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import landingImage from "../assets/img/Group 48.svg";
import FeaturesSection from "./FeaturesSection";

function Landing() {
  const navigate = useNavigate();

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <div className="bg-white px-6 sm:px-14 min-h-screen flex flex-col">
        {/* Header Section */}
        <header className="flex justify-between items-center py-3 px-4 sm:px-6 bg-white w-full">
          <a href="/">
            <h1 className="text-xl sm:text-2xl font-bold text-orange-500 font-kreon">
              MindBridge
            </h1>
          </a>
          <button
            onClick={() => navigate("/login")}
            className="w-20 sm:w-32 cursor-pointer px-3 py-1 sm:px-4 sm:py-2 bg-orange-500 text-white rounded-lg text-sm sm:text-base 
            hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md"
            data-aos="fade-left"
          >
            Login
          </button>
        </header>

        {/* Main Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-8 bg-white">
          {/* Left Side - Text Content */}
          <div
            className="lg:w-1/2 text-center lg:text-left px-4 sm:px-8"
            data-aos="fade-up"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Your <span className="text-orange-500">AI</span> Companion for
              Mental Well-being.
            </h1>
            <p className="text-gray-600 mt-4 text-sm sm:text-base">
              Chat with our friendly AI-powered assistant anytime, anywhere. Get
              emotional support, self-care tips, and mental health resources—all
              in a safe and judgment-free space.
            </p>
            <button
              onClick={() => navigate("/chat")}
              className="mt-6 w-24 sm:w-40 cursor-pointer px-3 py-2 sm:px-6 sm:py-3 border-2 border-orange-500 text-orange-500 rounded-lg 
              hover:bg-orange-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md"
              data-aos="zoom-in"
            >
              Chat Now!
            </button>
          </div>

          {/* Right Side - Image & Badges */}
          <div className="lg:w-1/2 relative mt-6 lg:mt-0 flex justify-center">
            <img
              src={landingImage}
              alt="Traveler"
              className="w-4/5 sm:w-full max-w-xs sm:max-w-md lg:max-w-lg"
              data-aos="fade-left"
            />

            {/* Badges */}
            <div
              className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white shadow-lg rounded-lg p-2 flex items-center space-x-2 text-xs sm:text-sm"
              data-aos="flip-right"
            >
              <span className="text-yellow-500">🧠</span>
              <p>Anxiety ??</p>
            </div>

            <div
              className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-white shadow-lg rounded-lg p-2 flex items-center space-x-2 text-xs sm:text-sm"
              data-aos="flip-left"
            >
              <span className="text-yellow-500">💔</span>
              <p>Stress due Relationship</p>
            </div>

            <div
              className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white shadow-lg rounded-lg p-2 flex items-center space-x-2 text-xs sm:text-sm"
              data-aos="flip-up"
            >
              <span className="text-blue-500">💡</span>
              <p>Or Just want some Inspiration!!</p>
            </div>
          </div>
        </div>
      </div>
      {/* Ensuring FeaturesSection starts after Landing section */}
      <div className="bg-[#F6F8FC] py-12">
        <FeaturesSection />
      </div>
    </>
  );
}

export default Landing;
