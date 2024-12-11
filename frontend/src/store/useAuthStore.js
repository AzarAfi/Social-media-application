import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";




export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  
  

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkuser");

      set({ authUser: res.data });
      
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
}
  }))