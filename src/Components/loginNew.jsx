import React, { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { refreshTokenSetup } from "../Utility/refreshTokens";
import DashboardNew from "./dashboardNew";
const CLIENT_ID =
	"110853295632-d5tutra5bb09d26h13ok9jhr39b5s8s4.apps.googleusercontent.com";
const LoginNew = () => {
	const [user, setUser] = useState();
	const onSuccess = (res) => {
		console.log("[login success] current user: ", res.profileObj);
		console.log("complete information: ", res.accessToken);
		refreshTokenSetup(res);
		setUser(res.accessToken);
	};
	const onLogout = () => {
		console.log("Logout made successfully");
		setUser(null);
	};
	function handleLoginFailure(response) {
		alert("Failed to log in");
	}
	function handleLogoutFailure(response) {
		alert("Failed to log out");
	}
	return (
		<div style={{ backgroundColor: "#FAF9F9" }}>
			<nav className="navbar navbar-expand navbar-light">
				<div style={{ float: "left" }} className="">
					{user ? (
						<GoogleLogout
							clientId={CLIENT_ID}
							buttonText="Logout"
							onLogoutSuccess={onLogout}
							onFailure={handleLogoutFailure}
						></GoogleLogout>
					) : (
						<GoogleLogin
							clientId={CLIENT_ID}
							buttonText="Login"
							onSuccess={onSuccess}
							onFailure={handleLoginFailure}
							cookiePolicy={"single_host_origin"}
							responseType="code,token"
							scope={
								"https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read"
							}
						/>
					)}
				</div>

				<div className="navbar-brand mx-auto">
					<p style={{ textDecorationColor: "black" }}>
						ABMIENT<b>CARE</b>
					</p>
				</div>
				<div style={{ float: "right" }}>
					<i
						className="fa fa-bell fa-lg"
						aria-hidden="true"
						style={{ color: "black" }}
					></i>
				</div>
			</nav>
			<div>
				<DashboardNew accessToken={user}></DashboardNew>
			</div>
		</div>
	);
};
export default LoginNew;
