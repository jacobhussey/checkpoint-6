import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CommentsService {

    async createComment(commentData) {
        const res = await api.post('api/comments', commentData)
        logger.log('posted comment', res.data)
        AppState.comments.unshift(new Comment(res.data))
    }

    async getCommentsByEventId(eventId) {
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log('[got comments]', res.data)
        AppState.comments = res.data.map(c => new Comment(c))
        // logger.log(AppState.comments)
    }
}


export const commentsService = new CommentsService()