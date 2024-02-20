import { IState, Success } from "@/utilities/client";
import {
  Action,
  AnyAction,
  CaseReducer,
  PayloadAction,
  SliceCaseReducers,
  createSlice,
} from "@reduxjs/toolkit";

export interface CounterState {
  count: IState<number>;
}

export interface CounterReducers extends SliceCaseReducers<CounterState> {
  set: CaseReducer<CounterState, PayloadAction<number>>;
  incremented: CaseReducer<CounterState, PayloadAction<void>>;
  decremented: CaseReducer<CounterState, PayloadAction<void>>;
}

export const counterSlice = createSlice<
  CounterState,
  CounterReducers,
  "counter"
>({
  name: "counter",
  initialState: {
    count: {
      error: null,
      loading: false,
      value: 0,
    },
  },
  reducers: {
    set: (state, { payload }) => {
      state.count = Success(payload);
    },
    incremented: (state) => {
      state.count = { ...state.count, value: state.count.value! + 1 };
    },
    decremented: (state) => {
      state.count = { ...state.count, value: state.count.value! - 1 };
    },
  },
});

export const { incremented, decremented } = counterSlice.actions;
