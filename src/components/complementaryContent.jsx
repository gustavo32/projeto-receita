import React, { Component } from "react";
import note from "../imagens/note.png";

class ComplementaryContent extends React.Component {
	render() {
		return (
			<div>
				<h4>Teste nosso app!!!</h4>
				<span>Digite seus ingredientes:</span>
				<div style={{ position: "relative", display: "inline-block" }}>
					<img
						src={note}
						style={{
							height: "77.33vh",
							width: "64.00vh"
						}}
					/>
					asfasfas
				</div>
			</div>
		);
	}
}

export default ComplementaryContent;
