//reducers stays here
import {
  GET_ITEMS_PRIMARY,
  GET_ITEMS_OTHER,
  ITEMS_LOADING,
  PUT_LIKE,
  SET_TOKEN,
  SET_LOGIN
} from "../actions/types";

const initalState = {
  receitasPrimary: [],
  receitasOther: [],
  receita: [],
  loading: false,
  token: "",
  signInEmail: "",
  signInPassword: "",
  signInError: ""
};

export default function(state = initalState, action) {
  switch (action.type) {
    case GET_ITEMS_PRIMARY:
      return {
        ...state,
        receitasPrimary: action.payload,
        loading: false
      };
    case GET_ITEMS_OTHER:
      return {
        ...state,
        receitasOther: action.payload,
        loading: false
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    case PUT_LIKE:
      return {
        ...state
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case SET_LOGIN:
      return {
        ...state,
        signInEmail: action.email,
        signInPassword: action.senha,
        signInError: action.payload.message,
        token: action.payload.token
      };

    default:
      return state;
  }
}
