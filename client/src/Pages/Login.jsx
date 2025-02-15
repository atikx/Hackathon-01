import { useState, useEffect } from "react";
import img from "../assets/img/login.svg";
import { useForm } from "react-hook-form";
import AOS from "aos";
import "aos/dist/aos.css";
import { showSuccessToast, showErrorToast } from "../utils/toastConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Use import.meta.env instead of process.env
function AuthForm() {
  const API_URL = import.meta.env.VITE_API_URL;
  axios.defaults.withCredentials = true;
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, type) => {
    console.log("Form Type:", type);
    console.log("Form Data:", data);

    try {
      const response = await axios.post(`${API_URL}/auth/${type}`, data);
      showSuccessToast(response.data, "top-center");
      navigate("/chat");
    } catch (error) {
      console.log(error);
      showErrorToast(
        error.response.data || "internal server error",
        "top-center"
      );
    }
  };

  return (
    <div className="flex justify-between tracking-widest relative items-center min-h-screen">
      <h1
        className="text-orange-500 absolute top-8 left-12 text-3xl font-kreon"
        data-aos="fade-down"
      >
        MindBridge
      </h1>

      <div
        className="flex flex-col md:ml-52 justify-center items-center h-screen w-screen md:w-auto bg-white"
        data-aos="fade-right"
      >
        <div className="flex flex-col justify-center items-center w-[35rem] min-h-[400px]">
          <h1 className="md:text-7xl text-5xl font-bold">
            {isRegister ? "Hello there!" : "Welcome back!"}
          </h1>
          <p className="text-gray-500 pt-8 text-center">
            {isRegister ? (
              <>
                Welcome to{" "}
                <span className="text-orange-500 font-semibold">
                  MindBridge
                </span>
                , let’s register you!
              </>
            ) : (
              <>
                Log in to continue to{" "}
                <span className="text-orange-500 font-semibold">
                  MindBridge
                </span>
                .
              </>
            )}
          </p>

          <form
            onSubmit={handleSubmit((data) =>
              onSubmit(data, isRegister ? "register" : "login")
            )}
            className="mt-6 space-y-4 w-80"
          >
            {isRegister && (
              <>
                <input
                  type="text"
                  placeholder="Your name"
                  {...register("name", { required: "Name is required" })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                  data-aos="fade-up"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </>
            )}

            <input
              type="email"
              placeholder="Your email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              data-aos="fade-up"
              data-aos-delay="100"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <input
              type="password"
              placeholder="Your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              data-aos="fade-up"
              data-aos-delay="200"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <button
              type="submit"
              className="w-full p-3 bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-500 transition"
              data-aos="zoom-in"
            >
              {isRegister ? "Register me!" : "Log In"}
            </button>
          </form>

          <p
            className="mt-4 text-gray-500"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {isRegister ? (
              <>
                Already have an account?{" "}
                <span
                  className="text-orange-500 font-semibold cursor-pointer"
                  onClick={() => setIsRegister(false)}
                >
                  Log In
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span
                  className="text-orange-500 font-semibold cursor-pointer"
                  onClick={() => setIsRegister(true)}
                >
                  Register
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="hidden lg:flex" data-aos="fade-left">
        <img src={img} className="h-screen" alt="login" />
      </div>
    </div>
  );
}

export default AuthForm;
