import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventsService {
    async getAllEvents() {
        const res = await api.get('api/events')
        logger.log('[Getting Events]', res.data)
        AppState.events = res.data
    }
    async getEventById(eventId) {
        const res = await api.get('api/events/' + eventId)
        logger.log('[got event by id]', res.data)
        AppState.activeEvent = res.data
        // logger.log(AppState.activeEvent)
    }

    async createEvent(body) {
        const res = await api.post('api/events', body)
        logger.log('created event', res.data)
        AppState.events = res.data.map(e => new Event(e))
    }

    // async removeEvent(id) {
    //     const res = await api.delete('api/events/' + id)
    //     logger.log('[DELETED EVENT]', res.data)
    //     AppState.events.splice()
    // }

}


export const eventsService = new EventsService()