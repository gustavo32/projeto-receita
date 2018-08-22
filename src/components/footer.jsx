import React from "react";

class Footer extends React.Component {
	render() {
		return (
			<div style={{ backgroundColor: "#222", height: 100 }}>
				<div className="container-fluid">
					<div className="row">
						<div
							className="text-white large m-2 col-sm-2"
							style={{
								align: "center",
								fontWeight: "bold"
							}}
						>
							<span style={{ marginTop: "50%" }}>CHEF YOURSELF</span>
						</div>
						<div
							className="text-white large col-sm-2"
							style={{ position: "relative", top: "50%", bottom: "50%" }}
						>
							APOIO
							<hr style={{ margin: "2px solid", color: "white" }} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;
