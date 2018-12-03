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
  GET_LIKE,
  GET_MORE_RECEITAS,
  REMOVE_MORE_RECEITAS
} from "../actions/types";

const initalState = {
  receitasPrimary: [],
  receitasOther: [],
  loading: false,
  likes: [],
  moreReceitas: [],
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

    case REMOVE_MORE_RECEITAS:
      return {
        ...state,
        moreReceitas: []
      };
    case GET_INGREDIENTES_USER:
      return {
        ...state,
        ingredientesUser: action.ingredientes
      };
    case GET_MORE_RECEITAS:
      return {
        ...state,
        moreReceitas: state.moreReceitas.concat(action.payload),
        loading: false
      };
    case GET_LIKE:
      return {
        ...state,
        likes: action.likes
      };
    case GET_RECEITAS:
      if (action.tipo === "primary") {
        return {
          ...state,
          receitasPrimary: action.payload,
          loading: false
        };
      } else if (action.tipo === "other") {
        return {
          ...state,
          receitasOther: action.payload,
          loading: false
        };
      }
      break;
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
