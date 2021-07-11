import React, { Component, useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { useCallback } from 'react';
const CalendarView = (props)=>{
    const {stepPoints,accessToken}  = props;
    //const accessToken = props.accessToken;
    //const [stepPoints, setStepPoints] = useState([]);
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        setCounter(1);
        console.log("checking props:", props);
        
        calendar();
        setCounter(0);
     //   setStepPoints(props.stepPoints);
    },);
    const masooma = useCallback(({ date }) => {
      //  console.log(stepPoints);
    return (stepPoints.find(x => x['date'] === moment(date).format("DD-MM-YYYY"))) ?(stepPoints.find(x => x['date'] === moment(date).format("DD-MM-YYYY") && x['step'][0]['intVal'] > 1000)) ?'highlightright' : 'highlightwrong' : 'highlightnormal';
  }, [1===1]);
    const calendar = () => {
        return (

            (counter == 0 && <Calendar
                onChange={setCounter}
                tileClassName = {masooma}
           /* tileClassName={({ date, view }) => {
                console.log("reachedmasooma reload", stepPoints);
                if (stepPoints.find(x => x['date'] === moment(date).format("DD-MM-YYYY"))) {
                    console.log("reachedjayit")
                    if (stepPoints.find(x => x['date'] === moment(date).format("DD-MM-YYYY") && x['step'][0]['intVal'] > 1000)) {
                        console.log("reachedright")
                        return 'highlightright';
                    }
                    return 'highlightwrong'
                }
                return 'highlightnormal'
                            
            }}*/
        ></Calendar >)
        );
    }
    
       // console.log("consoled props to be noted:", stepPoints)
        if (accessToken) {
            return (
            
                <div className="m-2">
                    <center>
                        {calendar()}
                        {/* <Calendar
                            tileClassName={({ date, view }) =>  {
                                if (stepPoints.find(x => x['date'] === moment(date).format("DD-MM-YYYY"))) {
                                    if (stepPoints.find(x => x['date'] === moment(date).format("DD-MM-YYYY") && x['step'][0]['intVal'] > 1000)) {
                                        console.log("reachedright")
                                        return 'highlightright';
                                    }
                                    return 'highlightwrong'
                                }
                                return 'highlightnormal'
                                
                            }}
                        ></Calendar> */}
                    </center>
     
                
                </div>
            
            );
        }
        return (
            <div>
                <center>
                    no data! please log in again 
                </center>
            
        </div>)

    
        


        
}

 
export default CalendarView;