import React, { Component } from "react";
import logo from "../imagens/logo.png";

class RecommendFrame extends React.Component {
	render() {
		return (
			<div className="mb-4">
				<div style={{ backgroundColor: "white", borderRadius: "4px" }}>
					<div
						className="display-container opacity-min hover-opacity-off"
						style={{ transition: "0.5s", width: "100%" }}
					>
						<img
							src={this.props.img}
							alt="receita"
							style={{ width: "100%", borderRadius: "4px 4px 0 0" }}
						/>
						<div
							className="display-topright display-hover off"
							style={{ right: 65 }}
						>
							<button
								type="button"
								className="animate-opacity btn margin round"
								title="Compartilhar"
							>
								<i className="fa fa-share-alt text-blue" />
							</button>
						</div>
						<div
							className="display-middle display-hover off"
							style={{ top: "48%" }}
						>
							<div className="text-center animate-opacity">
								<i className="fa fa-clock-o">
									<span style={{ paddingLeft: 8 }}>
										{this.props.tempo} minutos
									</span>
								</i>
							</div>
						</div>
						<div
							className="display-middle display-hover off"
							style={{ top: "64%" }}
						>
							<div className="text-center animate-opacity">
								<i className="fa fa-users">
									<span style={{ paddingLeft: 10 }}>
										{this.props.porcoes} porções
									</span>
								</i>
							</div>
						</div>
						<div className="display-topright display-hover off">
							<button
								type="button"
								className="animate-opacity btn margin round"
								title="Amei"
							>
								<i className="fa fa-heart text-red" />
							</button>
						</div>
						<div className="display-bottomleft display-hover text-white off">
							<div className="padding animate-opacity">{this.props.autor}</div>
						</div>
					</div>
					<div className="text-title">
						<span>{this.props.titulo}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default RecommendFrame;
