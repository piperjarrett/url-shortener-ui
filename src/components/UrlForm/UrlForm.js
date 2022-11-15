import React, { Component } from "react";
import { postUrls } from "../../apiCalls";

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: "",
      urlToShorten: "",
      err: "",
    };
  }

  handleNameChange = (e) => {
    this.setState({ err: "" });
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newId = Date.now();
    const newUrl = {
      id: newId,
      long_url: this.state.urlToShorten,
      short_url: `http://localhost:3001/useshorturl/${newId}`,
      title: this.state.title,
    };
    console.log(newUrl);
    if (newUrl.id && newUrl.long_url && newUrl.short_url && newUrl.title) {
      postUrls(newUrl);
      this.props.addUrl();
      this.clearInputs();
    } else {
      this.setState({ err: "Oops, missing a input!" });
    }
  };

  clearInputs = () => {
    this.setState({ title: "", urlToShorten: "" });
  };

  render() {
    return this.state.err ? (
      <form>
        <input
          type="text"
          placeholder="Title..."
          name="title"
          value={this.state.title}
          onChange={(e) => this.handleNameChange(e)}
        />
        <input
          type="text"
          placeholder="URL to Shorten..."
          name="urlToShorten"
          value={this.state.urlToShorten}
          onChange={(e) => this.handleNameChange(e)}
        />
        <button onClick={(e) => this.handleSubmit(e)}>Shorten Please!</button>
        <p>{this.state.err}</p>
      </form>
    ) : (
      <form>
        <input
          type="text"
          placeholder="Title..."
          name="title"
          value={this.state.title}
          onChange={(e) => this.handleNameChange(e)}
        />

        <input
          type="text"
          placeholder="URL to Shorten..."
          name="urlToShorten"
          value={this.state.urlToShorten}
          onChange={(e) => this.handleNameChange(e)}
        />

        <button onClick={(e) => this.handleSubmit(e)}>Shorten Please!</button>
      </form>
    );
  }
}

export default UrlForm;
