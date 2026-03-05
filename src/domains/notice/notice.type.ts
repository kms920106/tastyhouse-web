export interface NoticeListQuery {
  page: number
  size: number
}

export interface NoticeListItem {
  id: number
  title: string
  content: string
  createdAt: string
}
