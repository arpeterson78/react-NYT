import React, { components } from 'react';

const SearchForm = (props) => {
    return (
        <form onSubmit={props.submitSearch}>
            <input className="form-control" type="text" placeholder="Search..." />
            <br />
            Start Date<input className="form-control" type="date" />
            <br />
            End Date<input className="form-control" type="date" />
            <br />
            <input type="submit" value="Search" />
        </form>

    )
}

export default SearchForm;


