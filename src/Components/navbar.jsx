import { Navbar, Nav } from "react-bootstrap";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
class NavBar extends Component {
	state = {};
	render() {
		return (
			<nav
				className="navbar navbar-expand-md navbar-light"
				style={{ backgroundColor: "#FAF9F9" }}
			>
				<div className="mx-auto order-0">
					<a className="navbar-brand " href="/">
						<p style={{ textDecorationColor: "black" }}>
							ABMIENT<b>CARE</b>
						</p>
					</a>
				</div>
				<div className=""></div>
			</nav>
		);
	}
}

export default NavBar;
