import React from "react";
import RecommendFrame from "./recommendFrame";

import { connect } from "react-redux";
import { getItemsPrimary } from "../actions/itemActions";
import PropTypes from "prop-types";

class PrimaryContent extends React.Component {
  componentDidMount() {
    this.props.getItemsPrimary();
  }

  render() {
    const { receitas } = this.props.item;
    return (
      <div>
        <div style={{ margin: "0 5% 0 5%" }}>
          <div className="row mt-4">
            {receitas.map(item => {
              if (item.tipo === "primary") {
                return item.receita.map(
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
                    return (
                      <div key={_id} className="col-lg-6 col-sm-12">
                        <RecommendFrame
                          key={_id}
                          id={_id}
                          porcoes={porcoes}
                          tempo={tempo_de_preparo}
                          titulo={titulo}
                          img={image_urls}
                          likes={likes_total}
                          autor={autor}
                          ingredientes={ingredientes}
                          preparo={modo_de_preparo}
                        />
                      </div>
                    );
                  }
                );
              } else {
                return null;
              }
            })}
          </div>
          <div style={{ textAlign: "right" }}>
            <button type="button" className="orange btn round mt-1">
              Veja mais
              <i className="fa fa-arrow-right pl-2" />
            </button>
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
