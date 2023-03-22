import { TCGs } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export interface TorunamentState {
  name: string;
  date: string;
  deck: string;
  tcg: TCGs;
  official: boolean;
  matchs: { win: boolean; currentDeck: string; opponentDeck: string }[];
}

const initialState = {
  name: "",
  date: "",
  deck: "",
  tcg: "ygo",
  official: false,
  matchs: [],
};

export const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    setTournament(state, action) {
      state.name = action.payload.name;
      state.deck = action.payload.deck;
      state.date = action.payload.date;
    },

    addMatch(state, action) {
      //@ts-ignore
      state.matchs.push(action.payload);
    },
  },
});

export const { setTournament, addMatch } = tournamentSlice.actions;
export const selectTournamentState = (state: any): TorunamentState =>
  state.tournament;
export default tournamentSlice.reducer;
