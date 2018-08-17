import React, { Component } from "react";
import logo from "../imagens/logo.png";

class RecommendFrame extends React.Component {
	render() {
		const styles = { fontSize: this.props.fontSize + "%" };
		return (
			<div className="mb-4">
				<div style={{ backgroundColor: "white", borderRadius: "4px" }}>
					<div
						className="display-container opacity-min hover-opacity-off"
						style={{ transition: "0.5s", width: "100%" }}
					>
						<img
							src={logo}
							alt="receita"
							style={{ width: "100%", borderRadius: "4px 4px 0 0" }}
						/>
						<div
							className="display-topright display-hover large off"
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
							className="display-middle display-hover large off"
							style={{ top: "42%" }}
						>
							<div className="text-center animate-opacity" style={styles}>
								<i className="fa fa-clock-o">
									<span style={{ paddingLeft: 8 }}>10 minutos</span>
								</i>
							</div>
						</div>
						<div
							className="display-middle display-hover large off"
							style={{ top: "58%" }}
						>
							<div className="text-center animate-opacity" style={styles}>
								<i className="fa fa-users">
									<span style={{ paddingLeft: 10 }}>5 porções</span>
								</i>
							</div>
						</div>
						<div className="display-topright display-hover large off">
							<button
								type="button"
								className="animate-opacity btn margin round"
								title="Amei"
							>
								<i className="fa fa-heart text-red" />
							</button>
						</div>
						<div className="display-bottomleft display-hover large text-white off">
							<div className="padding animate-opacity" style={styles}>
								Nome do Autor
							</div>
						</div>
					</div>
					<div className="text-title">
						<span style={styles}>Tutu de Feijão</span>
					</div>
				</div>
			</div>
		);
	}
}

export default RecommendFrame;
