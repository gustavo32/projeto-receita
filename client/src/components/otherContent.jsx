import React, { Component } from "react";
import RecommendFrame from "./recommendFrame";

import { connect } from "react-redux";
import { getItems } from "../actions/itemActions";
import PropTypes from "prop-types";

class OtherContent extends React.Component {
	componentDidMount() {
		this.props.getItems();
	}
	render() {
		const { receitasOther } = this.props.item;
		return (
			<div>
				<div style={{ margin: "0 5% 0 5%" }}>
					<div className="row mt-4">
						{receitasOther.map(
							({ id, porcoes, tempo_preparo, titulo, img_src, nome_autor }) => (
								<div key={id} className="col-lg-3 col-md-6 col-sm-12">
									<RecommendFrame
										key={id}
										porcoes={porcoes}
										tempo={tempo_preparo}
										titulo={titulo}
										img={img_src}
										autor={nome_autor}
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
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item
});

export default connect(
	mapStateToProps,
	{ getItems }
)(OtherContent);
