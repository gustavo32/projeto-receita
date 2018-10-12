import React from "react";
import Facebook from "./facebook";
import Google from "./google";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { setToken, setLogin } from "../actions/itemActions";
import PropTypes from "prop-types";
import { getFromStorage } from "../utils/storage";

class Login extends React.Component {
  componentDidMount() {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      fetch("/api/account/verify?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.props.setToken(token);
          }
        });
    }
  }
  render() {
    const { token, signInError } = this.props.item;
    if (!token) {
      return (
        <span className="dropdown">
          <span>
            Entrar
            <ul className="dropdown-content">
              <li>
                {signInError ? (
                  <p style={{ color: "black" }}>{signInError}</p>
                ) : null}
                <input
                  type="email"
                  autoComplete="on"
                  placeholder="Email"
                  id="email"
                />
              </li>
              <li>
                <input type="password" placeholder="Senha" id="senha" />
              </li>
              <span>Esqueceu sua senha?</span>
              <button className="login-btn" onClick={this.signIn}>
                Entrar
              </button>
              <hr />
              <li>
                <Facebook className="facebook" />
              </li>
              <li>
                <Google />
              </li>
              <hr />
              <li>
                <Link to="/cadastrar">
                  <button className="signup-btn">Cadastrar</button>
                </Link>
              </li>
            </ul>
          </span>
        </span>
      );
    } else if (token) {
      return (
        <span className="logout" onClick={this.logout}>
          Sair
        </span>
      );
    }
  }
  signIn = () => {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    this.props.setLogin(email, senha);
  };
  logout = () => {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      fetch("/api/account/logout?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.props.setToken(null);
          }
        });
    }
  };
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setLogin: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { setToken, setLogin }
)(Login);
