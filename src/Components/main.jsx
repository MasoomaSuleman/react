import React, { Component } from "react";
import { Link } from "react-router-dom";
class Main extends Component {
	state = {
		imageUrlSmartPhone:
			"data:image/jpeg;base64,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",
		imageUrlWithingsScale:
			"data:image/jpeg;base64,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",
		imageUrlFitBit:
			"data:image/jpeg;base64,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",
		imageUrlAmazonEcho:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb4Xwgih3t3ybOpPz7jcu5w-ggaXlZYSPBNg&usqp=CAU",
		imageUrlSmartFridge:
			"data:image/jpeg;base64,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",
		buttonValue: "smartPhone",
		nextPage: "login.jsx",
	};
	styles = {
		fontSize: 18,
		fontWeight: "bold",
	};
	habdleRadioChange = (event) => {
		this.setState({
			buttonValue: event.target.value,
		});
	};

	render() {
		return (
			<div style={{ backgroundColor: "#FAF9F9" }}>
				<div style={{ marginTop: 20 }} className="align-self-center">
					<span style={this.styles} className="m-2">
						<b>Great! What type of device do you own?</b>
					</span>
					<br />
					<span style={{ fontSize: 18 }} className="row m-2">
						Choose as many as you like, you can always setup more later
					</span>
					<div className="container">
						<div className="row m-2">
							<div className="col-xs">
								<input
									type="radio"
									value="smartPhone"
									name="option"
									onChange={this.habdleRadioChange}
									checked={this.state.buttonValue === "smartPhone"}
								></input>
							</div>
							<div className="col">
								<img
									style={{ height: 100, width: 100 }}
									src={this.state.imageUrlSmartPhone}
									alt="image-smartphone"
								></img>
							</div>
							<div className="col">
								<span>Smart Phone</span>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="row m-2">
							<div className="col-xs">
								<input
									type="radio"
									value="withingsScale"
									name="option"
									onChange={this.habdleRadioChange}
									checked={false}
								></input>
							</div>
							<div className="col">
								<img
									style={{ height: 100, width: 100 }}
									src={this.state.imageUrlWithingsScale}
									alt="image-smartphone"
								></img>
							</div>
							<div className="col">
								<span>Withings Scale</span>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="row m-2">
							<div className="col-xs">
								<input
									type="radio"
									value="fitBit"
									name="option"
									onChange={this.habdleRadioChange}
									checked={false}
								></input>
							</div>
							<div className="col">
								<img
									style={{ height: 100, width: 100 }}
									src={this.state.imageUrlFitBit}
									alt="image-smartphone"
								></img>
							</div>
							<div className="col">
								<span>FitBit</span>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="row m-2">
							<div className="col-xs">
								<input
									type="radio"
									value="amazonEcho"
									name="option"
									onChange={this.habdleRadioChange}
									checked={false}
								></input>
							</div>
							<div className="col">
								<img
									style={{ height: 100, width: 100 }}
									src={this.state.imageUrlAmazonEcho}
									alt="image-smartphone"
								></img>
							</div>
							<div className="col">
								<span>Amazon Echo</span>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="row m-2">
							<div className="col-xs">
								<input
									type="radio"
									value="smartFridge"
									name="option"
									onChange={this.habdleRadioChange}
									checked={false}
								></input>
							</div>
							<div className="col">
								<img
									style={{ height: 100, width: 100 }}
									src={this.state.imageUrlSmartFridge}
									alt="image-smartphone"
								></img>
							</div>
							<div className="col">
								<span>Smart Fridge</span>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="row m-2">
							<Link
								to="/login"
								className="btn btn-block rounded"
								style={{
									backgroundColor: "white",
									color: "blue",
									borderColor: "blue",
								}}
							>
								<p style={{ color: "blue" }}>Continue</p>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Main;
