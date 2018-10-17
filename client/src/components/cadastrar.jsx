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
    //#todo apesar de estar cadastrando e a mensagem ser 'cadastro efetuado' no itemReducer.js, nesta funcao a mensagem nao apresenta nada... o problema esta que no itemreducer nao esta fazendo o set
    let { success, signUpEmail } = this.props.item;

    let nome = document.getElementById("nomeCadastro").value;
    let email = document.getElementById("emailCadastro").value;
    let senha = document.getElementById("senhaCadastro").value;
    let senha2 = document.getElementById("confirmarSenha").value;
    if (senha.length < 6) {
      console.log("senha menor que 6 digitos");
    } else if (senha === senha2) {
      this.props.setSignup(nome, email, senha);
      // console.log(this.props.success + " " + this.props.message);
      // if (success) {
      //   return <Redirect to="/" />;
      // }
    } else {
      console.log("As senhas não são iguais!");
    }
    console.log("depois");
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
