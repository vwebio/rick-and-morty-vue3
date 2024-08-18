<template>
  <div class="loader"></div>
</template>

<style lang="scss" scoped>
.loader {
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #202329;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  margin: 2rem auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
