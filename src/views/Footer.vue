<template>
  <div class="footer">
    <p class="footer-title">The Rick and Morty API | Vue 3 | 2024</p>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  background-color: black;
  height: auto;
  padding: 20px;
  text-align: center;
}

.footer-title {
  color: white;
  font-size: 16px;
  font-weight: 100;
  background: linear-gradient(
    45deg,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 480px) {
    font-size: 14px;
  }
}
</style>
