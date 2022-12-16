<template>
  <!-- <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div> -->

  <section class="container-fluid">
    <div class="row justify-content-center rounded">
      <h3 class="text-light fst-italic text-center text-shadow">Upcoming Events:</h3>
      <div class="col-6 bg-grey rounded">
        <div v-for="t in tickets">
          <div class="bg-light p-3 my-3 rounded">
            <h3 class="text-center">{{ t.event.name }}</h3>
            <p class="text-center">{{ new Date(t.event.startDate).toLocaleDateString() }}</p>
            <div class="d-flex justify-content-center">
              <img :src="t.event.coverImg" alt="" class="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- {{ tickets.event }} -->
  </section>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { ticketsService } from '../services/TicketsService.js';
import Pop from '../utils/Pop'
export default {
  setup() {
    const route = useRoute()

    async function getMyTickets() {
      try {
        await ticketsService.getMyTickets()
      } catch (error) {
        console.error(error)
        Pop.error(('[ERROR]'), error.message)
      }
    }

    onMounted(() => {
      getMyTickets()
    })
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.myTickets)
    }
  }
}
</script>

<style scoped>
/* img {
  max-width: 100px;
} */

.text-shadow {
  text-shadow: 1px 1px 3px black;
}

img {
  height: 25vh;
  width: 35vh;
}

.circle-border {
  border-radius: 50%;
}
</style>
