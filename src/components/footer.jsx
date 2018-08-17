import React from "react";

class Footer extends React.Component {
	render() {
		return (
			<div style={{ backgroundColor: "#222", height: 100 }}>
				<span
					className="text-white large m-4"
					style={{ position: "relative", top: "50%", bottom: "50%" }}
				>
					Chef Yourself
				</span>
			</div>
		);
	}
}

export default Footer;
