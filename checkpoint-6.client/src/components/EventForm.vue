<template>
    <div class="modal-header">
        <h1 class="modal-title text-dark fs-5" id="exampleModalLabel">Create Event</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <form @submit.prevent="createEvent">
        <div class="modal-body">
            <div class="form-floating mb-3 elevation-5 text-dark">
                <input v-model="editable.coverImg" type="url" required class="form-control" id="imgUrl"
                    placeholder="Image">
                <label for="imgUrl">Image</label>
            </div>

            <div class="form-floating mb-3 elevation-5 text-dark">
                <input v-model="editable.name" type="text" required class="form-control my-2" id="name"
                    placeholder="Event Name">
                <label for="name">Name</label>
            </div>

            <div class="form-floating mb-3 elevation-5 text-dark">
                <input v-model="editable.description" type="text" required class="form-control my-2" id="name"
                    placeholder="Event Description">
                <label for="description">Description</label>
            </div>

            <div class="form-floating mb-3 elevation-5 text-dark">
                <input v-model="editable.location" type="text" required class="form-control my-2" id="location"
                    placeholder="Event Location">
                <label for="location">Location</label>
            </div>

            <div class="form-floating mb-3 elevation-5 text-dark">
                <input v-model="editable.capacity" type="numer" required class="form-control my-2" id="capacity"
                    placeholder="Event Capacity">
                <label for="capacity">Capacity</label>
            </div>

            <div class="form-floating mb-3 elevation-5 text-dark">
                <input v-model="editable.type" type="text" required class="form-control my-2" id="type"
                    placeholder="Event Type">
                <label for="type">Type</label>
            </div>

            <div class="form-floating mb-3 elevation-5 text-dark">
                <input v-model="editable.startDate" type="date" required class="form-control my-2" id="startDate"
                    placeholder="Event Start Date">
                <label for="startDate">Start Date</label>
            </div>
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </form>
</template>

<script>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { eventsService } from '../services/EventsService';
import { logger } from '../utils/Logger';
import { Modal } from 'bootstrap';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';


export default {
    //    props: {
    //         event: {
    //             type: Object,
    //             required: true
    //         }
    //     },

    setup() {
        const editable = ref({})
        const router = useRouter()
        return {
            editable,
            event: computed(() => AppState.events),
            async createEvent() {
                try {
                    const event = await eventsService.createEvent(editable.value)
                    editable.value = {}
                    logger.log(event)
                    Modal.getOrCreateInstance('#pictureModal').hide()
                    Pop.toast('Event Created!', 'success')
                    router.push({ name: 'Event Details', params: { eventId: event.id } })
                } catch (error) {
                    logger.log(error)
                    Pop.error(('[ERROR]'), error.message)
                }
            }
        };

    }
}
</script>

<style>

</style>