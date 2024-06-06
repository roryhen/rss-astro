import { createStorage } from "unstorage";
import localStorageDriver from "unstorage/drivers/localstorage";
import type { FeedItem, FeedSource } from "./feeds";
import { createStore } from "solid-js/store";

export class Storage {
  storage = createStorage({
    driver: localStorageDriver({
      base: "rss-app",
    }),
  });

  storageKey = 'sources'

  async getSources() {
    return await this.storage.getItem<FeedSource[]>(this.storageKey)
  }

  async getFeed(id: string) {
    return await this.storage.getItem<FeedItem[]>(id)
  }

  async addSource(feed: FeedSource) {
    const feeds = await this.getSources()
    console.log(feeds)
    const hasFeed = feeds?.some((f) => f.link === feed.link)

    if (feeds?.length && !hasFeed) {
      this.storage.setItem(this.storageKey, [...feeds, feed])
    }

    this.storage.setItem(this.storageKey, [feed])
  }

  async addFeed(feed: FeedItem[]) {
    const id = feed[0].sourceId
    const feedItems = await this.getFeed(id)

    if (feedItems) {
      this.storage.setItem(id, [...feedItems, ...feed])
    }

    this.storage.setItem(id, feed)
  }
}

const [storage, setStorage] = createStore<{storage: Storage | null}>({
 storage: null
})

export { storage, setStorage};
