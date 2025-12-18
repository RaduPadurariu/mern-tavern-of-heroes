import { useReducer } from "react";

type State = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAfterSubmit: boolean;
};

type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_CONFIRM_PASSWORD"; payload: string }
  | { type: "IS_AFTER_SUBMIT"; payload: boolean };

const initialValue = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  isAfterSubmit: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    case "IS_AFTER_SUBMIT":
      return { ...state, isAfterSubmit: action.payload };

    default:
      return state;
  }
}

export function useRegisterReducer() {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return { state, dispatch };
}
