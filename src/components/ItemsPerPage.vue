<template>
  <select v-model="selectedValue" class="select">
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup>
import { computed, defineEmits, defineProps } from 'vue';

const props = defineProps({
  modelValue: Number, // выбранное количество карточек на странице
  options: {
    type: Array,
    default: () => [10, 25, 50] // варианты выбора
  }
});

// Определение события для обновления выбранного значения
const emit = defineEmits(['update:modelValue']);

// Реактивное свойство для привязки к выбранному значению
const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<style lang="scss" scoped>
.select {
  padding: 0.5rem;
  border: 1px solid #202329;
  border-radius: 5px;
  font-size: 1rem;
  background-color: white;
}
</style>
