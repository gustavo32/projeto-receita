import React, { Component } from "react";
import logo from "../imagens/logo.png";
import RecommendFrame from "./recommendFrame";

class PrimaryContent extends React.Component {
	state = {
		frames: [
			{ id: 0, size: 100 },
			{ id: 1, size: 100 },
			{ id: 2, size: 100 },
			{ id: 3, size: 100 }
		]
	};
	render() {
		return (
			<div>
				<h2 className="mb-0">Recomendações para você...</h2>
				<hr />
				<div style={{ margin: "0 5% 0 5%" }}>
					<div className="row mt-4">
						{this.state.frames.map(frame => (
							<div key={frame.id} className="col-md-6">
								<RecommendFrame
									key={frame.id}
									fontSize={frame.size}
									frame={frame}
								/>
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
