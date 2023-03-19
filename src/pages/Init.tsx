import moment from "moment";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPage } from "@/store/slices/global";
import {
  selectTournamentState,
  setTournament,
  TorunamentState,
} from "@/store/slices";

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
      <Image
        // loader={myLoader}
        className="absolute -z-10 w-full"
        src="/skystriker.jpeg"
        alt="Yugi Moto"
        width={300}
        height={300}
      />
      <div className="w-full h-screen overflow-scroll p-2 flex items-center justify-center z-50 shadow-md">
        <div className="bg-dark1 py-6 px-6 sm:max-w-md w-full ">
          <div className="sm:text-3xl text-2xl font-semibold text-center text-sky-400 mb-12">
            TCG TOURNAMENT TRACKER
          </div>
          <div className="">
            <div>
              <input
                type="text"
                className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 bg-dark1"
                placeholder="Tournament Name"
                name="name"
                value={tournamentData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="date"
                className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 my-8 bg-dark1"
                placeholder="Date"
                name="date"
                value={tournamentData.date}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8 bg-dark1"
                placeholder="Deck"
                name="deck"
                value={tournamentData.deck}
                onChange={handleChange}
              />
            </div>

            <div>
              <select
                className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8 bg-dark1"
                value={tournamentData.tcg}
                onChange={handleChange}
                name="tcg"
              >
                <option value="ygo">YU-Gi-OH</option>
                <option value="mtg">Magic The Gathering</option>
                <option value="pkm">Pokemon!</option>
              </select>
            </div>
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
                className=" rounded-full p-3 w-full sm:w-56 bg-gradient-to-r from-sky-600 to-teal-300 text-white text-lg font-semibold"
                onClick={createTournament}
              >
                Start Tournament
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
