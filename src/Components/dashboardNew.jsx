import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import Calendar from "./calendar";
const { check } = require("../Utility/DataRequestManager");
const DashboardNew = (props) => {
	const [accessToken, setAccessToken] = useState(props.accessToken);
	const [stepData, setStepData] = useState([]);
	useEffect(() => {
		console.log("useEffect is called");
		setAccessToken(props.accessToken);
		getStepPoints(props.accessToken);
	}, [props]);
	const getStepPoints = (accessToken) => {
		if (accessToken) {
			var start = new Date();
			start.setHours(0, 0, 0, 0);
			start.setDate(start.getDate() - 9);
			console.log("startDate:", moment(start).format("DD-MM-YYYY"));
			var end = new Date();
			end.setHours(23, 59, 59, 999);
			end.setDate(end.getDate());
			console.log("endDate:", moment(end).format("DD-MM-YYYY"));
			var startDate = start;
			var stepDataVar = [];
			/*for (var i = 0; i < 10; i++) {
				stepData.push({
					step: 0,
					date: moment(startDate).format("DD-MM-YYYY"),
				});
				startDate.setDate(startDate.getDate() + 1);
			}*/

			axios({
				method: "POST",
				headers: {
					authorization: "Bearer " + accessToken,
				},
				"Content-Type": "application/json",
				url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
				data: {
					aggregateBy: [
						{
							dataTypeName: "com.google.step_count.delta",
							dataSourceId:
								"derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
						},
					],
					bucketByTime: { durationMillis: 86400000 },
					startTimeMillis: start.getTime(),
					endTimeMillis: end.getTime(),
				},
			}).then((res) => {
				//console.log(res);
				//	console.log("result", res);
				const stepArray = res.data.bucket;
				let i = 0;
				for (const dataSet of stepArray) {
					//console.log(dataSet)
					for (const points of dataSet.dataset) {
						//console.log(points)
						for (const steps of points.point) {
							console.log(steps.value[0]["intVal"]);
							stepDataVar.push({
								step: steps.value[0]["intVal"],
								date: moment(startDate).format("DD-MM-YYYY"),
							});
							startDate.setDate(startDate.getDate() + 1);
						}
					}
				}
				console.log("final stepData date:", stepDataVar[0].date);
				console.log("final stepData step:", stepDataVar[0].step);
				setStepData(stepDataVar);
			});
		}
	};
	return (
		<div style={{ backgroundColor: "#FAF9F9", height: "100%" }}>
			{/*Dashboard rendered {accessToken}*/}
			{/*stepData.map((step) => (
				<div key={step.step}>
					{step.date} <br></br>
					{step.step}
				</div>
			))*/}
			<div>
				{accessToken ? (
					<Calendar stepData={stepData} />
				) : (
					<div
						style={{
							backgroundColor: "#FAF9F9",
							height: 500,
						}}
					>
						<center>Please log in to see your progress!</center>
					</div>
				)}
			</div>
		</div>
	);
};
export default DashboardNew;
