import { counterSlice } from "@/lib/redux";

export const reducer = {
  [counterSlice.name]: counterSlice.reducer,
};
