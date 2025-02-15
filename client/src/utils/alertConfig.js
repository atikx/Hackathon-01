import Swal from "sweetalert2";

// Updated Theme Configuration to Match Sidebar & Chat Theme
const themeConfig = {
  background: "#18181B", // Dark Zinc-900 to match Sidebar
  color: "#f8fafc", // Light grayish text for readability
  confirmButtonColor: "#f97316", // Orange to match buttons/icons
  cancelButtonColor: "#64748b", // Soft gray-blue for cancel buttons
  iconColor: "#f97316", // Orange to match the confirm button and theme
  customClass: {
    popup: "rounded-xl shadow-lg", // Smooth rounded corners & soft shadow
    title: "text-xl font-bold text-white", // White title text
    confirmButton: "px-4 py-2 rounded-lg bg-orange-500 text-white",
    cancelButton: "px-4 py-2 rounded-lg bg-gray-600 text-white",
  },
};

// Success Alert
export const showSuccessAlert = (message) => {
  Swal.fire({
    title: "Success!",
    text: message,
    icon: "success",
    ...themeConfig,
  });
};

// Error Alert
export const showErrorAlert = (message) => {
  Swal.fire({
    title: "Oops, something went wrong!",
    text: message,
    icon: "error",
    ...themeConfig,
  });
};

// Confirmation Alert
export const showConfirmationAlert = async (message) => {
  return Swal.fire({
    title: "Are you sure?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, proceed",
    cancelButtonText: "Cancel",
    ...themeConfig,
  });
};
