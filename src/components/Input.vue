<template>
  <input
    v-model="inputValue"
    @input="handleInput"
    @keyup.enter="handleKeyup"
    class="input"
    :placeholder="placeholder"
  />
</template>

<script setup>
import { computed, defineEmits, defineProps } from "vue";

// Определение входных параметров
const props = defineProps({
  modelValue: String,
  placeholder: String,
});

// Определение emit для обработки событий
const emit = defineEmits(["update:modelValue", "enter"]);

// Вычисляемое свойство для управления значением input
const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// Удаление пробелов при вводе
const handleInput = (event) => {
  const value = event.target.value.replace(/\s/g, ""); // Удаление пробелов
  emit("update:modelValue", value);
};

// Обработка нажатия клавиши Enter
const handleKeyup = (event) => {
  if (event.key === "Enter") {
    emit("enter");
  }
};
</script>

<style lang="scss" scoped>
.input {
  padding: 0.5rem;
  border: 1px solid #202329;
  border-radius: 5px;
  font-size: 1rem;
}
input::placeholder {
  color: #838181;
}
</style>
