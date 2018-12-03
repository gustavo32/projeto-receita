import React from "react";
import logo from "../imagens/logo.png";
// import search_icon from "../imagens/search-icon.png";
import Login from "./login";
import { Link } from "react-router-dom";
import history from "../history";
import { connect } from "react-redux";
import { getMoreReceitas } from "../actions/itemActions";
import PropTypes from "prop-types";

class NavBar extends React.Component {
  state = {
    onLoad: false
  };
  componentDidMount() {
    let inputValue = document.getElementById("search");
    inputValue.addEventListener("keyup", e => {
      if (inputValue && inputValue.focus && e.keyCode === 13)
        this.searchInput();
    });
  }

  componentDidUpdate() {
    console.log(this.state.onLoad);
    if (this.state.onLoad) {
      document.getElementById("search").focus();
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg gradient-y-r">
        <div
          className="container-fluid"
          style={{ display: "flex", whiteSpace: "nowrap" }}
        >
          <Link to="/">
            <img
              className="logo"
              src={logo}
              alt="logo"
              style={{ cursor: "pointer" }}
            />
          </Link>
          <div style={{ marginLeft: "80px" }}>
            <input
              type="search"
              id="search"
              className="hide-mobile"
              placeholder="Pesquisar..."
            />

            <button className="search-btn" onClick={() => this.searchInput()}>
              <i className="fa fa-search" aria-hidden="true" />
            </button>
          </div>
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
  searchInput = () => {
    let search = document.getElementById("search").value;
    if (search) {
      history.push("/verMais/descritive_search/" + search);
      this.setState({ onLoad: true });
      //window.location.reload();
      document.onload = function() {
        document.getElementById("default").focus();
      };
    }
  };
}

NavBar.propTypes = {
  getMoreReceitas: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getMoreReceitas }
)(NavBar);
