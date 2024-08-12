// API Rick and Morty
const API_URL = 'https://rickandmortyapi.com/api/character';

// Функция для получения списка персонажей с учетом фильтров
export const fetchCharacters = async (params = {}) => {
  try {
    // Формируем строку запроса с параметрами
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}?${query}`);

    if (!response.ok) {
      throw new Error('Ошибка при загрузке персонажей');
    }

    // Преобразуем ответ в JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке персонажей:', error);
    throw error;
  }
};
