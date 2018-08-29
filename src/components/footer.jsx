import React from "react";

class Footer extends React.Component {
	render() {
		return (
			<div className="footer-bottom">
				<div className="container">
					<div className="row">
						<div className="col-sm-6 ">
							<div className="copyright-text">
								<p>
									© 2018 CopyRight:{" "}
									<span style={{ fontWeight: "bold" }}>Projeto Receita</span>
								</p>
							</div>
						</div>
						<div className="col-sm-6">
							<ul className="social-link pull-right">
								<li>
									<a href="">
										<span className="fa fa-facebook fa-lg" />
									</a>
								</li>
								<li>
									<a href="">
										<span className="fa fa-twitter fa-lg" />
									</a>
								</li>
								<li>
									<a href="">
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
