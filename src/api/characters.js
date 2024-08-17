const API_URL = 'https://rickandmortyapi.com/api';

// Функция для получения персонажей с фильтрами
export const fetchCharacters = async (params = {}) => {
  try {
    const query = new URLSearchParams({
      name: params.name || '',
      status: params.status || '',
      gender: params.gender || '',
      page: params.page || 1,
    }).toString();

    const response = await fetch(`${API_URL}/character?${query}`);

    if (!response.ok) {
      throw new Error('Ошибка при загрузке персонажей');
    }
    
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Ошибка при загрузке персонажей:', error);
    throw error;
  }
};

// Функция для получения общей информации о персонажах, локациях и эпизодах
export const fetchInfo = async () => {
  try {
    const character = await fetch(`${API_URL}/character`);
    const location = await fetch(`${API_URL}/location`);
    const episode = await fetch(`${API_URL}/episode`);

    if (!character.ok || !location.ok || !episode.ok) {
      throw new Error('Ошибка при загрузке информации');
    }

    const characterData = await character.json();
    const locationData = await location.json();
    const episodeData = await episode.json();

    return {
      characters: characterData.info.count,
      locations: locationData.info.count,
      episodes: episodeData.info.count,
    };
  } catch (error) {
    console.error('Ошибка при загрузке общей информации:', error);
    throw error;
  }
};
