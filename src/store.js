import create from "zustand";

const useStore = create((set) => ({
  isOpen: false,
  //   setIsOpen: () => set((state) => ({ isOpen: true })),
  setIsOpen: false,
}));
export default useStore;
