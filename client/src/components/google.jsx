import React from "react";
import GoogleLogin from "react-google-login";

class Google extends React.Component {
  state = {
    clientId: "",
    isSignedIn: false
  };

  responseGoogle = response => {
    console.log(response);
  };

  render() {
    let googleContent;

    if (this.state.isSignedIn) {
      googleContent = null;
    } else {
      googleContent = (
        <GoogleLogin
          clientId="808126629139-s838r0t5760cdeadi6fcuo8m2lp40ra8.apps.googleusercontent.com"
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
