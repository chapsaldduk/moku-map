import { create } from "zustand";

const useStore = create((set) => ({
  // clicked marker
  isClicked: 0,
  setIsClicked: (i) =>
    set({
      isClicked: i,
    }),

  // map start center
  centerLocate: {
    lat: 37.5579,
    lon: 126.9244,
  },
  setCenter: (lat, lon) =>
    set({
      centerLocate: {
        lat: lat,
        lon: lon,
      },
    }),

  // user's locate
  locate: {
    lat: 0,
    lon: 0,
  },
  setLocate: (lat, lon) =>
    set({
      locate: {
        lat: lat,
        lon: lon,
      },
    }),

  // for map move
  isPanto: false,
  setIsPanto: (input) =>
    set({
      isPanto: input,
    }),
}));

export default useStore;
