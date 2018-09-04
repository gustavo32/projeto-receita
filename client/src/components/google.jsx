import React from "react";
import GoogleLogin from "react-google-login";

class Google extends React.Component {
	state = {
		clientId: "",
		isSignedIn: false
	};

	responseGoogle = response => {
		console.log(response.id_token);
	};

	render() {
		let googleContent;

		if (this.state.isSignedIn) {
			googleContent = null;
		} else {
			googleContent = (
				<GoogleLogin
					clientId="485749394706-7uhpujpqpqgcggdpqfqijj01l45vcdn1.apps.googleusercontent.com"
					buttonText="Entrar com o Google"
					onSuccess={this.responseGoogle}
					onFailure={this.responseGoogle}
					className="google"
				/>
			);
		}
		return <div>{googleContent}</div>;
	}
}

export default Google;
