import { toast } from "react-hot-toast";

const defaultPosition = "top-right"; // Default position

const toastConfig = {
  success: {
    style: {
      background: "#F97316", // Vibrant Orange
      color: "#FFFFFF", // White text
      border: "1px solid #EA580C", // Darker Orange border
      padding: "14px",
      borderRadius: "8px",
      fontWeight: "600",
      boxShadow: "0px 4px 10px rgba(249, 115, 22, 0.3)", // Soft glow effect
    },
    iconTheme: {
      primary: "#FFFFFF",
      secondary: "#F97316",
    },
  },
  error: {
    style: {
      background: "#F97316", // Orange theme for error instead of red
      color: "#FFFFFF",
      border: "1px solid #EA580C",
      padding: "14px",
      borderRadius: "8px",
      fontWeight: "600",
      boxShadow: "0px 4px 10px rgba(249, 115, 22, 0.3)",
    },
    iconTheme: {
      primary: "#FFFFFF",
      secondary: "#F97316",
    },
  },
  loading: {
    duration: 3000,
    style: {
      background: "#FFEDD5", // Light Orange (Subtle effect)
      color: "#F97316",
      border: "1px solid #F97316",
      padding: "14px",
      borderRadius: "8px",
      fontWeight: "600",
      boxShadow: "0px 4px 10px rgba(249, 115, 22, 0.3)",
    },
    iconTheme: {
      primary: "#F97316",
      secondary: "#FFEDD5",
    },
  },
};

// ✅ Functions with Custom Position Support
export const showSuccessToast = (message, position = defaultPosition) =>
  toast.success(message, { ...toastConfig.success, position });

export const showErrorToast = (message, position = defaultPosition) =>
  toast.error(message, { ...toastConfig.error, position });

export const showLoadingToast = (message, position = defaultPosition) =>
  toast.loading(message, { ...toastConfig.loading, position });
