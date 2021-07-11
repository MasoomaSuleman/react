import axios from "axios";
import moment from "moment";
const { setReloadCookie, hasReloadCookie } = require("./CookieManager.js");

export const check = async (accessToken) => {
	let stepArray = [];
	//JSONObject   = new JSONObject("{\"a\":\"1\",\"b\":null,\"d\":1}");
	var stepPoints = [];
	/*for (var i = 0; i < 9; i++) {
		stepPoints.push({
			date: 1234,
			step: 0,
		});
	}*/
	//console.log(stepPoints[0].date);
	//console.log(typeof stepPoints[0]);
	console.log("check is reached");
	var start = new Date();
	start.setHours(0, 0, 0, 0);
	start.setDate(start.getDate() - 8);
	console.log("startDate:", moment(start).format("DD-MM-YYYY"));
	var end = new Date();
	end.setHours(23, 59, 59, 999);
	end.setDate(end.getDate());
	console.log("endDate:", moment(end).format("DD-MM-YYYY"));
	var startDate = start;
	if (accessToken) {
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
			stepArray = res.data.bucket;
			let i = 0;
			for (const dataSet of stepArray) {
				//console.log(dataSet)
				for (const points of dataSet.dataset) {
					//console.log(points)
					for (const steps of points.point) {
						console.log(steps.value);
						stepPoints.push({
							date: moment(startDate).format("DD-MM-YYYY"),
							step: steps.value,
						});
						//stepPoints[i].date = moment(startDate).format("DD-MM-YYYY");
						//stepPoints[i]["step"] = steps.value;
						i = i + 1;
						startDate.setDate(startDate.getDate() + 1);
						//console.log("reached here", stepPoints);
					}
				}
			}

			//console.log("Step Points", stepPoints);
		});
		/*Promise.all(stepPoints).then((res) => {
			console.log(stepPoints);
			return stepPoints;
		});*/
		console.log(stepPoints);
		console.log("length:", stepPoints.length);
		for (var i = 0; i < 9; i++) {
			console.log(stepPoints[i]);
		}
		return stepPoints;

		//setWeekData(stepPoints);
	}

	/*console.log("result", result);
			stepArray = result.data.bucket;
			try {
				let i = 0;
				for (const dataSet of stepArray) {
					//console.log(dataSet)
					for (const points of dataSet.dataset) {
						//console.log(points)
						for (const steps of points.point) {
							console.log(steps.value);
							stepPoints[i] = steps.value;
							i = i + 1;
						}
					}
				}
			} catch (e) {
				console.log(e);
			}
			
			console.log("Step Points", stepPoints);*/

	//setReloadCookie();
};
const dataValues = [
	{
		title: "Steps",
		type: "com.google.step_count.delta",
	},
];
export const getRequestHeaders = (accessToken) => {
	const requestHeaderBody = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			Accept: "application/json",
		},
	};
	return requestHeaderBody;
};

export const getAggregatedDataBody = (dataType, endTime) => {
	var start = new Date();
	start.setHours(0, 0, 0, 0);
	start.setDate(start.getDate() - 7);

	var end = new Date();
	end.setHours(23, 59, 59, 999);
	end.setDate(end.getDate());
	const requestBody = {
		aggregateBy: [
			{
				dataTypeName: dataType,
			},
		],
		bucketByTime: {
			durationMillis: 86400000,
		},
		endTimeMillis: end.getTime(),
		startTimeMillis: start.getTime(),
	};
	return requestBody;
};

export const getAggregateData = async (body, headers) => {
	const req = await axios.post(
		"https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
		body,
		headers
	);
	return req;
};

// we need to return [{Today}, {Yesterday} .... {7 days back}]
// Each object has : {"Calories" : value, "Heart": value ... , "Date": }
const baseObj = {
	Steps: 0,
};

export const getWeeklyData = async (
	endTime,
	requestParameters,
	callBack,
	initialState
) => {
	let state = [];
	let promises = [];
	const hasCookie = hasReloadCookie();
	if (!hasCookie.present || initialState.length === 0) {
		console.log("reached");
		for (var i = 6; i >= 0; i--) {
			var currTime = new Date(endTime - i * 86400000);
			state.push({
				...baseObj,
				Date: currTime,
			});
		}
		dataValues.forEach((element) => {
			let body = getAggregatedDataBody(element.type, endTime);
			promises.push(
				axios
					.post(
						"https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
						body,
						requestParameters
					)
					.then((resp) => {
						// now, each data bucket represents exactly one day
						for (let idx = 0; idx < 7; idx++) {
							resp.data.bucket[idx].dataset[0].point.forEach((point) => {
								point.value.forEach((val) => {
									let extract = val["intVal"] || Math.ceil(val["fpVal"]) || 0;
									console.log(extract);
									state[idx]["Steps"] += extract;
								});
							});
						}
					})
			);
		});
		console.log(state);
		//Promise.all(promises).then(() => {
		callBack(state);
		//});
		setReloadCookie();
	}
};
