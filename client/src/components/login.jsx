import React from "react";
import Facebook from "./facebook";
import Google from "./google";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import {
  setToken,
  setLogin,
  setLogout,
  setLoginInitial
} from "../actions/itemActions";
import PropTypes from "prop-types";

class Login extends React.Component {
  componentDidMount() {
    this.props.setLoginInitial();
  }
  render() {
    const { token, signInError } = this.props.item;
    if (!token) {
      return (
        <span className="dropdown">
          <span>
            <span className="sign-in">Entrar</span>
            <i
              className="show-mobile fa fa-user-circle-o big"
              aria-hidden="true"
            />
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
        <span className="logout" onClick={this.props.setLogout}>
          <span className="sign-in">Sair</span>
          <i class="show-mobile fa fa-sign-out big" aria-hidden="true" />
        </span>
      );
    }
  }
  signIn = () => {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    this.props.setLogin(email, senha);
  };
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setLogin: PropTypes.func.isRequired,
  setLogout: PropTypes.func.isRequired,
  setLoginInitial: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { setToken, setLogin, setLogout, setLoginInitial }
)(Login);
