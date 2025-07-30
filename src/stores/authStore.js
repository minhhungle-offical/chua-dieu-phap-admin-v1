import { create } from "zustand";

export const authStore = create((set) => ({
  profile: null,
  setProfile: (payload) => set({ profile: payload }),
}));
