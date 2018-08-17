import React, { Component } from "react";
import RecommendFrame from "./recommendFrame";

class OtherContent extends React.Component {
	state = {
		frames: [
			{ id: 0, size: 75 },
			{ id: 1, size: 75 },
			{ id: 2, size: 75 },
			{ id: 3, size: 75 },
			{ id: 4, size: 75 },
			{ id: 5, size: 75 },
			{ id: 6, size: 75 },
			{ id: 7, size: 75 }
		]
	};
	render() {
		return (
			<div>
				<h2 className="mt-4">Destaques deste mês...</h2>
				<hr />
				<div style={{ margin: "0 5% 0 5%" }}>
					<div className="row mt-4">
						{this.state.frames.map(frame => (
							<div key={frame.id} className="col-md-3">
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

export default OtherContent;
