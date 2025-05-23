import { create } from "zustand";

type Store = {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
};

export const useStore = create<Store>((set) => ({
    isSidebarOpen: true,
    toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
