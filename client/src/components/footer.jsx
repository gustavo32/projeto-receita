import React from "react";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="copyright-text">
                <p>
                  <span className="hide-mobile">© 2018 CopyRight: </span>
                  <Link to="/" style={{ fontWeight: "bold" }}>
                    AcaFood
                  </Link>
                </p>
              </div>
            </div>
            <div className="col-6">
              <ul className="social-link pull-right">
                <li>
                  <a href="!#">
                    <span className="fa fa-facebook fa-lg" />
                  </a>
                </li>
                <li>
                  <a href="!#">
                    <span className="fa fa-twitter fa-lg" />
                  </a>
                </li>
                <li>
                  <a href="!#">
                    <span className="fa fa-instagram fa-lg" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
