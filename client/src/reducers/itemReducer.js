//reducers stays here
import {
  GET_ITEMS_PRIMARY,
  GET_ITEMS_OTHER,
  ITEMS_LOADING,
  PUT_LIKE,
  SET_TOKEN,
  SET_LOGIN,
  SET_SIGNUP,
  SET_LOGIN_FB,
  SET_LOGOUT,
  OPEN_MODAL,
  HIDE_MODAL
} from "../actions/types";

const initalState = {
  receitasPrimary: [],
  receitasOther: [],
  receita: [],
  loading: false,
  token: "",
  signInEmail: "",
  signInPassword: "",
  signInError: "",
  signUpNome: "",
  signUpEmail: "",
  signUpPassword: "",
  signUpError: "",
  isLoggedIn: false,
  isLoggedInFB: false,
  success: false,
  modalIsOpened: false,
  modalTitulo: "",
  modalIngredientes: [[]],
  modalPreparo: [[]]
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
    case SET_LOGIN_FB:
      return {
        ...state,
        isLoggedInFB: action.loginState
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
    case SET_LOGOUT:
      return {
        ...state,
        signInEmail: "",
        signInPassword: "",
        signInError: "",
        isLoggedIn: false,
        isLoggedInFB: false
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        signInError: ""
      };
    case SET_LOGIN:
      return {
        ...state,
        signInEmail: action.email,
        signInPassword: action.senha,
        signInError: action.payload.message,
        success: action.payload.success,
        token: action.payload.token,
        isLoggedIn: action.payload.isLoggedIn
      };
    case SET_SIGNUP:
      return {
        ...state,
        signUpNome: action.nome,
        signUpEmail: action.email,
        signUpPassword: action.senha,
        signUpError: action.payload.message,
        token: action.payload._id,
        success: action.payload.success,
        isLoggedIn: action.payload.isLoggedIn
      };
    case OPEN_MODAL:
      return {
        ...state,
        modalIsOpened: action.modalState,
        modalTitulo: action.titulo,
        modalIngredientes: action.ingredientes,
        modalPreparo: action.preparo
      };
    case HIDE_MODAL:
      return {
        ...state,
        modalIsOpened: action.modalState
      };
    default:
      return state;
  }
}
