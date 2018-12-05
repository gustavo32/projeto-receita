import React from "react";
import { connect } from "react-redux";
import {
  postLike,
  openModal,
  getLike,
  postDislike
} from "../actions/itemActions";
import PropTypes from "prop-types";

class RecommendFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: [],
      count: 0
    };
  }
  componentDidMount() {
    this.setState({ likes: this.props.item.likes });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.item.likes.length !== this.props.item.likes.length) {
      this.setState({ likes: nextProps.item.likes });
    }
  }

  render() {
    let imagem = this.props.img;
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
              src={imagem}
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
            <div className="hide-mobile">
              {this.tempo()}
              {this.displayText()}
            </div>
            {this.ameiButton()}
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
            <span style={{ textTransform: "capitalize" }}>
              {this.props.titulo}
            </span>
          </div>
        </div>
      </div>
    );
  }
  ameiButton = () => {
    return (
      <div className="display-topright display-hover off">
        <button
          type="button"
          className={this.classLike()}
          title="Amei"
          onClick={() => this.addLike()}
        >
          {this.getLikes()}
          <i className="fa fa-heart" style={{ WebkitTextStroke: " 1px red" }} />
        </button>
      </div>
    );
  };

  addLike = () => {
    if (this.props.item.isLoggedIn) {
      let likes = this.state.likes;
      for (let i = 0; i < likes.length; i++) {
        if (this.props.id === this.state.likes[i].id && this.state.count > -1) {
          this.setState({
            likes: this.state.likes.filter(item => item.id !== this.props.id)
          });
          this.props.postDislike(this.props, this.props.item.token);
          this.setState({ count: this.state.count - 1 });
          return;
        }
      }
      if (this.state.count < 1) {
        this.setState(
          {
            likes: [...this.state.likes, { id: this.props.id, liked: true }]
          },
          () => this.classLike("animate-opacity btn margin text-red", true)
        );
        this.props.postLike(this.props, this.props.item.token);
        this.setState({ count: this.state.count + 1 });
      }
    } else {
      alert("Faça Login para curtir!");
    }
  };

  classLike = (classe = "animate-opacity btn margin ", ignore = false) => {
    if (ignore) {
      return classe;
    }
    if (this.state.likes) {
      let likes = this.state.likes;
      for (let i = 0; i < likes.length; i++) {
        if (this.props.id === this.state.likes[i].id) {
          return classe + "text-red";
        }
      }
    }
    return classe + "text-white-hover-red";
  };

  getLikes = () => {
    if (this.props.likes + this.state.count > 0) {
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
          {this.props.likes + this.state.count}
        </span>
      );
    }
  };

  tempo = () => {
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
  };

  displayText = () => {
    if (this.props.tempo && this.props.porcoes) {
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
    } else if (this.props.porcoes) {
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
    } else {
      return null;
    }
  };
}

RecommendFrame.propTypes = {
  getLike: PropTypes.func.isRequired,
  postDislike: PropTypes.func.isRequired,
  postLike: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  likes_user: state.item.likes,
  item: state.item
});

export default connect(
  mapStateToProps,
  { getLike, postLike, openModal, postDislike }
)(RecommendFrame);
