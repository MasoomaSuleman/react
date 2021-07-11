import React, { useState, useEffect } from 'react';
import CalendarView from './calendarView';
import Calendar from './calendar';
import Calendardemo from './calendardemo';
const { hasCookie } = require('../Utility/CookieManager');
const { check } = require('../Utility/DataRequestManager');


const Dashboard = (props) => {
  
  // fetch weekly data
  const accessToken = props.user.accessToken;
  const [weekData, setWeekData] = useState([]);
  //const [accessToken, setAccessToken] = useState(props.user.accessToken);
  
    const mark = [];
  const callBack = (stepPoints) => {
    console.log("calling state:", stepPoints);
    setWeekData(stepPoints);
  
  }
  let checking = hasCookie();
  useEffect(() => {
  //  setAccessToken(props.user.accessToken)
    console.log("checking access token:", accessToken);
    console.log("checking cookie:", checking.name);
    if(accessToken)
      check(accessToken, setWeekData).then((res) => {
        console.log("response:");
        console.log(res[0]);
        setWeekData(res);
    })
  }, [accessToken]);
  
  //console.log("weekdata:", weekData);
  
  return (
    <div>
      {
        accessToken? <Calendar stepPoints={weekData} accessToken={accessToken}></Calendar>: <div>  no data</div>
       }
      
      { /* <CalendarView stepPoints={weekData} accessToken={accessToken} />*/}
    </div>
    );
}

export default Dashboard;