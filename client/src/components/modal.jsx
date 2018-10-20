import React from "react";

import { connect } from "react-redux";
import { hideModal } from "../actions/itemActions";
import PropTypes from "prop-types";

class Modal extends React.Component {
  render() {
    if (this.props.item.modalIsOpened)
      return (
        <div id="modal" className="modal">
          <span className="modal-close" onClick={this.close}>
            &times;
          </span>
          <div className="modal-content">
            <div
              className="text-title"
              style={{ marginTop: "15px", fontSize: "36px" }}
            >
              {this.props.item.modalTitulo}
              {console.log(this.props.item.modalTitulo)}
            </div>
            <div className="hr-effect" />
            <div
              className="text-title"
              style={{
                margin: "15px 0px 0px 30px",
                fontSize: "28px",
                textAlign: "left"
              }}
            >
              Ingredientes
            </div>
            <div className="hr-effect" style={{ marginTop: "280px" }} />
            <div
              className="text-title"
              style={{
                margin: "10px 0px 480px 30px",
                fontSize: "28px",
                textAlign: "left"
              }}
            >
              Modo de Preparo
            </div>
          </div>
        </div>
      );
    else {
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
