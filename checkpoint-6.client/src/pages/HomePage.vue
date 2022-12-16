<template>
  <!-- SECTION HARD CODED -->
  <section class="container-fluid">
    <div class="row p-5 m-2 bg-img"></div>

    <section class="row p-3 mx-2 my-4 justify-content-center bg-light rounded">
      <div class="col-12 bg-dark elevation-5 p-2 rounded d-flex justify-content-between">
        <button @click="filterBy = 'concert'" class="col-2 btn btn-primary fw-bold">concert</button>
        <button @click="filterBy = 'convention'" class="col-2 btn btn-primary fw-bold">convention</button>
        <button @click="filterBy = 'sport'" class="col-2 btn btn-primary fw-bold">sports</button>
        <button @click="filterBy = 'digital'" class="col-2 btn btn-primary fw-bold">digital</button>
        <button @click="filterBy = ''" class="col-2 btn btn-primary fw-bold">all</button>

      </div>
    </section>

    <!-- SECTION EVENT FORM -->
    <!-- <section class="row justify-content-center">
      <div class="col-1">
        <button v-if="account.id" data-bs-toggle="modal" data-bs-target="#pictureModal" class="btn btn-primary">
          Create Event
        </button>

      </div>
    </section> -->

    <!-- SECTION EVENTCARD -->
    <div class="row d-flex justify-content-center">
      <div v-for="e in events" class="col-2 bg-white rounded elevation-5 m-3 event-border select card-blur">
        <EventCard :event="e" />
      </div>
    </div>

  </section>
  <ModalComponent id="pictureModal" class="text-danger">
    <EventForm />
  </ModalComponent>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { onMounted } from 'vue'
import { AppState } from '../AppState'
import { eventsService } from '../services/EventsService'
import EventCard from '../components/EventCard.vue'
import ModalComponent from '../components/ModalComponent.vue'
import EventForm from '../components/EventForm.vue'

export default {
  setup() {
    const filterBy = ref("");

    async function getAllEvents() {
      try {
        await eventsService.getAllEvents();
      }
      catch (error) {
        console.error(error);
        Pop.error(("[ERROR]"), error.message);
      }
    }

    onMounted(() => {
      getAllEvents();
    });

    return {
      filterBy,
      account: computed(() => AppState.account),
      events: computed(() => {
        if (filterBy.value == "") {
          return AppState.events;
        }
        else {
          return AppState.events.filter(e => e.type == filterBy.value);
        }
      })
    };
  },
  components: { EventCard, ModalComponent, EventForm }
}
</script>

<style scoped lang="scss">
.bg-img {
  background: url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZXZlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60');
  background-position: center;
  background-size: cover;
  height: 30vh;
}

// .event-border {
//   border: solid 3px black;
// }

.select:hover {
  box-shadow: 0px 0px 20px white;
  cursor: pointer;
}

.card-blur {
  background-color: rgb(51 27 61 / 14%);
  backdrop-filter: blur(40px);
}
</style>
