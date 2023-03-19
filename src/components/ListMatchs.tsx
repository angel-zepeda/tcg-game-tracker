import { selectTournamentState, TorunamentState } from "@/store/slices";
import { useSelector } from "react-redux";

export const ListMatchs = () => {
  const tournamentState = useSelector(selectTournamentState);

  return (
    <div className="h-20 overflow-y-auto w-full mt-2  rounded-lg border-b border-gray-700 shadow-lg p-1">
      {tournamentState.value.matchs.map((item: any, index: number) => (
        <div
          key={index}
          className="text-white flex justify-between px-8 py-1 mt-2 bg-dark1 my-1 text-sm"
        >
          <div
            className={`w-1/3 text-left ${item.win ? "text-green-200" : ""}`}
          >
            {item.currentDeck}
          </div>{" "}
          <div className="text-yellow-500 w-1/3 text-center">vs</div>
          <div
            className={`w-1/3 break-words text-right ${
              !item.win ? "text-red-200" : ""
            }`}
          >
            {item.opponentDeck}
          </div>
          {/*  */}
        </div>
      ))}
    </div>
  );
};
