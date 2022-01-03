import React from 'react';
import { Goal } from './Goal'

export const MyGoals = (props) => {
  let myStyle = {
    minHeight: "70vh",
    margin: "40px auto"
  }
  return (
    <div className="container" style={myStyle}>
        <h3 style={{margin: "auto", width: '28%',marginBottom: "20px"}}>My Professional Goals List</h3>
        { 
          props.myGoals.map((goal)=>{
            return (
              <Goal goal={goal} key={goal.id} myGoalIds={props.myGoalIds} myGoal={true} removeFromMyGoals={props.removeFromMyGoals} setGoalPercentage={props.setGoalPercentage}/>   
            )
          })
        } 
    </div>
  )
}
