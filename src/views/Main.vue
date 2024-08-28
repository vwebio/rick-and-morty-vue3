<template>
  <!-- Общая информация о количестве персонажей, локаций и эпизодов -->
  <section class="info">
    <p>Персонажи: {{ info.countCharacters }}</p>
    <p>Локации: {{ info.countLocations }}</p>
    <p>Эпизоды: {{ info.countEpisodes }}</p>
  </section>

  <!-- Поля фильтрации по имени, статусу и полу -->
  <section class="filter">    
    <Input
      v-model="filters.name"
      placeholder="Искать по имени..."
      @keydown.enter="handleSearch"
    />
    <Select
      v-model="filters.status"
      :options="statuses"
      placeholder="Выбрать статус"
      @keydown.enter="handleSearch"
    />
    <Select
      v-model="filters.gender"
      :options="genders"
      placeholder="Выбрать пол"
      @keydown.enter="handleSearch"
    />
    <Button @click="handleSearch" :disabled="!isSearchEnabled">Поиск</Button>
  </section>

  <!-- Отображение списка карточек персонажей -->
  <section class="section">
    <div class="card-list">
      <Card
        v-for="character in paginatedCharacters"
        :key="character.id"
        :character="character"
      />
    </div>
    <Loader v-if="loading" />
  </section>

  <!-- Элемент выбора количества карточек на страницу -->
  <section class="section">
    <ItemsPerPage v-model="cardsPerPage" />
  </section>

  <!-- Пагинация -->
  <section class="section">
    <Pagination
      :currentPage="currentPage"
      :hasMoreCharacters="hasMoreCharacters"
      @prevPage="prevPage"
      @nextPage="nextPage"
    />
  </section>

  <!-- Кнопка "Вверх" -->
  <ScrollToTop />
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useCharacters } from "@/services/useCharacters";
import ItemsPerPage from "@/components/ItemsPerPage.vue";
import Pagination from "@/components/Pagination.vue";
import Input from "@/components/Input.vue";
import Select from "@/components/Select.vue";
import Button from "@/components/Button.vue";
import Card from "@/components/Card.vue";
import Loader from "@/components/Loader.vue";
import ScrollToTop from "@/components/ScrollToTop.vue";

// Варианты выбора фильтров на русском языке
const statusMap = {
  Alive: "Живой",
  Dead: "Мёртвый",
  Unknown: "Неизвестно",
};

const genderMap = {
  Male: "Мужской",
  Female: "Женский",
  Genderless: "Бесполый",
  Unknown: "Неизвестно",
};

// Опции Select, которые будут отображаться на русском
const statuses = Object.values(statusMap);
const genders = Object.values(genderMap);

// Фильтры для поиска
const filters = ref({
  name: "",
  status: "",
  gender: "",
});

// Параметры пагинации
const cardsPerPage = ref(10);
const currentPage = ref(1);

// Получение данных персонажей и информации
const { characters, loading, loadCharacters, resetCharacters, info, loadInfo } = useCharacters();

// Отображение карточек на текущей странице
const paginatedCharacters = computed(() => {
  const start = (currentPage.value - 1) * cardsPerPage.value;
  const end = start + cardsPerPage.value;
  return characters.value.slice(start, end);
});

const hasMoreCharacters = computed(() => {
  return characters.value.length > currentPage.value * cardsPerPage.value;
});

// Функция поиска персонажей по фильтрам
const handleSearch = () => {
  // Преобразование выбранных фильтров на русском обратно в английский для API
  const translatedFilters = {
    name: filters.value.name,
    status: Object.keys(statusMap).find(
      (key) => statusMap[key] === filters.value.status
    ),
    gender: Object.keys(genderMap).find(
      (key) => genderMap[key] === filters.value.gender
    ),
  };

  resetCharacters();
  loadCharacters(translatedFilters);
};

// Переход по страницам
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (hasMoreCharacters.value) {
    currentPage.value++;
  }
};

// Проверка, включена ли кнопка поиска
const isSearchEnabled = computed(() => {
  return filters.value.name || filters.value.status || filters.value.gender;
});

// Начальная загрузка данных
onMounted(async () => {
  await loadCharacters(filters.value);
  await loadInfo();
});

</script>

<style lang="scss" scoped>
.section {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 1rem;
}

.card-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.filter {
  width: auto;
  display: flex;
  justify-content: center;
  padding: 5px 20px;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    padding: 0px 20px;
  }
}

.info {
  display: flex;
  justify-content: center;
  gap: 10px;
  text-align: center;
  color: rgb(158, 158, 158);
}
</style>
