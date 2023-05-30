export const getRickAndMorty = async () => {
  const request = await fetch('https://rickandmortyapi.com/api/character');
  const response = await request.json();
  return response;
};
