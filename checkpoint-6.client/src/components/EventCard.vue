<template>
    <router-link v-if="route.name == 'Home'" :to="{ name: 'Event Details', params: { eventId: event.id } }">
        <img :src="event.coverImg" alt="" class="img-fluid event-img">
        <div class="text-black fw-bold p-3">
            {{ event.name }}
        </div>
    </router-link>
</template>

<script>
import { useRoute } from 'vue-router';
import { TowerEvent } from '../models/Event';
export default {
    props: {
        event: {
            type: TowerEvent,
            required: true
        }
    },


    setup(props) {
        const route = useRoute()
        return {
            route
        };
    }
}
</script>

<style lang="scss" scoped>
.event-img {
    height: 20vh;
    width: 25vh;
}
</style>