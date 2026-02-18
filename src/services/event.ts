'use server'

import { EventStatus, eventService } from '@/domains/event'

export async function getEventList(status: EventStatus) {
  return await eventService.getEventList(status)
}

export async function getEventAnnouncementList() {
  return await eventService.getEventAnnouncementList()
}
