<template>
  <button 
    :class="['button', { 'button--disabled': disabled }]" 
    @click="handleClick" 
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false // Значение по умолчанию - кнопка активна
  }
});

// События, которые компонент может вызвать
const emit = defineEmits(['click']);

// Функция обработки клика по кнопке
const handleClick = () => {
  if (!props.disabled) {
    emit('click'); // вызываем событие 'click', если кнопка активна
  }
};
</script>

<style lang="scss" scoped>
.button {
  background-color: #202329;
  color: white;
  padding: 0.5rem 1rem;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #3c3e44;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.button--disabled {
  background-color: #6c757d;
  border-color: #6c757d;
  color: #ffffff;
  cursor: not-allowed;
}
</style>
