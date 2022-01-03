import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Card, Button } from 'react-bootstrap';
import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle";
import { FaTrashAlt } from "@react-icons/all-files/fa/FaTrashAlt";
import { GiAchievement } from "@react-icons/all-files/gi/GiAchievement";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import Alert from 'react-bootstrap/Alert'
import swal from 'sweetalert';

export const Goal = ({goal, onDelete, onAddGoalClick, myGoalIds, myGoal, removeFromMyGoals, setGoalPercentage}) => {    
  let goalPercentage = goal.percentage? goal.percentage : 0
  const [percentage, setPercentage] = useState(goalPercentage);
  const [showAlreadyAddedAlert, setShowAlreadyAddedAlert] = useState(false);

  const showAlert = (goal) =>
  {
    swal({
      title: "Are you sure?",
      text: !!myGoal? "" : "Once deleted, you will not be able to recover this goal!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        if(!!myGoal)
        {
          removeFromMyGoals(goal.id)
        }
        else
        {
          onDelete(goal)
        }      
        let msg = myGoal? "Goal has been removed!" : "Poof! Goal has been deleted!"
        swal(msg, {
          icon: "success",
        });
      }
    });
  }

  const showAlreadyAddedMsg = () =>
  {
    setShowAlreadyAddedAlert(true)
    setTimeout(() => {
      setShowAlreadyAddedAlert(false)
    }, 2000);
  }
  
  return (
      <>
      <Card style={{ width: '80%', margin: 'auto', marginBottom: '20px', boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}}>
      <Card.Body>
        <Card.Title>
        <Alert style={{padding: "0px", width: "20%"}} show={showAlreadyAddedAlert} variant="danger">
          <p style={{fontSize: "15px",margin: "0px", marginBottom: "8px", padding: "5px 0px 0px 10px", height: "22px !important", color: "black", fontWeight: "300"}}>This goal is already added!</p>
        </Alert>
          <GiAchievement size={40} style={{color: "#efd131"}}/>
          <span style={{fontWeight: "", fontSize: '28px'}}>{goal.title}</span>
          <FaTrashAlt onClick={() => showAlert(goal)} style={{float: "right", color: 'red'}}/>
        </Card.Title>
        <Card.Text style={{fontStyle: 'italic'}}>
            {goal.desc}
        </Card.Text>
          { !!myGoal?
          <div>
            {
              percentage > 0 ?
              <div style={{marginTop: "20px"}}>
                <ProgressBar variant="success" style={{borderRadius: "10px", height: '12px', width: '60%', color: 'green'}} now={percentage} label={`${percentage}%`} />
              </div> :
              null
            }
            <div style={{marginTop: "20px", display: 'flex'}}>
              <h6>Mark Progress :  </h6>
              <input style={{height: '20px',marginLeft: '5px'}} type="number" value={percentage}  min={0} max={100}
                onChange={(e) => {
                  setPercentage(e.target.value)
                  setGoalPercentage(e, goal.id)}
                }
              />
            </div>
          </div>

          : null }        
        { 
          !myGoal? 
          myGoalIds.includes(goal.id) ?
            <Button style={{float: 'right'}} variant="success" onClick={(e) => {showAlreadyAddedMsg()}}>Added <FaCheckCircle style={{marginLeft: "5px"}}/></Button>
          :
            <Button style={{float: 'right'}} variant="secondary" onClick={(e) => {onAddGoalClick(goal.id)}}>Add to My Goals <FaPlus style={{marginLeft: "5px"}}/></Button>
          : 
            null
        }
      </Card.Body>
    </Card>
      </>
  )
}
