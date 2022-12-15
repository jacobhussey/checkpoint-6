<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <section class="container-fluid">
    <div class="row justify-content-center">
      <h3 class="text-success">Upcoming Events:</h3>
      <div v-for="t in tickets">
        <div class="col-6">
          {{ t.event.name }}
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
img {
  max-width: 100px;
}
</style>
