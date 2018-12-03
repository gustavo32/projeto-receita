import React from "react";
import RecommendFrame from "./recommendFrame";

import { connect } from "react-redux";
import { getItemsPrimary } from "../actions/itemActions";
import PropTypes from "prop-types";
import logo from "../imagens/imageBlur.jpeg";
import { Link } from "react-router-dom";

class PrimaryContent extends React.Component {
  componentDidMount() {
    this.props.getItemsPrimary();
  }

  render() {
    const { receitasPrimary } = this.props.item;
    return (
      <div>
        <div style={{ margin: "0 5% 0 5%" }}>
          <div className="row mt-4">
            {receitasPrimary.map(
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
                  <div key={_id} className="col-lg-6 col-sm-12">
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
          <div style={{ textAlign: "right" }}>
            <Link to="/verMais/primary/none">
              <button type="button" className="orange btn round mt-1">
                Veja mais
                <i className="fa fa-arrow-right pl-2" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

PrimaryContent.propTypes = {
  getItemsPrimary: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getItemsPrimary }
)(PrimaryContent);
