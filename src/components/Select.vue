<template>
  <select v-model="selectedValue" class="select">
    <option disabled value="">{{ placeholder }}</option>
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup>
import { computed, defineEmits, defineProps } from "vue";

// Обработчик выбора значения
const props = defineProps({
  modelValue: String,
  options: Array,
  placeholder: String,
});

const emit = defineEmits(["update:modelValue"]);

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style lang="scss" scoped>
.select {
  padding: 0.5rem;
  border: 1px solid #202329;
  border-radius: 5px;
  font-size: 1rem;
  color: #838181;
}

option {
  color: black;
}
</style>
