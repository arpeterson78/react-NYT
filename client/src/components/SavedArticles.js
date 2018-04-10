import React, { Component } from "react";

const SavedArticles = (props) => {
    return (
        <div className="card text-center container">
            <div className="card-header">
                {props.s.header}
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.s.title}</h5>
                <p className="card-text">{props.s.snippet}</p>
                <a href={props.s.URL} target="_blank" className="btn btn-primary">See Article</a>
                <button data-id={props.s._id} className="btn btn-danger" onClick={props.delete}>Delete</button>
            </div>
            <div className="card-footer text-muted">
                Published: {props.s.date}
            </div>
        </div>
    )
}

export default SavedArticles;