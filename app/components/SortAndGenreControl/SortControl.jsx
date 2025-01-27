import React from "react";
import PropTypes from "prop-types";

class SortControl extends React.Component {
  handleSortChange = (event) => {
    this.props.onSortChange(event.target.value);
  };

  render() {
    const { currentSelection } = this.props;

    return (
      <div>
        <label htmlFor="sortSelect">Sort by : </label>
        <select
          id="sortSelect"
          value={currentSelection}
          onChange={this.handleSortChange}
        >
          <option value="release_date">Release Date</option>
          <option value="title">Title</option>
        </select>
      </div>
    );
  }
}

SortControl.propTypes = {
  currentSelection: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default SortControl;
