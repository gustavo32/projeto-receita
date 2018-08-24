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
					<div role="main" className="col-md-6 col-sm-12">
						<div className="m-4">
							<List />
						</div>
					</div>
					<aside className="col-md-6 col-sm-12">
						<PrimaryContent />
					</aside>
					<div className="col-sm-12 col-md-12" style={{ marginBottom: "6%" }}>
						<OtherContent />
					</div>
				</div>

				<Footer />
			</div>
		);
	}
}

export default App;
