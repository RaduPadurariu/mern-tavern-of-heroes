import { useReducer } from "react";

type State = {
  nickname: string;
  gender: string;
  heroClass: string;
  username: string;
  email: string;
};

type Action =
  | { type: "SET_NICKNAME"; payload: string }
  | { type: "SET_GENDER"; payload: string }
  | { type: "SET_HERO_CLASS"; payload: string }
  | { type: "SET_USERNAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string };

const initialValue = {
  nickname: "",
  gender: "",
  heroClass: "",
  username: "",
  email: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_NICKNAME":
      return { ...state, nickname: action.payload ?? "" };
    case "SET_GENDER":
      return { ...state, gender: action.payload ?? "" };
    case "SET_HERO_CLASS":
      return { ...state, heroClass: action.payload ?? "" };
    case "SET_USERNAME":
      return { ...state, username: action.payload ?? "" };
    case "SET_EMAIL":
      return { ...state, email: action.payload ?? "" };
    default:
      return state;
  }
}

export function useProfileReducer() {
  const [state, dispatch] = useReducer(reducer, initialValue);
  return { state, dispatch };
}
