import React, { Component } from "react";

const Articles = (props) => {
    return (
        <form key={props.a._id} onSubmit={props.save}>
            <div className="card text-center">
                <div className="card-header">
                    {props.a.type_of_material}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{props.a.headline.main}</h5>
                    <p className="card-text">{props.a.snippet}</p>
                    <a href={props.a.web_url} target="_blank" className="btn btn-primary">See Article</a>
                    <input className="btn btn-primary save-button" type="submit" value="Save" />
                </div>
                <div className="card-footer text-muted">
                    {props.a.pub_date}
                </div>
            </div>
        </form>
    )
}




export default Articles;