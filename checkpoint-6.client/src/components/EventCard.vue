<template>
    <router-link v-if="route.name == 'Home'" :to="{ name: 'Event Details', params: { eventId: event.id } }">
        <img :src="event.coverImg" alt="" class="img-fluid">
        <div class="text-black fw-bold p-3">
            {{ event.name }}
        </div>
    </router-link>
</template>

<script>
import { useRoute } from 'vue-router';
export default {
    props: {
        event: {
            type: Object,
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

<style>

</style>