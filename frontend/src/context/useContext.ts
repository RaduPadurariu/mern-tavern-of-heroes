import { useContext } from "react";
import { TavernContext } from "./TavernContext";

export const useTavernContext = () => {
  const context = useContext(TavernContext);

  if (!context) {
    throw new Error("useContext must be use withing Provider");
  }

  return context;
};
