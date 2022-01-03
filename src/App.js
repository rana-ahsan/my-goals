import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Header } from './MyComponents/Header'
import { Footer } from './MyComponents/Footer';
import { Goals } from './MyComponents/Goals';
import { MyGoals } from './MyComponents/MyGoals';
import { AddGoal } from './MyComponents/AddGoal';
import { About } from './MyComponents/About';
function App() {

  let initGoals;
  if (localStorage.getItem("goals") === null || (!!localStorage.getItem("goals") && JSON.parse(localStorage.getItem("goals")).length === 0 )) {
    initGoals = [
      {
        id: 1,
        title: 'Improve communication skills',
        desc: 'Improve your communication skills by spending atleast 2 hours daily on practicing...'
      },
      {
        id: 2,
        title: 'Improve team management',
        desc: 'Improve your team management skills by spending atleast 2 hours daily on practicing... Improve your team management skills by spending atleast 2 hours daily on practicing... Improve your team management skills by spending atleast 2 hours daily on practicing...'
      },
      {
        id: 3,
        title: 'Improve problem solving',
        desc: 'description'
      },
      {
        id: 4,
        title: 'Improve interpersonal skills',
        desc: 'description'
      }
    ];
  }
  else {
    initGoals = JSON.parse(localStorage.getItem("goals"));
  }

  let initMyGoals = localStorage.getItem('myGoals') ? JSON.parse(localStorage.getItem('myGoals')) : []
  let initMyGoalIds = localStorage.getItem('myGoalIds') ? JSON.parse(localStorage.getItem('myGoalIds')) : []

  const [goals, setGoals] = useState(initGoals);
  const [myGoals, setMyGoals] = useState(initMyGoals);
  const [myGoalIds, setMyGoalIds] = useState(initMyGoalIds);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals])
  useEffect(() => {
    localStorage.setItem("myGoals", JSON.stringify(myGoals));
  }, [myGoals])
  useEffect(() => {
    localStorage.setItem("myGoalIds", JSON.stringify(myGoalIds));
  }, [myGoalIds])

  const onDelete = (goal) => {
    setGoals(goals.filter((e) => {
      return e !== goal;
    }));
  }

  const addGoal = (title, desc) => {
    let id;
    if (goals.length === 0) {
      id = 1;
    }
    else {
      id = goals[goals.length - 1].id + 1;
    }
    const myGoal = {
      id: id,
      title: title,
      desc: desc,
    }
    setGoals([...goals, myGoal]);
  }


  const onAddGoalClick = (goalId) => {
    addToMyGoals(goalId)
  }

  const addToMyGoals = (goalId) =>
  {
    let goal = goals.find(x => x.id === goalId)
    if(goal)
    {
      setMyGoals([...myGoals, goal]);
      setMyGoalIds([...myGoalIds, goalId])
    }
  }

  const removeFromMyGoals = (goalId) =>
  {
    let goal = myGoals.find(x => x.id === goalId)
    if(goal)
    {
      setMyGoals(myGoals.filter((e) => {
        return e !== goal;
      }));
    }
    setMyGoalIds(myGoalIds.filter((e) => {
      return e !== goalId;
    }));
  }

  const setGoalPercentage = (e, goalId) =>
  {
    let val = parseInt(e.target.value)
    let goals = myGoals
    let goalIndex = goals.findIndex(x => x.id === goalId)
    goals[goalIndex]['percentage'] = val
    setMyGoals(goals)
    localStorage.setItem("myGoals", JSON.stringify(myGoals));
  }

  return (
    <Router>
      <Header title="Goals"/>
      <Routes>
        <Route exact path="/" element={
          <>
            <AddGoal addGoal={addGoal} />
            <Goals goals={goals} myGoalIds={myGoalIds} onDelete={onDelete} onAddGoalClick={onAddGoalClick}/> 
          </>
        }/>
        <Route exact path="/MyGoals" element={<MyGoals myGoals={myGoals} removeFromMyGoals={removeFromMyGoals} setGoalPercentage={setGoalPercentage}/>}/>
        <Route exact path="/About" element={<About/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
