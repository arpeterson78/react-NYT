import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import getArticles from './utils/API'
import getSaved, { saveArticle, deleteArticle } from './utils/localAPI';
import SearchForm from './components/Form';
import Articles from './components/Articles';
import SavedArticles from './components/SavedArticles';


class App extends Component {
  constructor() {
    super();

    this.state = {
      search: [],
      saved: []

    }
  }

  componentDidMount() {
    this.loadSaved();
  }

  loadArticle = (search, start, end) => {
    let searchedArticle = search;
    let article = searchedArticle.replace(/ /g, "+")
    let startDate = start;
    let endDate = end;
    let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=465a473b34ef4dd4a0ee8c44278471a2&q=${article}&start_date=${startDate}&end_date=${endDate}`;

    getArticles(url)
      .then(response => {
        console.log(response.data.response.docs);
        this.setState({ search: response.data.response.docs })

      })
      .catch(function (error) {
        console.log(error);
      });

  }

  loadSaved = () => {
    getSaved()
      .then(response => {
        this.setState({ saved: response.data })
      })
  }

  submitSearch = (event) => {
    event.preventDefault();

    let search = event.target.children[0].value;

    let firstDate = event.target.children[2].value;
    let startDate = firstDate.replace(/-/g, "");

    let secondDate = event.target.children[4].value;
    let endDate = secondDate.replace(/-/g, "");

    this.loadArticle(search, startDate, endDate);

  }

  save = (event) => {
    event.preventDefault();

    let articlePanel = {};

    let header = event.target.children[0].children[0].innerText;
    let title = event.target.children[0].children[1].children[0].innerText;
    let snippet = event.target.children[0].children[1].children[1].innerText;
    let url = event.target.children[0].children[1].children[2].getAttribute("href");
    let date = event.target.children[0].children[2].innerText;

    // date = date.slice(0, 10).split("").reverse();
    // let month = date.slice(3, 5).reverse().join("");
    // let day = date.slice(0, 2).reverse().join("");
    // let year = date.slice(6, 10).reverse().join("");
    // let correctDate = `${month}-${day}-${year}`;

    articlePanel.header = header;
    articlePanel.title = title;
    articlePanel.snippet = snippet;
    articlePanel.URL = url;
    articlePanel.date = date;

    saveArticle(articlePanel)
      .then(res => res.json())
      .then(newSaved => {
        console.log(newSaved)
        this.setState({ saved: [...this.state.saved, newSaved] })

      })

  }

  delete = (event) => {
    event.preventDefault();
    let id = event.target.getAttribute("data-id");

    deleteArticle(id)
      .then(res => res.json())
      .then(oldArticleID => {
        let saved = this.state.saved.filter(
          (saved, i) => saved._id !== oldArticleID
        );
        this.setState({ saved });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="background-image"></div>
        <div className="container">

          <SearchForm submitSearch={this.submitSearch} />

          <h2>Articles Searched</h2>
          {this.state.search.map((a) =>
            <Articles save={this.save} a={a} />
          )}

          <h2>Saved Articles</h2>
          {this.state.saved.map((s) =>
            <SavedArticles delete={this.delete} s={s} />
          )}

        </div>
      </div>
    );
  }
}

export default App;
