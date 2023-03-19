import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ListMatchs } from "../components/ListMatchs";
import { addMatch } from "@/store/slices";
import { selectTournamentState } from "@/store/slices";
import { ConfirmModal } from "@/components";

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
    <div>
      {isModalOpen ? <ConfirmModal setIsModalOpen={setIsModalOpen} /> : null}
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
      <ListMatchs />
      <div className="min-h-screen py-6 flex justify-center items-start relative overflow-hidden sm:py-12">
        <div className="relative px-4 pt-7 pb-2 bg-dark1 max-w-md mx-auto w-3/4">
          <h1 className="text-sky-400 text-center text-xl mb-10">LAST MATCH</h1>
          <label htmlFor="" className="block text-dark1">
            Current Deck
          </label>
          <input
            type="text"
            name="deck"
            value={lastMatch.currentDeck}
            readOnly
            className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 bg-dark1 mb-6"
            placeholder="Your current deck"
          />
          {/* <h2 className="text-red-500 text-center">🆚</h2> */}
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
            className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 bg-dark1 mb-6"
            placeholder="Opponent deck"
          />
          <div className="flex mt-8 mb-12">
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
              className={`rounded-lg p-2 w-full bg-dark1 border border-green-600 text-white text-md font-semibold mx-2 ${
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
        </div>
      </div>
    </div>
  );
}
