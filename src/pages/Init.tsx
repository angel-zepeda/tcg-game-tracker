import moment from "moment";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPage } from "@/store/slices/global";
import {
  selectTournamentState,
  setTournament,
  TorunamentState,
} from "@/store/slices";
import { Header, MainCard } from "@/components";

export default function Init() {
  const tournamentState = useSelector(selectTournamentState);
  const dispatch = useDispatch();
  const [tournamentData, setTournamentData] = useState<TorunamentState>({
    name: "",
    date: moment().format("YYYY-MM-DD"),
    deck: "",
    tcg: "ygo",
    offitial: false,
    matchs: [],
  });

  const createTournament = (e: any) => {
    e.preventDefault();
    dispatch(setTournament(tournamentData));
    dispatch(setPage("Matchs"));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;
    setTournamentData({ ...tournamentData, [name]: value });
  };

  return (
    <>
      <Header>
        <div className="flex items-center justify-left w-full h-full p-3">
          <h1 className="text-white font-bold text-xl">
            TCG TOURNAMENT TRACKER
          </h1>
        </div>
      </Header>

      <MainCard>
        <h1 className="text-emerald-500 font-bold text-xl text-center">
          Add your Tournament
        </h1>
        <form action="" className="mt-8">
          <input
            type="text"
            className="focus:outline-none border-b rounded-none w-full pb-2 border-gray-400 placeholder-gray-500 bg-white"
            placeholder="Tournament Name"
            name="name"
            value={tournamentData.name}
            onChange={handleChange}
          />
          <input
            type="date"
            className="focus:outline-none border-b rounded-none  pb-2 border-gray-400 placeholder-gray-500 my-8 bg-white w-full"
            placeholder="Date"
            name="date"
            value={tournamentData.date}
            onChange={handleChange}
          />
          <input
            type="text"
            className="focus:outline-none border-b rounded-none w-full pb-2 border-gray-400 placeholder-gray-500 mb-8 bg-white"
            placeholder="Deck"
            name="deck"
            value={tournamentData.deck}
            onChange={handleChange}
          />
          <select
            className="focus:outline-none border-b rounded-none w-full pb-2 border-gray-400 placeholder-gray-500 mb-8 bg-white"
            value={tournamentData.tcg}
            onChange={handleChange}
            name="tcg"
          >
            <option value="ygo">YU-Gi-OH</option>
            <option value="mtg">Magic The Gathering</option>
            <option value="pkm">Pokemon!</option>
          </select>
          <div className="flex">
            <input
              onChange={() => {
                setTournamentData({
                  ...tournamentData,
                  offitial: !tournamentData.offitial,
                });
              }}
              type="checkbox"
              className="border-sky-400 "
              name="offitial"
              checked={tournamentData.offitial}
            />
            <div className="px-3 text-gray-500">Offitial Tournament?</div>
          </div>
          <div className="flex justify-center my-6">
            <button
              className=" rounded-full p-3 w-full sm:w-56 bg-emerald-500 text-white text-lg font-semibold"
              onClick={createTournament}
            >
              Start Tournament
            </button>
          </div>
        </form>
      </MainCard>
    </>
  );
}
