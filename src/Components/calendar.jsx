import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
const { datesGenerator } = require("dates-generator");

const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Container = styled.div`
	width: 400px;
	border: 2px solid white;
	margin: 0 auto;
	border-radius: 25px;
	border-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	background-color: white;
`;

const MonthText = styled.div`
	font-size: 20px;
	font-weight: bold;
	text-align: left;
	padding-left: 10px;
`;

const Card = styled.div`
	box-sizing: border-box;
	width: 400px;
	margin: 0 auto;
	border-radius: 25px;
	border-radius: 25px;
	color: white;
	float: center
	box-shadow: 5px 5px 10px #ccc;
	background: linear-gradient(150deg, #f731db, #4600f1 100%);
`;

const Calendar = (props) => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [dates, setDates] = useState([]);
	const [stepData, setStepData] = useState(props.stepData);
	const [userDetails, setUserDetails] = useState(props.userDetails);
	const [calendar, setCalendar] = useState({
		month: selectedDate.getMonth(),
		year: selectedDate.getFullYear(),
	});

	useEffect(() => {
		const body = {
			month: calendar.month,
			year: calendar.year,
		};
		const { dates, nextMonth, nextYear, previousMonth, previousYear } =
			datesGenerator(body);

		setDates([...dates]);
		setCalendar({
			...calendar,
			nextMonth,
			nextYear,
			previousMonth,
			previousYear,
		});
		setStepData(props.stepData);
		setUserDetails(props.userDetails);
	}, [props]);

	const onClickNext = () => {
		const body = { month: calendar.nextMonth, year: calendar.nextYear };
		const { dates, nextMonth, nextYear, previousMonth, previousYear } =
			datesGenerator(body);

		setDates([...dates]);
		setCalendar({
			...calendar,
			month: calendar.nextMonth,
			year: calendar.nextYear,
			nextMonth,
			nextYear,
			previousMonth,
			previousYear,
		});
	};

	const onClickPrevious = () => {
		const body = { month: calendar.previousMonth, year: calendar.previousYear };
		const { dates, nextMonth, nextYear, previousMonth, previousYear } =
			datesGenerator(body);

		setDates([...dates]);
		setCalendar({
			...calendar,
			month: calendar.previousMonth,
			year: calendar.previousYear,
			nextMonth,
			nextYear,
			previousMonth,
			previousYear,
		});
	};

	const onSelectDate = (date) => {
		setSelectedDate(new Date(date.year, date.month, date.date));
	};

	return (
		<div style={{ width: "100%", paddingTop: 50 }}>
			<div>
				<Card>
					<div style={{ padding: 10 }}>
						<p style={{ fontSize: 17 }}>Welcome {userDetails.name},</p>
						<p>You can view your checkins and manage your preferences.</p>
						<p style={{ fontWeight: "lighter" }}>
							We will notify you when something changes with your health.
						</p>
					</div>
				</Card>
			</div>
			<br></br>
			<div
				style={{
					paddingTop: 10,
					paddingBottom: 10,
					paddingLeft: 40,
					fontSize: 18,
					color: "black",
				}}
			>
				Last Check in
			</div>
			<Container>
				<div style={{ padding: 10 }}>
					<div onClick={onClickPrevious} style={{ float: "left" }}>
						<i
							className="fa fa-angle-left fa-lg"
							aria-hidden="true"
							style={{ color: "blue" }}
						></i>
					</div>
					<div onClick={onClickNext} style={{ float: "right" }}>
						<i
							className="fa fa-angle-right fa-lg"
							aria-hidden="true"
							style={{ color: "blue" }}
						></i>
					</div>
				</div>
				<br></br>
				<div>
					<MonthText>
						{months[calendar.month]} {calendar.year}
					</MonthText>
					<div style={{ float: "right" }}>
						<div>
							<i
								className="fa fa-check"
								aria-hidden="true"
								style={{ color: "green" }}
							></i>
							<span> Checked In</span>
							<br></br>
							<i
								className="fa fa-close"
								aria-hidden="true"
								style={{ color: "red" }}
							></i>
							<span> Missed</span>
						</div>
					</div>
				</div>
				<div>
					<div>
						<table style={{ width: "100%" }}>
							<tbody>
								<tr>
									{days.map((day) => (
										<td key={day} style={{ padding: "5px 0" }}>
											<div style={{ textAlign: "center", padding: "5px 0" }}>
												{day}
											</div>
										</td>
									))}
								</tr>

								{dates.length > 0 &&
									dates.map((week) => (
										<tr key={JSON.stringify(week[0])}>
											{week.map((each) => (
												<td
													key={JSON.stringify(each)}
													style={{ padding: "5px 0" }}
												>
													<div
														onClick={() => onSelectDate(each)}
														style={{ textAlign: "center", padding: "5px 0" }}
													>
														<div
															style={{
																color: stepData.find(
																	(step) =>
																		step.date ===
																		moment(each).format("DD-MM-YYYY")
																)
																	? stepData.find(
																			(step) =>
																				step.date ===
																					moment(each).format("DD-MM-YYYY") &&
																				step.step > 1000
																	  )
																		? "green"
																		: "red"
																	: "black",
															}}
														>
															{each.date}
															<br></br>
															{stepData.find(
																(step) =>
																	step.date ===
																	moment(each).format("DD-MM-YYYY")
															) ? (
																stepData.find(
																	(step) =>
																		step.date ===
																			moment(each).format("DD-MM-YYYY") &&
																		step.step > 1000
																) ? (
																	<i
																		className="fa fa-check"
																		aria-hidden="true"
																		style={{ color: "green" }}
																	></i>
																) : (
																	<i
																		className="fa fa-close"
																		aria-hidden="true"
																		style={{ color: "red" }}
																	></i>
																)
															) : (
																<i></i>
															)}
														</div>
													</div>
												</td>
											))}
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
				<div style={{ padding: 10 }}>
					{console.log("Selected Date:", selectedDate.toLocaleString())}
				</div>
			</Container>
			<div>{stepData.map((step) => console.log(step))}</div>
		</div>
	);
};

export default Calendar;
