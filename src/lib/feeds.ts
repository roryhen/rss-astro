import wretch from "wretch"
import type { APIResponse } from "../pages/api/feed"

export type FeedSource = {
  feedUrl: string
  title: string
  link: string
  dateAdded: string
}

export type FeedItem = {
  sourceId: FeedSource['link']
  sourceName: FeedSource['title']
  title: string
  author: string
  link: string
  description: string
  date: string
  imageUrl: string
  status: 'unread' | 'read'
}

export const addFeed = wretch('/api/feed').errorType('json').resolve(r => r.json<APIResponse>())



