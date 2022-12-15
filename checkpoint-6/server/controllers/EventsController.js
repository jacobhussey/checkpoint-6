import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import { eventsService } from "../services/EventsService";
import BaseController from "../utils/BaseController";


export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getOne)
            .get('/:id/tickets', this.getTickets)
            .get('/:id/comments', this.getComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .delete('/:id', this.remove)
            .put('/:eventId', this.update)
    }



    async getAll(req, res, next) {
        try {
            const events = await eventsService.getAll(req.query.page)
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getOne(req, res, next) {
        try {
            const event = await eventsService.getOne(req.params.id)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getTickets(req, res, next) {
        try {
            const tickets = await eventsService.getTickets(req.params.id)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async getComments(req, res, next) {
        try {
            const comments = await commentsService.getComments({ eventId: req.params.id })
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const event = await eventsService.create(req.body)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async remove(req, res, next) {
        try {
            const message = await eventsService.remove(req.params.id, req.userInfo.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const updated = await eventsService.update(req.params.eventId, req.body)
            return res.send(updated)
        } catch (error) {
            next(error)
        }
    }
}