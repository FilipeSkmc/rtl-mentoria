import { render, screen } from '@testing-library/react';
import CardList from '../components/CardList';
import { mockResult, nomePersonagens } from './mocks/mocks';

// acessa a mockResult e utiliza o array de objetos contido nele através da chave results
const PERSONAGENS = mockResult.results;

describe('Testando o CardList', () => {
  test('Verificar Card List renderiza 5 Cards', async () => {
    render(<CardList
      data={ PERSONAGENS }
      filterName=""
      filterLocation=""
    />);

    const heading = screen.getByRole('heading', { name: /personagens/i });
    expect(heading).toBeInTheDocument();

    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards).toHaveLength(5);

    const rick = screen.getByText(nomePersonagens[0]);
    expect(rick).toBeInTheDocument();

    const morty = screen.getByText(nomePersonagens[1]);
    expect(morty).toBeInTheDocument();

    const summer = screen.getByText(nomePersonagens[2]);
    expect(summer).toBeInTheDocument();

    const beth = screen.getByText(nomePersonagens[3]);
    expect(beth).toBeInTheDocument();

    const jerry = screen.getByText(nomePersonagens[4]);
    expect(jerry).toBeInTheDocument();
  });

  test('Testar se aparece nenhum encontrado ao receber um array vazio', () => {
    render(<CardList
      data={ [] }
      filterName=""
      filterLocation=""
    />);

    const notFound = screen.getByText(/nenhum encontrado/i);
    expect(notFound).toBeInTheDocument();
  });

  test('Testar se ao enviar smith via prop filterName aparece 4 cards com nomes contendo smith', () => {
    render(<CardList
      data={ PERSONAGENS }
      filterName="smith"
      filterLocation=""
    />);

    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards).toHaveLength(4);

    const morty = screen.getByText(nomePersonagens[1]);
    expect(morty).toBeInTheDocument();

    const summer = screen.getByText(nomePersonagens[2]);
    expect(summer).toBeInTheDocument();

    const beth = screen.getByText(nomePersonagens[3]);
    expect(beth).toBeInTheDocument();

    const jerry = screen.getByText(nomePersonagens[4]);
    expect(jerry).toBeInTheDocument();
  });

  test('Testar se ao enviar citadel via prop filterLocation aparece 2 cards com nomes contendo citadel', () => {
    render(<CardList
      data={ PERSONAGENS }
      filterName=""
      filterLocation="citadel"
    />);

    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards).toHaveLength(2);

    const rick = screen.getByText(nomePersonagens[0]);
    expect(rick).toBeInTheDocument();

    const morty = screen.getByText(nomePersonagens[1]);
    expect(morty).toBeInTheDocument();
  });

  test('Testar se ao enviar abcdef via prop filterName, aparece nenhum encontrado', () => {
    render(<CardList
      data={ PERSONAGENS }
      filterName="abcdef"
      filterLocation=""
    />);

    const notFound = screen.getByText(/nenhum encontrado/i);
    expect(notFound).toBeInTheDocument();
  });

  test('Testar se ao enviar abcdef via prop filterLocation, aparece nenhum encontrado', () => {
    render(<CardList
      data={ PERSONAGENS }
      filterName=""
      filterLocation="abcdef"
    />);

    const notFound = screen.getByText(/nenhum encontrado/i);
    expect(notFound).toBeInTheDocument();
  });
});
