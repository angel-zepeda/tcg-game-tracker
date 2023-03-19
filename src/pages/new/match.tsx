import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addMatch } from "@/store/slices";
import { selectTournamentState } from "@/store/slices";
import { ConfirmModal, Header, MainCard } from "@/components";

export default function Match() {
  const tournamentState = useSelector(selectTournamentState);
  const dispatch = useDispatch();
  const [notification, setNotification] = useState<string | null>(null);
  const [lastMatch, setLastMatch] = useState({
    win: false,
    currentDeck: tournamentState.value.deck.toUpperCase(),
    opponentDeck: "",
  });

  const addMatchToList = (e: any) => {
    e.preventDefault();
    if (lastMatch.opponentDeck.trim() === "") {
      console.log("jer");
      return setNotification("Set your opponent deck");
    } else {
      dispatch(addMatch(lastMatch));
      setLastMatch({ ...lastMatch, opponentDeck: "" });
      setNotification("Match added ☑");
    }
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

          <p className="text-white text-sm">
            {" "}
            Total: {tournamentState.value.matchs.length}
          </p>
        </div>
      </Header>

      <MainCard>
        <h1 className="text-emerald-500 font-bold text-xl text-center mt-4">
          Add your Last Match
        </h1>
        <div className="mt-8">
          <input
            type="text"
            className="focus:outline-none border-b rounded-none w-full pb-2 border-gray-400 placeholder-gray-500 bg-white mb-4"
            value={lastMatch.currentDeck}
            name="name"
            readOnly
          />
          <p className="text-center font-bold text-orange-400">VS</p>
          <input
            type="text"
            className="focus:outline-none border-b rounded-none w-full pb-2 border-gray-400 placeholder-gray-500 bg-white mt-4"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setNotification(null);
              setLastMatch({
                ...lastMatch,
                opponentDeck: e.target.value.toUpperCase(),
              });
            }}
            value={lastMatch.opponentDeck}
            name="name"
            placeholder="Opponent Deck"
          />

          <div className="flex mt-8 mb-10">
            <button
              onClick={(e: any) => {
                e.preventDefault();
                setLastMatch({ ...lastMatch, win: false });
              }}
              className={`rounded-full p-2 w-full text-md text-emerald-500 border-green-600 font-semibold mx-2 border ${
                lastMatch.win
                  ? "text-emerald-500 border-emerald-500"
                  : "bg-emerald-500 text-white"
              }`}
            >
              LOSE 🤷🏻‍♂️
            </button>
            <button
              onClick={(e: any) => {
                e.preventDefault();
                setLastMatch({ ...lastMatch, win: true });
              }}
              className={`rounded-full p-2 w-full border border-green-600 text-md font-semibold mx-2 ${
                !lastMatch.win
                  ? "text-emerald-500 border-emerald-500"
                  : "bg-emerald-500 text-white"
              }`}
            >
              WIN 🏆
            </button>
          </div>
          {notification && (
            <h1 className="text-center text-sm text-indigo-400 mt-4">
              {notification}
            </h1>
          )}
          <div className="flex justify-center my-6">
            <button
              onClick={addMatchToList}
              className=" rounded-full p-3 w-full sm:w-56 bg-emerald-500 text-white text-lg font-semibold"
            >
              Add Match
            </button>
          </div>

          <div className="flex justify-center my-6">
            <button className=" rounded-full p-3 w-full sm:w-56 bg-indigo-500 text-white text-lg font-semibold">
              End Tournament
            </button>
          </div>
        </div>
      </MainCard>
    </>
  );
}
