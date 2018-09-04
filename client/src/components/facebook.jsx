import React from "react";
import FacebookLogin from "react-facebook-login";

class Facebook extends React.Component {
	state = {
		isLoggedIn: false,
		userID: "",
		name: "",
		email: "",
		picture: ""
	};

	responseFacebook = response => {
		console.log(response);
	};

	render() {
		let fbContent;

		if (this.state.isLoggedIn) {
			fbContent = null;
		} else {
			fbContent = (
				<FacebookLogin
					appId="274339896535880"
					autoLoad={true}
					fields="name,email,picture"
					onClick={this.componentClicked}
					callback={this.responseFacebook}
					size="small"
					language="pt_BR"
					textButton="Entrar com o Facebook"
					cssClass="facebook"
				/>
			);
		}
		return <div>{fbContent}</div>;
	}
}

export default Facebook;
