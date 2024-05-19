import axios from "axios";
import { create } from "zustand";

const authStore = create((set) => ({
  loggedIn: null,

  loginForm: {
    email: "",
    password: "",
  },
  signupForm: {
    email: "",
    password: "",
  },

  updateLoginForm: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        loginForm: {
          ...state.loginForm,
          [name]: value,
        },
      };
    });
  },
  updateSignupForm: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        signupForm: {
          ...state.signupForm,
          [name]: value,
        },
      };
    });
  },

  login: async (e) => {
    // e.preventDefault();
    const { loginForm } = authStore.getState();
    const res = await axios.post("/login", loginForm, {
      withCredentials: true,
    });

    set({
      loggedIn: true,
      loginForm: {
        email: "",
        password: "",
      },
    });
    console.log(res);
  },

  checkAuth: async () => {
    try {
      await axios.get("/check-auth");
      set({ loggedIn: true });
    } catch (err) {
      set({ loggedIn: false });
    }
  },

  signup: async () => {
    const { signupForm } = authStore.getState();
    const res = await axios.post("/signup", signupForm, {
      withCredentials: true,
    });

    set({
      signup: {
        email: "",
        password: "",
      },
    });

    console.log(res);
  },

  logout: async () => {
    await axios.get("/logout");
    set({ loggedIn: false });
  },
}));

export default authStore;
