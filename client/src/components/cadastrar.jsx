import React from "react";
import Footer from "./footer";

import { connect } from "react-redux";
import { setSignup } from "../actions/itemActions";
import PropTypes from "prop-types";

class Cadastrar extends React.Component {
  render() {
    return (
      <div className="background-cadastro">
        <div className="cadastro">
          <div className="header-titulo">
            <div className="title-cadastro">Cadastro</div>
          </div>
          <div className="cadastro-content">
            <label>Nome</label>
            <input type="text" id="nomeCadastro" />
            <label>Email</label>
            <input type="email" autoComplete="on" id="emailCadastro" />
            <label>Senha</label>
            <input
              type="password"
              placeholder="Pelo menos 6 caracteres"
              id="senhaCadastro"
            />
            <label>Confirmar senha</label>
            <input type="password" id="confirmarSenha" />
            <button
              className="signup-btn"
              id="signup-btn"
              style={{
                width: "40%",
                margin: "0 100px 0 100px",
                marginTop: "15px",
                fontWeight: "bold"
              }}
              onClick={this.signUp}
            >
              Cadastrar
            </button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
  signUp = () => {
    let nome = document.getElementById("nomeCadastro").value;
    let email = document.getElementById("emailCadastro").value;
    let senha = document.getElementById("senhaCadastro").value;
    let senha2 = document.getElementById("confirmarSenha").value;
    if (senha.length < 6) {
      alert("A senha precisa ter mais que 6 digitos!");
    } else if (senha === senha2) {
      this.props.setSignup(nome, email, senha);
    } else {
      alert("As senhas não são iguais!");
    }
  };
}

Cadastrar.propTypes = {
  setSignup: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  success: state.item.success,
  message: state.item.signUpError
});

export default connect(
  mapStateToProps,
  { setSignup }
)(Cadastrar);
