<template>
    <section class="container-fluid">
        <div v-if="event" class="row m-3 bg-light pb-5 rounded">
            <div class="d-flex justify-content-end">
                <div>
                    <div v-if="event.isCanceled" class="text-danger fw-bold">Event is canceled</div>
                    <button v-else-if="event.creatorId == account.id" @click="removeEvent(event.id)"
                        class="btn btn-light mt-2">
                        <i class="mdi mdi-delete fs-5 text-danger" title="delete event"></i>
                    </button>
                </div>
            </div>
            <div class="col-5">
                <img :src="event.coverImg" alt="" class="cover-img img-fluid">
            </div>
            <div class="col-6">
                <div class="row justify-content-between">
                    <div class="col-6">
                        <div class="d-flex">
                            <h1>{{ event.name }}</h1>
                            <div v-if="!event.isCanceled">
                                <i class="mdi mdi-check text-success fs-1 ms-2 p-3" title="tickets available!"></i>
                            </div>
                        </div>
                        <h6 class="p-1 fst-italic">{{ event.location }}</h6>
                    </div>
                    <div class="col-3">
                        {{ event.startDate }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-10 py-3 ms-1">
                        <p>{{ event.description }}</p>
                    </div>
                </div>

                <div class="row justify-content-between align-items-end mt-3">
                    <div class="col-3">
                        <h6>{{ event.capacity }} spots left</h6>
                    </div>
                    <div class="col-3">
                        <button v-if="event.isCanceled" class="btn btn-outline-danger" disabled>Event is
                            Canceled</button>
                        <button v-else-if="event.capacity <= 0" class="btn btn-outline-danger" disabled>Event is
                            sold out</button>
                        <button v-else-if="account.id && !foundMe" @click="createTicket()" class="btn btn-warning">
                            Attend
                        </button>
                        <button v-else-if="account.id" @click="removeTicket(foundMe.id)" class="btn btn-outline-danger">
                            <div><i class="mdi mdi-heart-broken text-danger"></i></div>
                            <div>Delete Ticket</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <section class="row mx-4 bg-light p-2 rounded">
            <span class="d-flex justify-content-center align-items-center fst-italic fw-bold">Attendees:</span>
            <div v-for="t in tickets">
                <div>
                    <img :src="t.profile.picture" alt="" class="ticket-picture rounded-circle picture-border"
                        :title="t.profile.name">
                </div>
            </div>
        </section>

        <section class="container-fluid mt-5">

            <section class="row m-5">
                <form v-if="account.id" @submit.prevent="createComment()" action="">
                    <div class="form-floating">
                        <textarea v-model="editable.body" class="form-control" placeholder="Leave a comment here"
                            id="floatingTextarea2" style="height: 100px"></textarea>
                        <label for="floatingTextarea2" class="text-black ms-4"></label>
                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-success mt-3">post comment</button>
                        </div>
                    </div>
                </form>
            </section>

            <section class="row mt-5">
                <div v-for="c in comments">
                    <Comment :comment="c" />
                </div>
            </section>
        </section>


    </section>
</template>

<script>
import { watchEffect, computed } from 'vue';
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { eventsService } from '../services/EventsService';
import { ticketsService } from '../services/TicketsService';
import Pop from '../utils/Pop';
import Comment from '../components/Comment.vue'
import { commentsService } from '../services/CommentsService';




export default {
    setup() {
        const editable = ref({})
        const route = useRoute();
        async function getEventById() {
            try {
                await eventsService.getEventById(route.params.eventId);
            }
            catch (error) {
                console.error(error);
                Pop.error(("[ERROR]"), error.message);
            }
        }

        async function getTicketsbyEventId() {
            try {
                await ticketsService.getTicketsbyEventId(route.params.eventId)
            } catch (error) {
                console.error(error)
                Pop.error(('[ERROR]'), error.message)
            }
        }

        async function getCommentsByEventId() {
            try {
                await commentsService.getCommentsByEventId(route.params.eventId)
            } catch (error) {
                console.error(error)
                Pop.error(('[ERROR]'), error.message)
            }
        }
        watchEffect(() => {
            getEventById();
            getCommentsByEventId();
            getTicketsbyEventId();
        });
        return {
            editable,
            event: computed(() => AppState.activeEvent),
            tickets: computed(() => AppState.tickets),
            comments: computed(() => AppState.comments),
            account: computed(() => AppState.account),
            foundMe: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),
            async createTicket() {
                try {
                    await ticketsService.createTicket({ eventId: route.params.eventId });
                }
                catch (error) {
                    console.error(error);
                    Pop.error(("[ERROR]"), error.message);
                }
            },
            async removeTicket(ticketId) {
                try {
                    if (await Pop.confirm())
                        await ticketsService.removeTicket(ticketId);
                }
                catch (error) {
                    console.error(error);
                    Pop.error(("[ERROR]"), error.message);
                }
            },

            async createComment() {
                try {
                    editable.value.eventId = route.params.eventId
                    await commentsService.createComment(editable.value)
                    editable.value = {}
                    Pop.toast('Posted comment!', 'success')
                } catch (error) {
                    console.error(error)
                    Pop.error(('[Event is canceled.]'), error.message)
                }
            },




            async removeEvent(eventId) {
                try {
                    if (await Pop.confirm)
                        await eventsService.removeEvent(eventId)
                } catch (error) {
                    console.error(error)
                    Pop.error(('[not your event to delete]'), error.message)
                }
            }
        };
    },
    components: { Comment }
}
</script>

<style lang="scss" scoped>
.cover-img {
    height: 70vh;
    width: 70vh;
}

.ticket-picture {
    height: 10vh;
    width: 10vh;
}

// .picture-border {
//     border: solid 3px black;
// }
</style>