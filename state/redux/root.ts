import { counterSlice } from "@/state/redux";

export const reducer = {
  [counterSlice.name]: counterSlice.reducer,
};
