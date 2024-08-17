import { ref } from 'vue';
import { fetchCharacters, fetchInfo } from '@/api/characters';

export function useCharacters() {
  const characters = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const info = ref({
    countCharacters: 0,
    countLocations: 0,
    countEpisodes: 0,
  });

  // Функция загрузки всех персонажей
  const loadCharacters = async (filters = {}) => {
    loading.value = true;
    error.value = null;
    characters.value = [];
    
    try {
      let page = 1;
      let totalCharacters = [];
      let hasMore = true;

      while (hasMore) {
        const params = { ...filters, page };
        const data = await fetchCharacters(params);

        // Запрос информации о первом эпизоде для каждого персонажа
        const charactersWithEpisodes = await Promise.all(
          data.results.map(async (character) => {
            if (character.episode.length > 0) {
              const firstEpisodeUrl = character.episode[0];
              const episodeResponse = await fetch(firstEpisodeUrl);
              const episodeData = await episodeResponse.json();
              character.firstSeen = episodeData.name; // Сохраняем название первого эпизода
            } else {
              character.firstSeen = 'Неизвестно';
            }
            return character;
          })
        );
        
        // Объединяем персонажей с каждой страницы
        totalCharacters = [...totalCharacters, ...charactersWithEpisodes];

        // Проверяем, есть ли следующая страница
        hasMore = data.info.next !== null;
        page++;
      }

      characters.value = totalCharacters;
    } catch (err) {
      error.value = 'Не удалось загрузить персонажей';
    } finally {
      loading.value = false;
    }
  };

  // Функция загрузки общей информации
  const loadInfo = async () => {
    try {
      const data = await fetchInfo();
      info.value.countCharacters = data.characters;
      info.value.countLocations = data.locations;
      info.value.countEpisodes = data.episodes;

    } catch (err) {
      error.value = 'Не удалось загрузить общую информацию';
    }
  };

  const resetCharacters = () => {
    characters.value = [];
  };

  return {
    characters,
    loading,
    error,
    loadCharacters,
    resetCharacters,
    info,
    loadInfo,
  };
}
