import { useNavigate } from "react-router-dom";
import landingImage from "../assets/img/Group 48.svg";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-white pr-14 pl-14">
      {/* Header Section */}
      <header className="flex justify-between items-center p-6 bg-white">
        <h1 className="text-2xl font-bold text-orange-500 font-kreon">MindBridge</h1>
        <div className="flex space-x-2 sm:space-x-4 sm:flex-row flex-col space-y-2 sm:space-y-0">
          <button 
            onClick={() => navigate("/login")} 
            className="w-24 px-3 py-1 sm:w-32 sm:px-4 sm:py-2 bg-orange-500 text-white rounded-lg text-sm sm:text-base 
              hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md">
            Login
          </button>
        </div>
      </header>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between p-8 lg:p-16 bg-white">
        {/* Left Side - Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Your <span className="text-orange-500">AI</span> Companion for Mental Well-being.
          </h1>
          <p className="text-gray-600 mt-4">
            Chat with our friendly AI-powered assistant anytime, anywhere. Get emotional support, self-care tips, and mental health resources—all in a safe and judgment-free space.
          </p>
          <button 
            onClick={() => navigate("/chat")} 
            className="mt-6 w-28 px-4 py-2 sm:w-40 sm:px-6 sm:py-3 border-2 border-orange-500 text-orange-500 rounded-lg 
              hover:bg-orange-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md">
            Chat Now!
          </button>
        </div>

        {/* Right Side - Image & Badges */}
        <div className="lg:w-1/2 relative mt-8 lg:mt-0">
          <img src={landingImage} alt="Traveler" className="w-full max-w-md mx-auto lg:max-w-lg" />

          {/* Badges */}
          <div className="absolute top-4 left-4 bg-white shadow-lg rounded-lg p-2 flex items-center space-x-2">
            <span className="text-yellow-500">🧠</span>
            <p className="text-sm">Anxiety ??</p>
          </div>

          <div className="absolute bottom-4 left-4 bg-white shadow-lg rounded-lg p-2 flex items-center space-x-2">
            <span className="text-yellow-500">💔</span>
            <p className="text-sm">Stress due Relationship</p>
          </div>

          <div className="absolute top-1/2 right-4 bg-white shadow-lg rounded-lg p-2 flex items-center space-x-2">
            <span className="text-blue-500">💡</span>
            <p className="text-sm">Or Just want some Inspiration!!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
