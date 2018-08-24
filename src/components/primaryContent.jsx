import React, { Component } from "react";
import logo from "../imagens/logo.png";
import RecommendFrame from "./recommendFrame";

class PrimaryContent extends React.Component {
	state = {
		frames: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
	};
	render() {
		return (
			<div>
				<h2 className="mb-0">Recomendações...</h2>
				<hr />
				<div style={{ margin: "0 5% 0 5%" }}>
					<div className="row mt-4">
						{this.state.frames.map(frame => (
							<div key={frame.id} className="col-lg-6 col-sm-12">
								<RecommendFrame key={frame.id} frame={frame} />
							</div>
						))}
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

export default PrimaryContent;
