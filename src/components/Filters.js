import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Filters.css';

class Filters extends Component {
  render() {
    const { filterName, filterLocation, handleChange } = this.props;
    return (
      <div className="filters">
        <h2>Filtros</h2>
        <form>
          <label htmlFor="filterName">
            <input
              type="text"
              name="filterName"
              id="filterName"
              placeholder="Name"
              value={ filterName }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="filterLocation">
            <input
              type="text"
              name="filterLocation"
              id="filterLocation"
              placeholder="Location "
              value={ filterLocation }
              onChange={ handleChange }

            />
          </label>
        </form>
      </div>
    );
  }
}
export default Filters;

Filters.propTypes = {
  filterName: PropTypes.string.isRequired,
  filterLocation: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
