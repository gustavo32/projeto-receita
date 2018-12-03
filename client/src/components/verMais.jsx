import React, { Component } from "react";
import NavBar from "./navbar";
import Footer from "./footer";

import RecommendFrame from "./recommendFrame";

import { connect } from "react-redux";
import { getMoreReceitas, removeMoreReceitas } from "../actions/itemActions";
import PropTypes from "prop-types";
import Modal from "./modal";
import logo from "../imagens/imageBlur.jpeg";

var counter = 16;

class VerMais extends Component {
  state = {
    loading: true,
    currentIngred: this.props.match.params.ingred
  };
  componentDidMount() {
    this.props.getMoreReceitas(
      this.props.match.params.option,
      0,
      this.state.currentIngred
    );
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillReceiveProps(atualProps) {
    if (atualProps.item.loading !== this.state.loading) {
      this.setState({ loading: atualProps.item.loading });
    }
    if (atualProps.match.params.ingred !== this.props.match.params.ingred) {
      const currentIngred = atualProps.match.params.ingred;
      this.props.removeMoreReceitas();
      this.setState(
        {
          currentIngred: currentIngred
        },
        () => {
          this.props.getMoreReceitas(
            this.props.match.params.option,
            0,
            currentIngred
          );
          counter = 16;
        }
      );
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
    this.props.removeMoreReceitas();
    counter = 16;
  }

  onScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      this.props.item.moreReceitas.length &&
      !this.props.item.loading &&
      counter < 160
    ) {
      this.props.getMoreReceitas(
        this.props.match.params.option,
        counter,
        this.state.currentIngred
      );
      counter += 16;
    }
  };

  render() {
    const { moreReceitas } = this.props.item;
    return (
      <div>
        <NavBar />
        <div className="row">
          <div className="col-sm-12 col-md-12" style={{ marginBottom: "1%" }}>
            <h2 className="mb-0" style={{ marginTop: "3%" }}>
              {this.title()}
            </h2>
            <div className="hr-effect" />

            <div style={{ margin: "0 5% 0 5%" }}>
              <div className="row mt-4">
                {moreReceitas.map(
                  ({
                    _id,
                    porcoes,
                    tempo_de_preparo,
                    titulo,
                    image_urls,
                    likes_total,
                    autor,
                    ingredientes,
                    modo_de_preparo
                  }) => {
                    let imagem = image_urls;
                    if (image_urls.length < 1) {
                      imagem = logo;
                    }
                    return (
                      <div key={_id} className="col-lg-3 col-sm-6">
                        <RecommendFrame
                          key={_id}
                          id={_id}
                          porcoes={porcoes}
                          tempo={tempo_de_preparo}
                          titulo={titulo}
                          img={imagem}
                          likes={likes_total}
                          autor={autor}
                          ingredientes={ingredientes}
                          preparo={modo_de_preparo}
                        />
                      </div>
                    );
                  }
                )}
              </div>
              {this.loading()}
            </div>
          </div>
        </div>
        <Footer />
        <Modal />
      </div>
    );
  }
  loading = () => {
    if (this.state.loading) {
      return (
        <div className="centralize">
          <div className="progress container">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      );
    }
  };
  title = () => {
    if (this.props.match.params.option === "primary")
      return "Receitas recomendadas para você!";
    else if (this.props.match.params.option === "exclusive_search")
      return "Olha o que você pode fazer!";
    else if (this.props.match.params.option === "descritive_search")
      return "Olha o que achamos para você!";
  };
}

VerMais.propTypes = {
  getMoreReceitas: PropTypes.func.isRequired,
  removeMoreReceitas: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getMoreReceitas, removeMoreReceitas }
)(VerMais);
