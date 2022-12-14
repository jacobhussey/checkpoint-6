import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {
    async getTickets(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId }).populate('event').populate('profile')

        return tickets
    }
    async getAll(page = 1) {
        const events = await dbContext.Events.find().populate('creator')
        return events
    }
    async getOne(id) {
        const event = await dbContext.Events.findById(id).populate('creator')
        if (!event) throw new BadRequest(`no event by id ${id}`)
        return event
    }

    async create(body) {
        const event = await dbContext.Events.create(body)
        await event.populate('creator')
        return event
    }

    async remove(eventId, userId) {
        const event = await this.getOne(eventId)
        if (event.creatorId != userId) throw new Forbidden('not your event to cancel')
        event.isCanceled = !event.isCanceled
        await event.save()
        return `canceled $${event.name}`
    }
    async update(eventId, eventData) {
        const original = await dbContext.Events.findById(eventId)
        if (!original) throw new BadRequest('no event at id:' + eventId)
        if (original.isCanceled == true) throw new BadRequest('cant edit canceled event')
        original.coverImg = eventData.coverImg ? eventData.coverImg : original.coverImg
        original.capacity = eventData.capacity !== undefined ? eventData.capacity : original.capacity
        original.description = eventData.description ? eventData.description : original.description
        original.name = eventData.name ? eventData.name : original.name
        original.location = eventData.location ? eventData.location : original.location
        original.startDate = eventData.startDate ? eventData.startDate : original.startDate

        await original.save()
        return original
    }
}


export const eventsService = new EventsService()