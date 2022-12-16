import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CommentsService {

    async createComment(commentData) {
        const res = await api.post('api/comments', commentData)
        logger.log('posted comment', res.data)
        AppState.comments.unshift(res.data)
    }

    async getCommentsByEventId(eventId) {
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log('[got comments]', res.data)
        AppState.comments = res.data
        // logger.log(AppState.comments)
    }

    async removeComment(commentId) {
        const res = await api.delete(`api/comments/${commentId}`)
        logger.log('deleted comment', res.data)
        AppState.comments = AppState.comments.filter(c => c.id != commentId)
    }
}


export const commentsService = new CommentsService()