import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"


class TicketsService {

    async getMyTickets() {
        try {
            const res = await api.get('account/tickets')
            logger.log('[got my tickets]', res.data)
            AppState.myTickets = res.data
            // logger.log("test", AppState.myTickets)
        } catch (error) {
            logger.log(error)
            Pop.error(error.message)
        }
    }

    async getTicketsbyEventId(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('got tickets for this event', res.data)
        AppState.tickets = res.data
    }

    async createTicket(body) {
        const res = await api.post('api/tickets', body)
        logger.log('[created ticket]', res.data)

        // FIXME
        AppState.tickets.push(res.data)

        AppState.myTickets.push(res.data)

        AppState.activeEvent.capacity--
    }

    async removeTicket(ticketId) {
        const res = await api.delete('api/tickets/' + ticketId)
        logger.log('[deleted ticket]', res.data)
        AppState.tickets = AppState.tickets.filter(t => t.id !== ticketId)
        AppState.myTickets = AppState.myTickets.filter(t => t.id !== ticketId)

        AppState.activeEvent.capacity++
    }
}



export const ticketsService = new TicketsService()

// const res = await api.get('account/tickets')
//         logger.log('[got tickets]', res.data)
//         AppState.tickets = res.data