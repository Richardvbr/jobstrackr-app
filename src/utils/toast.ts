import { colors } from "@/styles/variables";

export const toastOptions = {
  duration: 4000,
  success: {
    iconTheme: {
      primary: colors.white,
      secondary: colors.green600,
    },
    style: {
      background: colors.green600,
      color: colors.white,
    },
  },
  error: {
    iconTheme: {
      primary: colors.white,
      secondary: colors.red600,
    },
    style: {
      background: colors.red600,
      color: colors.white,
    },
  },
};
