import React from "react";

import { connect } from "react-redux";
import { hideModal } from "../actions/itemActions";
import PropTypes from "prop-types";
import uuid from "uuid";

class Modal extends React.Component {
  componentDidMount() {
    document.addEventListener("keyup", e => {
      if (this.props.item.modalIsOpened && e.keyCode === 27) this.close();
    });
  }
  render() {
    if (this.props.item.modalIsOpened) {
      return (
        <div id="modal" className="modal">
          <span className="modal-close" onClick={this.close}>
            &times;
          </span>
          <div className="modal-content">
            <img
              src={this.props.item.modalImg}
              alt="receita"
              style={{
                width: "100%",
                height: "40vh",
                overflow: "hidden",
                objectFit: "cover"
              }}
            />
            <div className="modal-title">{this.props.item.modalTitulo}</div>
            <div
              className="text-title"
              style={{
                margin: "1.5rem 0px 0.8rem 2rem",
                fontSize: "28px",
                textAlign: "left"
              }}
            >
              Ingredientes
            </div>
            <div className="vr-modal">
              <ul>
                {this.props.item.modalIngredientes.map(item => {
                  return item.map(r_item => {
                    return r_item.sub_lista.map(ingredientes => {
                      return (
                        <li key={uuid()} className="text-ingredientes">
                          {ingredientes}
                        </li>
                      );
                    });
                  });
                })}
              </ul>
            </div>
            <div
              className="text-title"
              style={{
                margin: "3rem 0px 0.8rem 2rem",
                fontSize: "28px",
                textAlign: "left"
              }}
            >
              Modo de Preparo
            </div>
            <div className="vr-modal">
              <ul>
                {this.props.item.modalPreparo.map(item => {
                  return item.map(r_item => {
                    return r_item.sub_lista.map(preparo => {
                      return (
                        <li key={uuid()} className="text-preparo">
                          {preparo}
                        </li>
                      );
                    });
                  });
                })}
              </ul>
            </div>
            <p
              style={{
                float: "right",
                margin: "2rem 2rem 0.5rem 0",
                textTransform: "capitalize"
              }}
            >
              Autor: {this.props.item.modalAutor}
            </p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
  close = () => {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
    this.props.hideModal();
  };
}

Modal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { hideModal }
)(Modal);
