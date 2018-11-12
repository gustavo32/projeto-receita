import {
  GET_RECEITAS,
  ITEMS_LOADING,
  PUT_LIKE,
  SET_TOKEN,
  SET_LOGIN,
  SET_SIGNUP,
  SET_LOGIN_FB,
  SET_LOGOUT,
  OPEN_MODAL,
  HIDE_MODAL,
  LOGGED_IN,
  SET_INGREDIENTES_USER,
  GET_INGREDIENTES_USER
} from "./types";
import axios from "axios";
import { setInStorage, getFromStorage } from "../utils/storage";
import history from "../history";

export const getItemsPrimary = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get("/api/receitas/primaryContent").then(res =>
    dispatch({
      type: GET_RECEITAS,
      payload: res.data,
      tipo: "primary"
    })
  );
};

export const getItemsOther = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get("/api/receitas/otherContent").then(res =>
    dispatch({
      type: GET_RECEITAS,
      payload: res.data,
      tipo: "other"
    })
  );
};

export const handleClick2 = e => {
  let div = e.target;
  div.parentNode.remove(div);
  let m = document.getElementById("myUL");
  let ingred = [];
  for (let i = 0; i < m.childNodes.length; i++) {
    ingred.push(m.childNodes[i].textContent.slice(0, -1));
  }
  this.setState(
    {
      ingredientes: ingred
    },
    res => {
      this.updateDB();
    }
  );
};

export const getIngredientesUser = token => dispatch => {
  axios.get(`/api/receitas/ingredientes_user/${token}`).then(res => {
    if (res.data.success) {
      dispatch({
        type: GET_INGREDIENTES_USER,
        ingredientes: res.data.ingredientes
      });
      let ingredientes = res.data.ingredientes;
      let t;
      for (let i = 0; i < ingredientes.length; i++) {
        t = document.createTextNode(ingredientes[i]);
        let li = document.createElement("li");
        li.appendChild(t);

        document.getElementById("myUL").appendChild(li);

        document.getElementById("myInput").value = "";
        document.getElementById("myInput").focus();

        let span = document.createElement("SPAN");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
      }
    }
  });
};

export const putLike = (props, userToken) => dispatch => {
  axios.put(`/api/receitas/putLike/${props.id}/${userToken}`).then(res => {
    dispatch({
      type: PUT_LIKE,
      id: props.id,
      likes: res.data.likes
    });
  });
};

export const setIngredientesUser = (ingredientes, token) => dispatch => {
  axios
    .post(`/api/receitas/salvar_ingredientes/${token}/${ingredientes}`)
    .then(res => {
      if (res.data.success) {
        dispatch({
          type: SET_INGREDIENTES_USER
        });
      }
    });
};

export const setLoginFacebook = (nome, email, senha) => dispatch => {
  axios.get("/api/account/verify_email?email=" + email).then(res => {
    if (res.data.success) {
      dispatch(setLogin(email, senha));
      if (res.data.success) {
        dispatch({
          type: SET_LOGIN_FB,
          stateLogin: true
        });
      }
    } else {
      dispatch(setSignup(nome, email, senha));
    }
  });
};

export const setLogout = () => dispatch => {
  const obj = getFromStorage("the_main_app");
  if (obj && obj.token) {
    const { token } = obj;
    axios.get("/api/account/logout?token=" + token).then(res => {
      if (res.data.success) {
        setInStorage("the_main_app", { token: null });
        dispatch(setToken(null));
        dispatch({
          type: SET_LOGOUT,
          payload: res.data
        });
        if (res.data.isLoggedInFB) window.FB.logout();
      }
    });
  }
};

export const setLoginInitial = () => dispatch => {
  const obj = getFromStorage("the_main_app");
  if (obj && obj.token) {
    const { token } = obj;
    axios.get("/api/account/verify?token=" + token).then(res => {
      if (res.data.success) {
        dispatch(setToken(token));
        dispatch({
          type: LOGGED_IN,
          loginState: true
        });
        dispatch(getIngredientesUser(token));
      }
    });
  }
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
        dispatch(getIngredientesUser(json.payload.token));
      }
    });
};

export const setSignup = (nome, email, senha) => dispatch => {
  let data1 = JSON.stringify({
    nome: nome,
    email: email,
    senha: senha
  });
  axios
    .post("/api/account/signup", data1, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res =>
      dispatch({
        type: SET_SIGNUP,
        nome: nome,
        email: email,
        senha: senha,
        payload: res.data
      })
    )
    .then(json => {
      if (json.payload.success) {
        dispatch(setLogin(json.email, json.senha));
        history.push("/");
      }
    });
};

export const setToken = token => dispatch => {
  dispatch({
    type: SET_TOKEN,
    payload: token
  });
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};

export const openModal = props => {
  return {
    type: OPEN_MODAL,
    modalState: true,
    titulo: props.titulo,
    ingredientes: props.ingredientes,
    preparo: props.preparo,
    urlImg: props.img,
    autor: props.autor
  };
};

export const hideModal = () => {
  return {
    type: HIDE_MODAL,
    modalState: false
  };
};
