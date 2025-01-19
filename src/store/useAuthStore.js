import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

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

    signUp: async (data) => {
        set({ isSigingUp : true})
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser: res.data})
            toast.success("Account created Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isSigingUp: false})
        }
    },

    login: async (data) => {
        set({isLoggingIn: true});
         try {
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser: res.data});
            toast.success("Logged in Successfully")
         } catch (error) {
            toast.error(error.response.data.message)
         } finally {
            set({isLoggingIn: false})
         }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({isUpadatingProfile: true})
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({authUser: res.data});
            toast.success("Profile Updated Successfully")
        } catch (error) {
            console.log("error in update profile: ", error);
            toast.error(error.response.data.message);
        } finally {
            set({isUpadatingProfile: false})
        }
    }

}))