import React from 'react'
import { Goal } from './Goal'

export const Goals = (props) => {

  let myStyle = {
    minHeight: "70vh",
    margin: "40px auto"
  }
  return (
    <div className="container" style={myStyle}>
        <h3 style={{margin: "auto", width: '28%',marginBottom: "20px"}}>Professional Goals List</h3>
        { props.goals.map((goal)=>{
            return (
              <Goal goal={goal} key={goal.id} myGoalIds={props.myGoalIds} onDelete={props.onDelete} onAddGoalClick={props.onAddGoalClick}/>   
            )
        })
        } 
    </div>
  )
}
