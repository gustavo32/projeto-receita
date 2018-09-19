import React from "react";
import RecommendFrame from "./recommendFrame";

import { connect } from "react-redux";
import { getItemsOther } from "../actions/itemActions";
import PropTypes from "prop-types";

class OtherContent extends React.Component {
  componentDidMount() {
    this.props.getItemsOther();
  }
  render() {
    const { receitasOther } = this.props.item;
    return (
      <div>
        <div style={{ margin: "0 5% 0 5%" }}>
          <div className="row mt-4">
            {receitasOther.map(
              ({
                _id,
                porcoes,
                tempo_de_preparo,
                titulo,
                image_urls,
                likes_total,
                autor
              }) => (
                <div key={_id} className="col-lg-3 col-md-6 col-sm-12">
                  <RecommendFrame
                    key={_id}
                    porcoes={porcoes}
                    tempo={tempo_de_preparo}
                    titulo={titulo}
                    img={image_urls}
                    likes={likes_total}
                    autor={autor}
                  />
                </div>
              )
            )}
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

OtherContent.propTypes = {
  getItemsOther: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getItemsOther }
)(OtherContent);
