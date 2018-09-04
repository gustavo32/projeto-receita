import React from "react";
import Footer from "./footer";

class Cadastrar extends React.Component {
	render() {
		return (
			<div className="background-cadastro">
				<div className="cadastro">
					<div className="header-titulo">
						<div className="title-cadastro">Cadastro</div>
					</div>
					<div className="cadastro-content">
						<label>Nome</label>
						<input type="text" />
						<label>Email</label>
						<input type="email" autoComplete="on" />
						<label>Senha</label>
						<input type="password" placeholder="Pelo menos 6 caracteres" />
						<label>Confirmar senha</label>
						<input type="password" />
						<button
							className="signup-btn"
							style={{
								width: "40%",
								margin: "0 100px 0 100px",
								marginTop: "15px",
								fontWeight: "bold"
							}}
						>
							Cadastrar
						</button>
					</div>
				</div>

				<Footer />
			</div>
		);
	}
}

export default Cadastrar;
