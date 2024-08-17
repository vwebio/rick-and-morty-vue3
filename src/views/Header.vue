<template>
  <header class="header">
    <h1><a class="header-link" href="/" title="Home">Rick and Morty API</a></h1>
  </header>
</template>

<style lang="scss" scoped>
.header {
  height: 100px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;

  @media (max-width: 480px) {
    height: auto;
  }
}

.header-link {
  color: #202329;
  font-size: 5.625rem;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 3.625rem;
  }

  @media (max-width: 375px) {
    font-size: 2rem;
  }
}
</style>
