import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import moment from 'moment';
class Calendardemo extends Component {
  
        state = {
            stepPoints : this.props.stepPoints
        }
    
    render() {
        console.log(this.props);
        
        return (
             <div className="m-2">
                    <center>
                         <Calendar
                            tileClassName={({ date, view }) =>  {
                                if (this.state.stepPoints.find(x => x['date'] === moment(date).format("DD-MM-YYYY"))) {
                                    if (this.state.stepPoints.find(x => x['date'] === moment(date).format("DD-MM-YYYY") && x['step'][0]['intVal'] > 1000)) {
                                        console.log("reachedright")
                                        return 'highlightright';
                                    }
                                    return 'highlightwrong'
                                }
                                return 'highlightnormal'
                                
                            }}
                        ></Calendar>
                    </center>
     
                
                </div>
         );
    }
}
 
export default Calendardemo;