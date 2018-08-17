import React, { Component } from "react";
import logo from "../imagens/logo.png";
import search_icon from "../imagens/search-icon.png";

class NavBar extends React.Component {
	render() {
		const font = {
			fontWeight: 550
		};
		return (
			<nav className="navbar gradient-y-r">
				<img className="logo" src={logo} href="#" alt="logo" />
				<div className="nav-inline">
					<input
						type="search"
						className="mr-2"
						style={{ borderRadius: 100, paddingLeft: 20, height: 30 }}
						placeholder="Pesquisar..."
						href="#!"
					/>
					<a href="#!">
						<img
							className="mr-3"
							style={{ width: 35, height: 35, cursor: "pointer" }}
							src={search_icon}
						/>
					</a>
					<a href="#!">
						<span className="p-3 ml-3" style={font}>
							Entradas
						</span>
					</a>
					<a href="#!">
						<span className="p-3" style={font}>
							Prato Principal
						</span>
					</a>
					<a href="#!">
						<span className="p-3" style={font}>
							Sobremesas
						</span>
					</a>
					<a className="mr-2" href="#!">
						<span className="p-3" style={font}>
							Drinks
						</span>
					</a>
					<span className="vr" />
					<a href="#!">
						<span className="ml-4 m-2" style={font}>
							Entrar
						</span>
					</a>
				</div>
			</nav>
		);
	}
}

export default NavBar;
