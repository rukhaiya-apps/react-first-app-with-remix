import React, { Component } from "react";
import Counter from "../Counter/counter";
import SearchForm from "../SearchForm/searchform";
import "./header.css";

class Header extends Component {
  state = {};
  render() {
    return (
      <div className="div-container">
        <Counter />
        <SearchForm />
      </div>
    );
  }
}

export default Header;