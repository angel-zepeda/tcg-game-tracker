import { TCGs } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../index";

export interface TorunamentState {
  name: string;
  date: string;
  deck: string;
  tcg: TCGs;
  offitial: boolean;
  matchs: { win: boolean; currentDeck: string; opponentDeck: string }[];
}

const initialState = {
  value: {
    name: "",
    date: "",
    deck: "",
    tcg: "ygo",
    offitial: false,
    matchs: [{ win: false, currentDeck: "", opponentDeck: "" }],
  } as TorunamentState,
};

export const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    setTournament(state, action) {
      state.value = action.payload;
    },

    addMatch(state, action) {
      state.value.matchs.push(action.payload);
    },
  },
});

export const { setTournament, addMatch } = tournamentSlice.actions;
export const selectTournamentState = (state: AppState) => state.tournament;
export default tournamentSlice.reducer;
