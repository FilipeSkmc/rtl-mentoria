import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Card from './Card';
import './CardList.css';

export default class CardList extends Component {
  render() {
    const { data, filterName, filterLocation } = this.props;
    const filtered = data.filter(
      (personagem) => personagem.name
        .toLowerCase().includes(filterName.toLowerCase())
        && personagem.location.name.toLowerCase().includes(filterLocation.toLowerCase()),
    );
    return (
      <>
        <h2>Personagens</h2>
        <div className="characters-list">
          {
            filtered.length > 0 ? (
              filtered.map((
                { name, image, location: { name: location }, species, status, id },
              ) => (
                <Card key={ id } { ...{ name, image, location, species, status } } />
              ))
            ) : (
              <p>Nenhum encontrado</p>
            )
          }
        </div>
      </>
    );
  }
}

CardList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      map: PropTypes.func,
      filter: PropTypes.func,
    }),
  ).isRequired,
  filterName: PropTypes.string.isRequired,
  filterLocation: PropTypes.string.isRequired,
};
