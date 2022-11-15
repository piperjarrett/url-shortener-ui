import React, { Component } from "react";
import "./App.css";
import { getUrls } from "../../apiCalls";
import UrlContainer from "../UrlContainer/UrlContainer";
import UrlForm from "../UrlForm/UrlForm";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      err: "",
    };
  }

  componentDidMount() {
    getUrls()
      .then((data) => this.setState({ urls: data.urls }))
      .catch((err) => this.setState({ err: err.message }));
  }

  addUrl = () => {
    getUrls()
      .then((data) => this.setState({ urls: data.urls }))
      .catch((err) => this.setState({ err: err.message }));
  };

  render() {
    return this.state.err ? (
      <div>
        <h1>Sorry something went wrong</h1>
        <p>Try again</p>
      </div>
    ) : (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addUrl={this.addUrl} />
        </header>

        <UrlContainer urls={this.state.urls} />
      </main>
    );
  }
}

export default App;
