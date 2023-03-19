import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { ListMatchs } from "../components/ListMatchs";
import { addMatch } from "@/store/slices";
import { selectTournamentState } from "@/store/slices";
import { ConfirmModal, Header, MainCard } from "@/components";

export default function AddMatch() {
  const tournamentState = useSelector(selectTournamentState);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastMatch, setLastMatch] = useState({
    win: false,
    currentDeck: tournamentState.value.deck.toUpperCase(),
    opponentDeck: "",
  });

  const addMatchToList = () => {
    dispatch(addMatch(lastMatch));
    setLastMatch({ ...lastMatch, opponentDeck: "" });
  };

  const getWinsAndLoses = () => {
    const totalWins = tournamentState.value.matchs.reduce(
      (acc: number, item: { win: boolean }) => {
        if (item.win) acc += 1;
        return acc;
      },
      0
    );

    const totalLoses = tournamentState.value.matchs.reduce(
      (acc: number, item: { win: boolean }) => {
        if (!item.win) acc += 1;
        return acc;
      },
      0
    );

    return { totalWins, totalLoses };
  };

  return (
    <>
      <Header>
        <div className="flex flex-col items-start justify-left w-full h-full p-3">
          <h1 className="text-white text-xl text-center">
            Tournament: {tournamentState.value.name}
          </h1>
          <p className="text-white text-sm">
            {" "}
            Deck: {tournamentState.value.deck}
          </p>
          <p className="text-white text-sm">
            {" "}
            Wins: {getWinsAndLoses().totalWins}
          </p>
          <p className="text-white text-sm">
            {" "}
            Loses: {getWinsAndLoses().totalLoses}
          </p>
        </div>
      </Header>

      <MainCard>
        <h1 className="text-emerald-500 font-bold text-xl text-center">
          Add your Last Match
        </h1>
        <form action="" className="mt-8">
          <input
            type="text"
            className="focus:outline-none border-b rounded-none w-full pb-2 border-gray-400 placeholder-gray-500 bg-white mb-4"
            value={tournamentState.value.deck}
            name="name"
            readOnly
          />
          <p className="text-center font-bold text-orange-400">VS</p>
          <input
            type="text"
            className="focus:outline-none border-b rounded-none w-full pb-2 border-gray-400 placeholder-gray-500 bg-white mt-4"
            value={tournamentState.value.deck}
            name="name"
            placeholder="Opponent Deck"
          />

          <div className="flex mt-8 mb-10">
            <button
              onClick={() => setLastMatch({ ...lastMatch, win: false })}
              className={`rounded-lg p-2 w-full bg-dakr1 text-white text-md font-semibold mx-2 border ${
                lastMatch.win
                  ? "opacity-30 text-emerald-500 border-emerald-500"
                  : "bg-teal-600"
              }`}
            >
              LOSE 🤷🏻‍♂️
            </button>
            <button
              onClick={() => setLastMatch({ ...lastMatch, win: true })}
              className={`rounded-lg p-2 w-full bg-white border border-green-600 text-white text-md font-semibold mx-2 ${
                !lastMatch.win
                  ? "opacity-30 text-emerald-500 border-emerald-500"
                  : "bg-teal-600"
              }`}
            >
              WIN 🏆
            </button>
          </div>

          <div className="flex justify-center my-6">
            <button className=" rounded-full p-3 w-full sm:w-56 bg-emerald-500 text-white text-lg font-semibold">
              Add Match
            </button>
          </div>

          <div className="flex justify-center my-6">
            <button className=" rounded-full p-3 w-full sm:w-56 bg-orange-400 text-white text-lg font-semibold">
              End Tournament
            </button>
          </div>
        </form>
      </MainCard>

      {/* {isModalOpen ? <ConfirmModal setIsModalOpen={setIsModalOpen} /> : null}
      <div className="flex justify-between w-full px-8 ">
        <p className="w-1/3 text-center">
          Total: {tournamentState.value.matchs.length}
        </p>
        <p className="w-1/3 text-center">
          🏆 Win: {getWinsAndLoses().totalWins}{" "}
        </p>
        <p className="w-1/3 text-center">
          {" "}
          ❌ Lose: {getWinsAndLoses().totalLoses}
        </p>
      </div>
      <ListMatchs /> */}

      {/*           

      <div className="min-h-screen h-auto overflow-y-auto py-6 flex justify-center items-start relative sm:py-12">
        <div className="relative px-2 pt-7 pb-2 bg-white max-w-md mx-auto w-4/5">
          <h1 className="text-sky-400 text-center text-xl mb-6">LAST MATCH</h1>
          <label htmlFor="" className="block text-dark1">
            Current Deck
          </label>
          <input
            type="text"
            name="deck"
            value={lastMatch.currentDeck}
            readOnly
            className="focus:outline-none border-b rounded-none w-full pb-2 border-sky-400 placeholder-gray-500 bg-white mb-6"
            placeholder="Your current deck"
          />
          <label htmlFor="" className="block text-dark1">
            Opponent
          </label>
          <input
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLastMatch({
                ...lastMatch,
                opponentDeck: e.target.value.toUpperCase(),
              })
            }
            value={lastMatch.opponentDeck}
            className="focus:outline-none border-b rounded-none w-full pb-2 border-sky-400 placeholder-gray-500 bg-white mb-6"
            placeholder="Opponent deck"
          />
          <div className="flex mt-8 mb-10">
            <button
              onClick={() => setLastMatch({ ...lastMatch, win: false })}
              className={`rounded-lg p-2 w-full bg-dakr1 text-white text-md font-semibold mx-2 border border-red-600 ${
                lastMatch.win ? " opacity-30" : "bg-red-500"
              }`}
            >
              LOSE 🤷🏻‍♂️
            </button>
            <button
              onClick={() => setLastMatch({ ...lastMatch, win: true })}
              className={`rounded-lg p-2 w-full bg-white border border-green-600 text-white text-md font-semibold mx-2 ${
                !lastMatch.win ? " opacity-30" : "bg-green-600"
              }`}
            >
              WIN 🏆
            </button>
          </div>

          <button
            onClick={addMatchToList}
            className="rounded-full p-3 w-full sm:w-56 bg-gradient-to-r from-sky-600 to-teal-300 text-white text-lg font-semibold"
          >
            ADD MATCH
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full p-3 w-full sm:w-56 bg-gradient-to-r from-red-600 to-orange-400 text-white text-lg font-semibold mt-10"
          >
            END TOURNAMENT
          </button>
        </div> */}
      {/* </div> */}
    </>
  );
}
