import React, { Component } from "react";
import NavBar from "./components/navbar.jsx";
import PrimaryContent from "./components/primaryContent";
import List from "./components/list.jsx";
import OtherContent from "./components/otherContent";
import Footer from "./components/footer";

class App extends Component {
	render() {
		return (
			<div>
				<NavBar />
				<div className="row">
					<div className="col-md-6 col-sm-12">
						<h3 className="mb-0">O exclusivo sistema de busca para você!</h3>
						<hr />
						<List />
					</div>
					<div className="col-md-6 col-sm-12">
						<h2 className="mb-0">Recomendações...</h2>
						<hr />
						<PrimaryContent />
					</div>
					<div className="col-sm-12 col-md-12" style={{ marginBottom: "6%" }}>
						<h2 className="mb-0">Destaques deste mês...</h2>
						<hr />
						<OtherContent />
					</div>
				</div>

				<Footer />
			</div>
		);
	}
}

export default App;