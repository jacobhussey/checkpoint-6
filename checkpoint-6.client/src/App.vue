<template>
  <header>
    <Navbar />
  </header>
  <main class="" id="main">
    <router-view />
  </main>
  <footer class="bg-dark text-light">

  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState),


    }

  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

main {
  padding: 25px;
  background-color: white;
  color: #111927;
}

.dark-mode {
  background-color: #111927;
  color: white;
}
</style>
