import { createSlice } from "@reduxjs/toolkit";

type Pages = "Init" | "Matchs";

export interface GlobalState {
  page: Pages;
}

const initialState: GlobalState = {
  page: "Init",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { setPage } = globalSlice.actions;
export const selectGlobalState = (state: any) => state.global;
export default globalSlice.reducer;
