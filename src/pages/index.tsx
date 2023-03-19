import { selectGlobalState } from "@/store/slices/global";
import { useSelector } from "react-redux";
import AddMatch from "./AddMatch";
import Init from "./Init";
import Results from "./Results";

export default function Home() {
  const globalState = useSelector(selectGlobalState);

  switch (globalState.page) {
    case "Dashboard":
      return <h1>Dashboard</h1>;
    case "Init":
      return <Init />;
    case "Matchs":
      return <AddMatch />;
    case "Results":
      return <Results />;
    default:
      return <></>;
  }
}
