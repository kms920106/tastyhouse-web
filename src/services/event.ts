'use server'

import { EventAnnouncementListQuery, EventListQuery, eventService } from '@/domains/event'

export async function getEventList(params: EventListQuery) {
  return await eventService.getEventList(params)
}

export async function getEventAnnouncementList(params: EventAnnouncementListQuery) {
  return await eventService.getEventAnnouncementList(params)
}
