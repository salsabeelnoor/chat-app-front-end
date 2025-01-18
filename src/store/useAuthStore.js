import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null, //initially authUser is null
    isSigingUp: false,
    isLoggingIn: false,
    isUpadatingProfile: false,
    isCheckingAuth: true, // as soon as refresh the page, it will check the auth

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data})
        } catch (error) {
            console.log("Error checking auth", error);
            set({authUser: null})
        } finally {
            set({isCheckingAuth: false})
        }
    },

    signUp: async(data) => {

    }

}))