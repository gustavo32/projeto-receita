import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setIngredientesUser, getMoreReceitas } from "../actions/itemActions";
import history from "../history";

class List extends React.Component {
  componentDidMount() {
    let inputValue = document.getElementById("myInput");
    inputValue.addEventListener("keyup", e => {
      if (inputValue && inputValue.focus && e.keyCode === 13) this.newElement();
    });
  }

  render() {
    return (
      <div className="mt-4">
        <div style={{ margin: "0 5% 0 5%" }}>
          <div id="myDIV" className="header">
            <div>
              <input type="text" id="myInput" placeholder="Digite um item..." />
              <span onClick={this.newElement} className="addBtn">
                <i className="fa fa-arrow-right" id="arrow-right" />
              </span>
              <div style={{ marginRight: "0px", paddingTop: "10px" }}>
                <span className="badge-info">
                  <i className="fa fa-question">
                    <span
                      className="tooltiptext"
                      style={{
                        padding: "8px 5px 8px 5px",
                        justifyContent: "justify"
                      }}
                    >
                      Não se preocupe com os temperos básicos, nós já
                      adicionamos para você!
                    </span>
                  </i>
                </span>
              </div>
            </div>
          </div>

          <ul id="myUL" />
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            className="border white btn round mt-1 hover-orange"
            onClick={() => this.handlePesquisar()}
          >
            Pesquisar{" "}
            <i
              className="fa fa-search"
              style={{ paddingLeft: "10px" }}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    );
  }

  handlePesquisar = () => {
    let m = document.getElementById("myUL");
    let ingred = [];
    for (let i = 0; i < m.childNodes.length; i++) {
      ingred.push(m.childNodes[i].textContent.slice(0, -1));
    }
    if (ingred.length > 0) {
      history.push(`/verMais/exclusive_search/${ingred}`);
    } else {
      alert("Você precisa colocar seus ingredientes primeiro!");
    }
  };

  updateDB = () => {
    if (this.props.item.isLoggedIn) {
      let ingred = this.state.ingredientes;
      if (this.props.item.isLoggedIn) {
        this.props.setIngredientesUser(ingred, this.props.item.token);
      }
    }
  };

  handleClick = e => {
    let div = e.target;
    div.parentNode.remove(div);
    let m = document.getElementById("myUL");
    let ingred = [];
    for (let i = 0; i < m.childNodes.length; i++) {
      ingred.push(m.childNodes[i].textContent.slice(0, -1));
    }
    this.props.setIngredientesUser(ingred, this.props.item.token);
  };

  newElement = () => {
    let inputValue = document.getElementById("myInput").value;
    if (inputValue !== "") {
      let array = inputValue.split(",");
      let t;
      for (let i = 0; i < array.length; i++) {
        array[i] = array[i].trimLeft();
        array[i] = array[i].trimRight();
        array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
        t = document.createTextNode(array[i]);
        let li = document.createElement("li");
        li.appendChild(t);
        li.className = "newFade";
        document.getElementById("myUL").appendChild(li);

        document.getElementById("myInput").value = "";
        document.getElementById("myInput").focus();

        let span = document.createElement("SPAN");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);

        let close = document.getElementsByClassName("close");

        for (let i = 0; i < close.length; i++) {
          close[i].onclick = this.handleClick;
        }
      }
      let m = document.getElementById("myUL");
      let ingred = [];
      for (let i = 0; i < m.childNodes.length; i++) {
        ingred.push(m.childNodes[i].textContent.slice(0, -1));
      }
      this.props.setIngredientesUser(ingred, this.props.item.token);
    } else {
      alert("Você deve digitar algo!");
    }
  };
}

List.propTypes = {
  item: PropTypes.object.isRequired,
  setIngredientesUser: PropTypes.func.isRequired,
  getMoreReceitas: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { setIngredientesUser, getMoreReceitas }
)(List);
