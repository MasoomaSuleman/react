import "./App.css";
import Main from "./Components/main";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginNew from "./Components/loginNew";
import NavBar from "./Components/navbar";
import Dashboard from "./Components/dashboard";
function App() {
	return (
		<div style={{ backgroundColor: "#FAF9F9" }}>
			<Router>
				<Switch>
					<Route exact path="/">
						<NavBar />
						<Main />
					</Route>
					<Route path="/login">
						<LoginNew />
					</Route>
					<Route path="/dashboard">
						<Dashboard />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
