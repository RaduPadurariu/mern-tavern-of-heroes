import { useReducer } from "react";

type State = {
  email: string;
  password: string;
  isAfterSubmit: boolean;
};

type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "IS_AFTER_SUBMIT"; payload: boolean };

const initialValue = {
  email: "",
  password: "",
  isAfterSubmit: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "IS_AFTER_SUBMIT":
      return { ...state, isAfterSubmit: action.payload };
    default:
      return state;
  }
}

export function useLoginReducer() {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return { state, dispatch };
}
