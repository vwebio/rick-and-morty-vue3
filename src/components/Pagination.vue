<template>
  <div class="pagination">
    <Button @click="prevPage" :disabled="currentPage === 1">Назад</Button>
    <Button @click="nextPage" :disabled="!hasMoreCharacters">Вперед</Button>
  </div>
</template>

<script setup>
import Button from "@/components/Button.vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  hasMoreCharacters: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["prevPage", "nextPage"]);

const prevPage = () => {
  emit("prevPage");
};

const nextPage = () => {
  emit("nextPage");
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
