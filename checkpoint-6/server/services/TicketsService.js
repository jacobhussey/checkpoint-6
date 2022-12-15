import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService";

class TicketsService {
    async remove(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId).populate('profile event')
        if (!ticket) throw new BadRequest(`no ticket at id: ${ticketId}`)

        // @ts-ignore
        if (ticket.accountId.toString() != userId) throw new Forbidden("Bro that aint yours tickete")

        await ticket.remove()
        const event = await eventsService.getOne(ticket.eventId)
        if (event.isCanceled) throw new Forbidden('event canceled')

        // @ts-ignore
        event.capacity += 1
        await event.save()

        return `ticket has been removed`
    }
    async getMyEvents(accountId) {
        const events = await dbContext.Tickets.find({ accountId }).populate('event')
        return events
    }
    async create(body) {
        const event = await dbContext.Events.findById(body.eventId)
        // @ts-ignore
        if (event.isCanceled) throw new Forbidden("event canceled")
        // @ts-ignore
        if (event.capacity <= 0) throw new BadRequest('event at max capacity')
        const ticket = await dbContext.Tickets.create(body)
        // @ts-ignore
        event.capacity--
        await ticket.populate('profile')
        await ticket.populate('event')
        // @ts-ignore
        await event.save()
        return ticket


    }



}


export const ticketsService = new TicketsService()