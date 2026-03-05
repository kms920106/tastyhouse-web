'use server'

import { EventAnnouncementListQuery, EventListQuery, eventRepository } from '@/domains/event'

export async function getEventList(params: EventListQuery) {
  return eventRepository.getEventList(params)
}

export async function getEventAnnouncementList(params: EventAnnouncementListQuery) {
  return eventRepository.getEventAnnouncementList(params)
}
