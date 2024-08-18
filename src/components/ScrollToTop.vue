<template>
  <button v-show="visible" @click="scrollToTop" class="scroll-to-top" tabindex="0">
    &#8593;
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Видимость кнопки
const visible = ref(false);

// Функция для прокрутки страницы вверх
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Обработчик для слежения за прокруткой страницы
const handleScroll = () => {
  visible.value = window.scrollY > 300;
};

// Добавление и удаление обработчиков событий при монтировании/размонтировании
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #202329;
  color: white;
  border: 1px solid white;
  border-radius: 20%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
}

.scroll-to-top:hover {
  background-color: #3c3e44;
}

.scroll-to-top:focus {
  outline:auto ;
}
</style>
