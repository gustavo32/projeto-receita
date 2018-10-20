import React from "react";
import FacebookLogin from "react-facebook-login";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setLoginFacebook } from "../actions/itemActions";

class Facebook extends React.Component {
  responseFacebook = response => {
    this.props.setLoginFacebook(response.name, response.email, response.id);
  };

  render() {
    let fbContent;
    if (this.props.item.isLoggedInFB) {
      fbContent = null;
    } else {
      fbContent = (
        <FacebookLogin
          appId="274339896535880"
          autoLoad={false}
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

Facebook.propTypes = {
  setLoginFacebook: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { setLoginFacebook }
)(Facebook);
