<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center">
        <img
          src="https://images.vexels.com/media/users/3/137006/isolated/preview/f5c37b7bba9e50af9774509effb9bbe8-tower-flat-icon.png"
          alt="" height="45">
        <h4 class="text-warning fst-italic fw-bold" title="home page">Tower</h4>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <span @click="myFunction()">
          <button v-if="darkMode" class="btn "><i class="mdi mdi-weather-night fs-5 text-white"
              title="toggle light mode"></i></button>
          <button v-else class="btn "><i class="mdi mdi-weather-sunny fs-5 text-white"
              title="toggle dark mode"></i></button>
        </span>
      </ul>
      <button v-if="route.name != 'Home'" hidden></button>
      <button v-else="account.id" data-bs-toggle="modal" data-bs-target="#pictureModal" class="btn btn-primary me-4">
        Create Event
      </button>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { AppState } from '../AppState';
import Login from './Login.vue'
import { computed, ref } from '@vue/reactivity'
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute()
    return {
      route,
      darkMode: computed(() => AppState.darkMode),
      account: computed(() => AppState.account),
      myFunction() {
        AppState.darkMode = !AppState.darkMode
        let element = document.getElementById('main');
        element.classList.toggle("dark-mode");
      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
