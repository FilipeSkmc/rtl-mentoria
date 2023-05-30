// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import './Card.css';
import React, { Component } from 'react';

export default class Card extends Component {
  render() {
    const { name, image, location, species, status } = this.props;
    return (
      <div className="character">
        <h3>{name}</h3>
        <img src={ image } alt={ name } />
        <p>{`Status: ${status}`}</p>
        <p>{`Location: ${location}`}</p>
        <p>{`Specie: ${species}`}</p>
      </div>
    );
  }
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
