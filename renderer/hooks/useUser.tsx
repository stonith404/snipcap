import { Models } from "appwrite";
import { create } from "zustand";

type UserState = {
  user: Models.User<{}> | null;
  setUser: (user: Models.User<{}>) => void;
};

export const useUser = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
