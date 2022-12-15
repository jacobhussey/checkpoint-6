import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"
import { eventsService } from "./EventsService"


class CommentsService {
    async remove(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        // @ts-ignore
        if (comment.creatorId.toString() != userId) throw new Forbidden('not your comment to delete')

        // @ts-ignore
        await comment.remove()
        return ('comment deleted')
    }
    async getComments(query) {
        const comments = await dbContext.Comments.find(query).populate('creator')
        return comments
    }
    async create(body) {
        const event = await eventsService.getOne(body.eventId)
        if (event.isCanceled) throw new Forbidden('event canceled')

        const comment = await dbContext.Comments.create(body)

        await comment.populate('creator')

        return comment
    }


}


export const commentsService = new CommentsService()