<template>
    <router-link v-if="route.name == 'Home'" :to="{ name: 'Event Details', params: { eventId: event.id } }">
        <img :src="event.coverImg" alt="" class="img-fluid event-img">
        <div class="text-black text-center p-3 font-size">
            <p class="fw-bold">{{ event.name }}</p>
            <p class="text-grey fst-italic text-center">{{ event.startDate }}</p>
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
    height: 25vh;
    width: 40vh;
}

.font-size {
    font-size: 16px;
}
</style>