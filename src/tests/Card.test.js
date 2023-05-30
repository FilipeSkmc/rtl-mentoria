import { render, screen } from '@testing-library/react';
import Card from '../components/Card';

const mockCardProp = {
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  location: 'Citadel of Ricks',
  species: 'Human',
  status: 'Alive',
};

describe('Testando o Card', () => {
  test('Verificar se o Card renderiza as informacoes corretas dele', async () => {
    render(<Card { ...mockCardProp } />);

    const name = screen.getByRole('heading', { name: 'Rick Sanchez' });
    expect(name).toBeInTheDocument();

    const location = screen.getByText('Location: Citadel of Ricks');
    expect(location).toBeInTheDocument();

    const species = screen.getByText('Specie: Human');
    expect(species).toBeInTheDocument();

    const status = screen.getByText('Status: Alive');
    expect(status).toBeInTheDocument();

    const img = screen.getByAltText(/rick sanchez/i);
    expect(img).toHaveAttribute('src', 'https://rickandmortyapi.com/api/character/avatar/1.jpeg');
  });
});
