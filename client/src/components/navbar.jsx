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
    onLoad: false,
    search_ready: false
  };
  componentDidMount() {
    let inputValue = document.getElementById("search");
    inputValue.addEventListener("keyup", e => {
      if (inputValue && inputValue.focus && e.keyCode === 13)
        this.searchInput();
    });
    if (window.screen.width <= 630) {
      let logo = document.getElementsByClassName("logo")[0];
      let search = document.getElementById("search");
      let space = document.getElementsByClassName("space-80")[0];
      let row = document.getElementsByClassName("row")[0];
      let searchBtn = document.getElementsByClassName("search-btn")[0];
      searchBtn.addEventListener(
        "focus",
        () => {
          logo.style = "display: none;";
          search.style = "display: inline-block !important;";
          space.style = "margin-left: 0px;";
          search.focus();
          this.setState({ search_ready: true });
        },
        true
      );

      row.addEventListener(
        "click",
        () => {
          logo.style = "display: inline-block;";
          search.style = "display: none !important;";
          space.style = "margin-left: 80px;";
          this.setState({ search_ready: false });
        },
        true
      );
    }
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
          <div className="space-80">
            <input type="search test" id="search" placeholder="Pesquisar..." />

            <button
              className="search-btn test"
              onClick={() => this.searchInput()}
            >
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
    if (window.screen.width > 630 || this.state.search_ready) {
      let search = document.getElementById("search").value;
      if (search) {
        history.push("/verMais/descritive_search/" + search);
        this.setState({ onLoad: true });
        //window.location.reload();
        document.onload = function() {
          document.getElementById("default").focus();
        };
      }
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
