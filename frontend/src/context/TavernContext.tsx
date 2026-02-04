import { createContext } from "react";
import type { TavernContextType } from "../types/types";

export const TavernContext = createContext<TavernContextType | undefined>(
  undefined,
);
