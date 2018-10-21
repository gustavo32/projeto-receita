import React from "react";
import logo from "../imagens/logo.png";
import search_icon from "../imagens/search-icon.png";
import Login from "./login";

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg gradient-y-r">
        <div
          className="container-fluid"
          style={{ display: "flex", whiteSpace: "nowrap" }}
        >
          <img className="logo" src={logo} href="#" alt="logo" />
          <form action="/" style={{ marginLeft: "80px" }}>
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
            <Login />
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
