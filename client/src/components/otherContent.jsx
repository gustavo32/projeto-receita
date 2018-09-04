import React, { Component } from "react";
import RecommendFrame from "./recommendFrame";

class OtherContent extends React.Component {
	state = {
		frames: [
			{ id: 0 },
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
			{ id: 4 },
			{ id: 5 },
			{ id: 6 },
			{ id: 7 }
		]
	};
	render() {
		return (
			<div>
				<div style={{ margin: "0 5% 0 5%" }}>
					<div className="row mt-4">
						{this.state.frames.map(frame => (
							<div key={frame.id} className="col-lg-3 col-md-6 col-sm-12">
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

export default OtherContent;
