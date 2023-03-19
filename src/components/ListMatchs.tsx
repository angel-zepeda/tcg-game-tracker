import { selectTournamentState, TorunamentState } from "@/store/slices";
import { useSelector } from "react-redux";

export const ListMatchs = () => {
  const tournamentState = useSelector(selectTournamentState);

  return (
    <div className="h-24 overflow-y-auto w-full rounded-lg p-1">
      {tournamentState.value.matchs.map((item: any, index: number) => (
        <div key={index} className="flex justify-between px-6 mt-1">
          <div
            className={`w-1/3 text-left font-bold text-xs ${
              item.win ? "text-green-500" : ""
            }`}
          >
            {item.currentDeck}
          </div>{" "}
          <div className="text-yellow-500 w-1/3 text-center">vs</div>
          <div
            className={`w-1/3 break-words text-right font-bold text-xs ${
              !item.win ? "text-red-500" : ""
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
