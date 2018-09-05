import React, { Component } from "react";
import NavBar from "./components/navbar.jsx";
import PrimaryContent from "./components/primaryContent";
import List from "./components/list.jsx";
import OtherContent from "./components/otherContent";
import Footer from "./components/footer";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<div>
					<NavBar />
					<div className="row">
						<div className="col-md-6 col-sm-12">
							<h3 className="mb-0">O exclusivo sistema de busca para você!</h3>
							<div className="hr-effect" />
							<List />
						</div>
						<div className="col-md-6 col-sm-12">
							<h2 className="mb-0">Recomendações...</h2>
							<div className="hr-effect" />
							<PrimaryContent />
						</div>
						<div className="col-sm-12 col-md-12" style={{ marginBottom: "6%" }}>
							<h2 className="mb-0">Destaques deste mês...</h2>
							<div className="hr-effect" />
							<OtherContent />
						</div>
					</div>

					<Footer />
				</div>
			</Provider>
		);
	}
}

export default App;
