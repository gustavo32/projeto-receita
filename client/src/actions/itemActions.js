import {
  GET_ITEMS_PRIMARY,
  GET_ITEMS_OTHER,
  ITEMS_LOADING,
  PUT_LIKE,
  SET_TOKEN,
  SET_LOGIN
} from "./types";
import axios from "axios";
import { setInStorage } from "../utils/storage";

export const getItemsPrimary = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get("/api/receitas/primaryContent").then(res =>
    dispatch({
      type: GET_ITEMS_PRIMARY,
      payload: res.data
    })
  );
};

export const getItemsOther = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get("/api/receitas/otherContent").then(res =>
    dispatch({
      type: GET_ITEMS_OTHER,
      payload: res.data
    })
  );
};

export const putLike = id => dispatch => {
  axios.put(`/api/receitas/${id}`).then(res =>
    dispatch({
      type: PUT_LIKE,
      payload: res.id
    })
  );
};

export const setLogin = (email, senha) => dispatch => {
  let data = JSON.stringify({
    email: email,
    senha: senha
  });
  axios
    .post("/api/account/signin", data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res =>
      dispatch({
        type: SET_LOGIN,
        email: email,
        senha: senha,
        payload: res.data
      })
    )
    .then(json => {
      if (json.payload.success) {
        setInStorage("the_main_app", { token: json.payload.token });
      }
    });
};

export const setToken = token => {
  return {
    type: SET_TOKEN,
    payload: token
  };
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
