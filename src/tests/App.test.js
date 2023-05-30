import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { mockResult } from './mocks/mocks';

describe('Testando a aplicacao', () => {
  beforeEach(async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResult),
    });
  });

  test('Verificar se os campos e os elementos estão na tela', async () => {
    render(<App />);

    const loading = screen.getByText(/carregando.../i);
    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(loading, { timeout: 3000 });

    const input = screen.getByRole('heading', { level: 1, name: 'Rick And Morty' });

    expect(input).toBeInTheDocument();

    const headingFiltros = screen.getByRole('heading', { name: 'Filtros' });
    expect(headingFiltros).toBeInTheDocument();

    const headingPersonagens = screen.getByRole('heading', { name: 'Personagens' });
    expect(headingPersonagens).toBeInTheDocument();

    // Outra forma de testar a ocorrências de Filtros e Personagens
    // const headings = screen.getAllByRole('heading', { level: 2 });
    // expect(headings[0]).toHaveTextContent('Filtros');
    // expect(headings[1]).toHaveTextContent('Personagens');

    const headingCard = screen.getByRole('heading', { name: 'Rick Sanchez' });
    expect(headingCard).toBeInTheDocument();

    const filterName = screen.getByPlaceholderText('Name');
    expect(filterName).toBeInTheDocument();

    const filterLocation = screen.getByPlaceholderText('Location');
    expect(filterLocation).toBeInTheDocument();
  });

  test('testar se a requisição foi feita', async () => {
    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character');
    expect(global.fetch).toBeCalledTimes(1);
  });

  test('testar se ao digitar abcde no campo Name aparece nenhum encontrado', async () => {
    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));

    const filterName = screen.getByPlaceholderText('Name');

    userEvent.type(filterName, 'abcde');

    const notFound = screen.getByText(/nenhum encontrado/i);
    expect(notFound).toBeInTheDocument();
  });

  test('testar se ao digitar abcde no campo Location aparece nenhum encontrado', async () => {
    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));

    const filterLocation = screen.getByPlaceholderText('Location');

    userEvent.type(filterLocation, 'abcde');

    const notFound = screen.getByText(/nenhum encontrado/i);
    expect(notFound).toBeInTheDocument();
  });

  test('testar se ao digitar morty no campo Name aparece 1 card apenas, contendo morty smith', async () => {
    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));

    const filterName = screen.getByPlaceholderText('Name');
    userEvent.type(filterName, 'morty');

    const nameCards = screen.getAllByRole('heading', { level: 3 });
    expect(nameCards).toHaveLength(1);

    const card = screen.getByText(/morty smith/i);
    expect(card).toBeInTheDocument();
  });

  test('testar se ao digitar ricks no campo Location aparece 2 cards, contendo morty smith e outro rick sanchez', async () => {
    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));

    const filterLocation = screen.getByPlaceholderText('Location');
    userEvent.type(filterLocation, 'ricks');

    const nameCards = screen.getAllByRole('heading', { level: 3 });
    expect(nameCards).toHaveLength(2);

    const morty = screen.getByText(/morty smith/i);
    expect(morty).toBeInTheDocument();

    const rick = screen.getByText(/rick sanchez/i);
    expect(rick).toBeInTheDocument();
  });
});
