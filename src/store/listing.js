import { setContext, getContext } from 'svelte'
import { observable, action } from 'mobx'
import { createStore } from '../utils'
import { fetchListing } from '../api'
import { getPostStore } from './post'

const listingKey = {}

class ListingStore {
  @observable
  listings = {}

  @action
  saveListingResponse({ initial, after, postIds, subreddit, type }) {
    if (initial || !this.listings[subreddit]?.[type]) {
      if (!this.listings[subreddit]) this.listings[subreddit] = {}

      this.listings[subreddit][type] = { after, postIds }
    } else {
      const listing = this.listings[subreddit][type]

      listing.after = after
      listing.postIds.push(...postIds)
    }
  }
}

export function createListingStore() {
  const store = new ListingStore()

  setContext(listingKey, store)

  return store
}

export function getListingStore() {
  return getContext(listingKey)
}

export function getListing({ subreddit, type }) {
  const store = getListingStore()

  return createStore(() => store.listings[subreddit]?.[type]?.postIds || [])
}

export async function loadListing({ initial, subreddit, type }) {
  const store = getListingStore()
  const postStore = getPostStore()

  const after = store.listings[subreddit]?.[type]?.after

  const res = await fetchListing({ type, subreddit, after })

  const postIds = res.data.children.map((c) => c.data.name)
  store.saveListingResponse({
    initial,
    type,
    subreddit,
    postIds,
    after: res.data.after,
  })

  for (const { data } of res.data.children) {
    postStore.savePost(data)
  }
}
