import { useReducer } from "react";

type State = {
  title: string;
  content: string;
  date: string;
  isAfterSubmit: boolean;
};

type Action =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_CONTENT"; payload: string }
  | { type: "SET_DATE"; payload: string }
  | { type: "IS_AFTER_SUBMIT"; payload: boolean };

const initialValue: State = {
  title: "",
  content: "",
  date: "",
  isAfterSubmit: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_CONTENT":
      return { ...state, content: action.payload };
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "IS_AFTER_SUBMIT":
      return { ...state, isAfterSubmit: action.payload };
    default:
      return state;
  }
}

export const useRumorsReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return {
    state,
    dispatch,
  };
};
