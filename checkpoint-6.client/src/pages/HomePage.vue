<template>
  <section class="container-fluid">
    <div class="row p-5 m-2 bg-img">
    </div>

    <div class="row p-3 m-2 justify-content-between bg-light">
      <div class="col-2">concert</div>
      <div class="col-2">convention</div>
      <div class="col-2">sports</div>
      <div class="col-2">digital</div>
    </div>

    <div class="row">
      <div v-for="e in events" class="col-2 bg-light rounded elevation-5 m-3">
        <img :src="e.coverImg" alt="" class="img-fluid">
        <div>
          {{ e.name }}
        </div>
      </div>

    </div>

  </section>
</template>

<script>
import { computed } from '@vue/reactivity'
import { onMounted } from 'vue'
import { AppState } from '../AppState'
import { eventsService } from '../services/EventsService'

export default {
  setup() {

    async function getAllEvents() {
      try {
        await eventsService.getAllEvents()
      } catch (error) {
        console.error(error)
        Pop.error(('[ERROR]'), error.message)
      }
    }
    onMounted(() => {
      getAllEvents()
    })
    return {
      events: computed(() => AppState.events
      )


    }
  }
}
</script>

<style scoped lang="scss">
.bg-img {
  background: url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZXZlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60');
  background-position: center;
  background-size: cover;
  height: 30vh;
}
</style>
