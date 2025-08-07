import Cookies from "js-cookie";
import { create } from "zustand";

type ThemeState = {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
  toggleMode: () => void;
  initMode: (defaultMode?: "light" | "dark") => void;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: "light",
  setMode: mode => {
    set({ mode });
    Cookies.set("theme", mode);
  },
  toggleMode: () => {
    const next = get().mode === "light" ? "dark" : "light";
    set({ mode: next });
    Cookies.set("theme", next);
  },
  initMode: (defaultMode?: "light" | "dark") => {
    const theme = Cookies.get("theme") as "light" | "dark" | undefined;
    set({ mode: theme || defaultMode || "light" });
  },
}));
