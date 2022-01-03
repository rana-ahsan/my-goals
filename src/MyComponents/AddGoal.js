import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';

export const AddGoal = ({ addGoal }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");


    const submit = (e) => {
        e.preventDefault();
        addGoal(title, desc);
        setTitle("");
        setDesc("");
    }
    return (
        <div className="container my-3" style={{width: "74%"}}>
            <Accordion alwaysOpen={false} defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Add a Goal</Accordion.Header>
                    <Accordion.Body>
                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label" >Goal Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" required={true}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label">Goal Description</label>
                            <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control" id="desc"  required={true}/>
                        </div>
                        <button type="submit" className="btn btn-sm btn-secondary">Add Goal</button>
                    </form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {/* <h4>Add a Goal</h4>
             */}
        </div>
    )
}
