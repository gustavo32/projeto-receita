import React from "react";
import { connect } from "react-redux";
import { putLike, openModal } from "../actions/itemActions";
import PropTypes from "prop-types";

class RecommendFrame extends React.Component {
  render() {
    return (
      <div className="mb-4">
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "4px"
          }}
        >
          <div
            className="display-container opacity-min hover-opacity-off"
            style={{ transition: "0.5s", width: "100%" }}
          >
            <img
              src={this.props.img}
              alt="receita"
              style={{
                width: "100%",
                borderRadius: "4px 4px 0 0",
                height: "18vw",
                overflow: "hidden",
                objectFit: "cover",
                cursor: "pointer"
              }}
              onClick={() => this.props.openModal(this.props)}
            />
            <div
              className="display-topright display-hover off"
              style={{ right: 65 }}
            >
              <button
                type="button"
                className="animate-opacity btn margin round"
                title="Compartilhar"
              >
                <i className="fa fa-share-alt text-blue" />
              </button>
            </div>
            {this.tempo()}
            {this.displayText()}
            <div className="display-topright display-hover off">
              <button
                type="button"
                className={this.classLike()}
                title="Amei"
                onClick={() => this.addLike()}
              >
                {this.getLikes()}
                <i
                  className="fa fa-heart"
                  style={{ WebkitTextStroke: " 1px #f44336" }}
                />
              </button>
            </div>
            <div className="display-bottomleft display-hover text-white off">
              <div
                className="padding animate-opacity"
                style={{
                  textTransform: "capitalize",
                  WebkitTextStroke: "0.1px black"
                }}
              >
                {this.props.autor}
              </div>
            </div>
          </div>
          <div className="text-title">
            <span>{this.props.titulo}</span>
          </div>
        </div>
      </div>
    );
  }
  addLike = () => {
    if (this.props.item.isLoggedIn) {
      this.props.putLike(this.props);
    } else {
      alert("Faça Login para curtir!");
    }
  };
  classLike() {
    let classe = "animate-opacity btn margin ";
    if (this.props.item.isLoggedIn) {
      return classe + "text-red";
    } else {
      return classe + "text-white-hover-red";
    }
  }

  getLikes() {
    if (this.props.likes > 0) {
      return (
        <span
          className="badge badge-pill badge-danger"
          style={{
            position: "absolute",
            border: 0,
            margin: 0,
            padding: "5px",
            right: "10%",
            top: "10%"
          }}
        >
          {this.props.likes}
        </span>
      );
    }
  }

  tempo() {
    if (this.props.tempo) {
      return (
        <div
          className="display-middle display-hover off"
          style={{ top: "48%" }}
        >
          <div className="text-center animate-opacity">
            <i className="fa fa-clock-o">
              <span style={{ paddingLeft: 8 }}>{this.props.tempo}</span>
            </i>
          </div>
        </div>
      );
    } else {
    }
  }
  displayText() {
    if (this.props.tempo) {
      return (
        <div
          className="display-middle display-hover off"
          style={{ top: "64%" }}
        >
          <div className="text-center animate-opacity" id="porcoes">
            <i className="fa fa-users">
              <span style={{ paddingLeft: 10 }}>
                {this.props.porcoes} porções
              </span>
            </i>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="display-middle display-hover off"
          style={{ top: "50%" }}
        >
          <div className="text-center animate-opacity" id="porcoes">
            <i className="fa fa-users">
              <span style={{ paddingLeft: 10 }}>
                {this.props.porcoes} porções
              </span>
            </i>
          </div>
        </div>
      );
    }
  }
}

RecommendFrame.propTypes = {
  putLike: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { putLike, openModal }
)(RecommendFrame);
