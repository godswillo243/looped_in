import type { IUser } from "@types";
import { create } from "zustand";
import { devtools, createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
      }),
      {
        name: "$auth",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
