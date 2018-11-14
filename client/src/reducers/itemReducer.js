//reducers stays here
import {
  GET_RECEITAS,
  ITEMS_LOADING,
  SET_TOKEN,
  SET_LOGIN,
  SET_SIGNUP,
  SET_LOGIN_FB,
  SET_LOGOUT,
  OPEN_MODAL,
  HIDE_MODAL,
  LOGGED_IN,
  SET_INGREDIENTES_USER,
  GET_INGREDIENTES_USER,
  GET_LIKE
} from "../actions/types";

const initalState = {
  receitas: [],
  loading: false,
  likes: [],
  ingredientesUser: [],
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
  modalPreparo: [[]],
  modalImg: "",
  modalAutor: ""
};

export default function(state = initalState, action) {
  switch (action.type) {
    case SET_INGREDIENTES_USER:
      return {
        ...state,
        ingredientesUser: action.ingredientes
      };

    case GET_INGREDIENTES_USER:
      return {
        ...state,
        ingredientesUser: action.ingredientes
      };
    case GET_LIKE:
      return {
        ...state,
        likes: action.likes
      };
    case GET_RECEITAS:
      return {
        ...state,
        receitas: [
          ...state.receitas,
          { receita: action.payload, tipo: action.tipo }
        ],
        loading: false
      };
    case SET_LOGIN_FB:
      return {
        ...state,
        isLoggedInFB: action.loginState
      };
    case LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.loginState
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
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
        modalPreparo: action.preparo,
        modalImg: action.urlImg,
        modalAutor: action.autor
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
