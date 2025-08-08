import { create } from "zustand";

interface SiderState {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

export const useSiderStore = create<SiderState>(set => ({
  isOpen: true,
  setOpen: open => set({ isOpen: open }),
  toggle: () => set(state => ({ isOpen: !state.isOpen })),
}));
