import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

import { selectTournamentState } from "@/store/slices";

ChartJS.register(ArcElement, Tooltip, Legend);

const getWinsAndLoses = (matchs: any) => {
  const totalWins = matchs.reduce((acc: number, item: { win: boolean }) => {
    if (item.win) acc += 1;
    return acc;
  }, 0);

  const totalLoses = matchs.reduce((acc: number, item: { win: boolean }) => {
    if (!item.win) acc += 1;
    return acc;
  }, 0);

  return { totalWins, totalLoses };
};

const getOpponentDecks = () => {};

const getWinsByDeck = () => {};

export const Results = () => {
  const tournamentState = useSelector(selectTournamentState);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const dataT = {
      labels: [
        "Traptrix",
        "Heroes",
        "Despia",
        "Dark world",
        "random",
        "random",
      ],
      datasets: [
        {
          label: "Players",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    setData(dataT);
  }, []);

  return (
    <div className="py-10">
      <h1 className="text-sky-600 text-center text-xl">
        {tournamentState.value.name.toUpperCase()}
      </h1>
      <div className="p-10">
        <div className="text-white text-left text-sm flex justify-between">
          <span className="text-sky-600">Date:</span>{" "}
          {tournamentState.value.date}
        </div>
        <div className="text-white text-left text-sm flex justify-between ">
          <span className="text-sky-600">Deck:</span>{" "}
          {tournamentState.value.deck}
        </div>
        <div className="text-white text-left text-sm flex justify-between ">
          <span className="text-sky-600">Wins: </span>{" "}
          {getWinsAndLoses(tournamentState.value.matchs).totalWins}
        </div>
        <div className="text-white text-left text-sm  flex justify-between">
          <span className="text-sky-600">Lose:</span>{" "}
          {getWinsAndLoses(tournamentState.value.matchs).totalLoses}
        </div>
        <div className="text-white text-left text-sm  flex justify-between">
          <span className="text-sky-600">TCG:</span> {tournamentState.value.tcg}
        </div>
      </div>

      <div className="flex items-start justify-center w-full h-screen mt-10">
        {data && <Pie data={data} />}
      </div>
    </div>
  );
};
