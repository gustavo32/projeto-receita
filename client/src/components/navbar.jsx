import React from "react";
import logo from "../imagens/logo.png";
import search_icon from "../imagens/search-icon.png";
import Facebook from "./facebook";
import Google from "./google";

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg gradient-y-r">
        <div className="container-fluid">
          <img className="logo" src={logo} href="#" alt="logo" />
          <form action="/" style={{ marginLeft: "120px" }}>
            <input
              type="search"
              className="hide-mobile"
              style={{
                borderRadius: 100,
                paddingLeft: 20,
                height: 30,
                width: "280px"
              }}
              placeholder="Pesquisar..."
            />

            <button
              type="submit"
              style={{ cursor: "pointer", background: "none" }}
            >
              <img
                src={search_icon}
                style={{ width: 35, height: 35 }}
                alt="search"
              />
            </button>
          </form>
          <div>
            <a href="#!" className="hide-mobile">
              <span>Entradas</span>
            </a>
            <a href="#!" className="hide-mobile">
              <span>Prato Principal</span>
            </a>
            <a href="#!" className="hide-mobile">
              <span>Sobremesas</span>
            </a>
            <a href="#!" className="hide-mobile">
              <span style={{ paddingRight: 0 }}>Drinks</span>
            </a>
            <span className="vr hide-mobile" />

            <span className="dropdown">
              <span>
                Entrar
                <ul className="dropdown-content">
                  <li>
                    <input type="email" autoComplete="on" placeholder="Email" />
                  </li>
                  <li>
                    <input type="password" placeholder="Senha" />
                  </li>
                  <span>Esqueceu sua senha?</span>
                  <button className="login-btn">Entrar</button>
                  <hr />
                  <li>
                    <Facebook className="facebook" />
                  </li>
                  <li>
                    <Google />
                  </li>
                  <hr />
                  <li>
                    <a href="/cadastrar">
                      <button className="signup-btn" href="/cadastrar">
                        Cadastre-se
                      </button>
                    </a>
                  </li>
                </ul>
              </span>
            </span>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
