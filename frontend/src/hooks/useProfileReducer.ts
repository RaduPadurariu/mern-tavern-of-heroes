import { useReducer } from "react";

type State = {
  nickname: string;
  gender: string;
  heroClass: string;
  isAfterSubmit: boolean;
  submitStatus: boolean;
};

type Action =
  | { type: "SET_NICKNAME"; payload: string }
  | { type: "SET_GENDER"; payload: string }
  | { type: "SET_HERO_CLASS"; payload: string }
  | { type: "IS_AFTER_SUBMIT"; payload: boolean }
  | { type: "SUBMIT_STATUS"; payload: boolean };

const initialValue = {
  nickname: "",
  gender: "",
  heroClass: "",
  isAfterSubmit: false,
  submitStatus: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_NICKNAME":
      return { ...state, nickname: action.payload };
    case "SET_GENDER":
      return { ...state, gender: action.payload };
    case "SET_HERO_CLASS":
      return { ...state, heroClass: action.payload };
    case "IS_AFTER_SUBMIT":
      return { ...state, isAfterSubmit: action.payload };
    case "SUBMIT_STATUS":
      return { ...state, submitStatus: action.payload };
    default:
      return state;
  }
}

export function useProfileReducer() {
  const [state, dispatch] = useReducer(reducer, initialValue);
  return { state, dispatch };
}
