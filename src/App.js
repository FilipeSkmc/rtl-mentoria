import React, { Component } from 'react';
import { getRickAndMorty } from './services/api';
import Filters from './components/Filters';
import CardList from './components/CardList';

export default class App extends Component {
  state = {
    personagens: [],
    filterName: '',
    filterLocation: '',
    loading: true,
  };

  async componentDidMount() {
    const { results } = await getRickAndMorty();

    this.setState({
      personagens: results,
      loading: false,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { personagens, loading, filterName, filterLocation } = this.state;
    return loading ? <p>Carregando...</p> : (
      <div className="main">
        <h1>Rick And Morty</h1>
        <Filters
          { ...{ filterName, filterLocation } }
          handleChange={ this.handleChange }
        />
        <CardList
          data={ personagens }
          filterName={ filterName }
          filterLocation={ filterLocation }
        />
      </div>
    );
  }
}
