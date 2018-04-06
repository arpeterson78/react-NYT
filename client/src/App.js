import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      search: ""

    }
  }

  loadArticle = (search, start, end) => {
    let searchedArticle = search;
    let article = searchedArticle.replace(/ /g, "+")
    let startDate = start;
    let endDate = end;
    let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?&api-key=465a473b34ef4dd4a0ee8c44278471a2?q=${article}?start=${startDate}?end=${endDate}`;
    console.log(url);
    axios.get(url)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  submitSearch = (event) => {
    event.preventDefault();

    let search = event.target.children[0].value;

    let firstDate = event.target.children[2].value;
    let startDate = firstDate.replace(/-/g, "");

    let secondDate = event.target.children[4].value;
    let endDate = secondDate.replace(/-/g, "");

    // console.log(search, startDate, endDate);
    this.loadArticle(search, startDate, endDate);

  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.submitSearch}>
          <input type="text" placeholder="Search..." />
          <br />
          Start Date<input type="date" />
          <br />
          End Date<input type="date" />
          <br />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

export default App;
