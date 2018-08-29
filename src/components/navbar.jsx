import React, { Component } from "react";
import logo from "../imagens/logo.png";
import search_icon from "../imagens/search-icon.png";

class NavBar extends React.Component {
	render() {
		const font = {
			fontWeight: 550
		};
		return (
			<nav className="navbar navbar-expand-lg gradient-y-r">
				<div className="container-fluid">
					<img className="logo" src={logo} href="#" alt="logo" />
					<form action="/">
						<input
							type="search"
							className="hide-mobile"
							style={{
								borderRadius: 100,
								paddingLeft: 20,
								height: 30
							}}
							placeholder="Pesquisar..."
						/>

						<button
							type="submit"
							style={{ cursor: "pointer", background: "none" }}
						>
							<img src={search_icon} style={{ width: 35, height: 35 }} />
						</button>
					</form>

					<div>
						<a href="#!" className="hide-mobile">
							<span>Entradas</span>
						</a>
						<a href="#!" className="hide-mobile">
							<span>Prato Principal</span>
						</a>
						<a href="#!" className="hide-mobile">
							<span>Sobremesas</span>
						</a>
						<a href="#!" className="hide-mobile">
							<span style={{ paddingRight: 0 }}>Drinks</span>
						</a>
						<span className="vr hide-mobile" />

						<a className="dropdown" href="#!">
							<span style={{ paddingRight: 0 }}>
								Entrar
								<ul className="dropdown-content">
									<li>
										<span>Login</span>
										<input type="text" />
									</li>
									<li>
										<span>Senha</span>
										<input type="password" />
									</li>
									<hr />
								</ul>
							</span>
						</a>
					</div>
				</div>
			</nav>
		);
	}
}

export default NavBar;
