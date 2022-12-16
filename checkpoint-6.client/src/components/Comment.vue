<template>
    <div class="d-flex">
        <img :src="comment.creator.picture" alt="" class="img-fluid rounded-circle ms-5 creator-img">
        <div class="col-9 bg-light  ms-4 rounded mb-5">
            <h6 class="ms-2">{{ comment.creator.name }}</h6>
            <div class="ms-2">
                <p>{{ comment.body }}</p>
            </div>
        </div>
        <div class="col-1 ms-2">
            <button v-if="event.creatorId == account.id" @click="removeComment(comment.id)" class="btn btn-danger">
                <i class="mdi mdi-delete" title="delete comment"></i>
            </button>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { commentsService } from "../services/CommentsService";



export default {
    props: {
        comment: {
            type: Object,
            required: true
        }
    },


    setup() {

        return {
            event: computed(() => AppState.activeEvent),
            account: computed(() => AppState.account),

            async removeComment(commentId) {
                try {
                    if (await Pop.confirm())
                        await commentsService.removeComment(commentId)
                } catch (error) {
                    console.error(error)
                    Pop.error(('[ERROR]'), error.message)
                }
            }


        };

    }
}
</script>

<style lang="scss" scoped>
.creator-img {
    height: 15vh;
    width: 15vh;
}
</style>