import { toast } from "react-hot-toast";

const toastConfig = {
  success: {
    style: {
      background: "#F97316", // Orange (MindBridge Primary Color)
      color: "#FFFFFF", // White text
      border: "1px solid #EA580C", // Darker orange border
      padding: "12px",
      borderRadius: "8px",
      fontWeight: "500",
    },
    iconTheme: {
      primary: "#FFFFFF", // White icon
      secondary: "#F97316", // Matches background
    },
    position: "top-center",
  },
  error: {
    style: {
      background: "#DC2626", // Red (Error color)
      color: "#FFFFFF", // White text
      border: "1px solid #B91C1C", // Darker red border
      padding: "12px",
      borderRadius: "8px",
      fontWeight: "500",
    },
    iconTheme: {
      primary: "#FFFFFF",
      secondary: "#DC2626",
    },
    position: "top-center",
  },
  loading: {
    style: {
      background: "#FFEDD5", // Light Orange (Subtle effect)
      color: "#F97316", // Orange text
      border: "1px solid #F97316", // Orange border
      padding: "12px",
      borderRadius: "8px",
      fontWeight: "500",
    },
    iconTheme: {
      primary: "#F97316", // Orange icon
      secondary: "#FFEDD5",
    },
    position: "top-center",
  },
};

export const showSuccessToast = (message) =>
  toast.success(message, toastConfig.success);

export const showErrorToast = (message) =>
  toast.error(message, toastConfig.error);

export const showLoadingToast = (message) =>
  toast.loading(message, toastConfig.loading);
