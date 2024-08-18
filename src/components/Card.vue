<template>
  <div class="card" tabindex="0">
    <img class="avatar" :src="character.image" :alt="character.name" />
    <div class="info">
      <h2>{{ character.name }}</h2>
      <p>
        <span :class="statusClass" class="status__icon"></span>
        {{ characterStatus }}
      </p>

      <p class="pol">Пол: <span class="noticed">{{ characterGender }}</span></p>

      <div class="location">
        <span>Место происхождения: </span>
        <span class="noticed"> {{ character.origin.name }}</span>
      </div>
      <div class="location">
        <span>Недавно замечен в: </span>
        <span class="noticed"> {{ character.location.name }}</span>
      </div>
      <div class="location">
        <span>Впервые замечен в: </span>
        <span class="noticed">{{ character.firstSeen }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
});

const statusClass = computed(() => {
  return {
    "status__icon--alive": props.character.status === "Alive",
    "status__icon--dead": props.character.status === "Dead",
    "status__icon--unknown": props.character.status === "unknown",
  };
});

const characterStatus = computed(() => {
  switch (props.character.status) {
    case "Alive":
      return "Живой";
    case "Dead":
      return "Мертвый";
    default:
      return "Неизвестно";
  }
});

const characterGender = computed(() => {
  switch (props.character.gender) {
    case "Male":
      return "Мужской";
    case "Female":
      return "Женский";
    case "Genderless":
      return "Бесполый";
    default:
      return "Неизвестно";
  }
});

</script>

<style lang="scss" scoped>
.card {
  background-color: #3c3e44;
  border-radius: 5px;
  display: flex;
  padding: 0;
  color: white;
  box-sizing: border-box;
  width: 600px;
  height: 270px;  

  @media (max-width: 768px) {
  }

  @media (max-width: 480px) {
    flex-direction: column;    
    width: max-content;
    height: auto;
  }
}

.avatar {
  border-radius: 5px 0 0 5px;
  width: max-content;

  @media (max-width: 480px) {
    border-radius: 5px 5px 0 0;
  }
}

.info {
  padding: 1rem;
  font-size: 15px;

  @media (max-width: 480px) {
    margin-left: 0;
  }
}

h2 {
  font-size: 22px;
  margin: 0;  
}

.status__icon {
  display: inline-block;
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 0.375rem;
  border-radius: 50%;
}

.status__icon--alive {
  background-color: rgb(85, 204, 68);
}

.status__icon--dead {
  background-color: red;
}

.status__icon--unknown {
  background-color: gray;
}

.pol,
.location
 {
  color: rgb(158, 158, 158);
  margin-bottom: 5px;
}

.noticed {
  color: white;
  @media (max-width: 480px) {
    display: block;
  }
}
</style>
