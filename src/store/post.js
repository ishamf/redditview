import { setContext, getContext } from 'svelte'
import { observable, action } from 'mobx'
import { createStore } from '../utils'

export const postKey = {}

class PostStore {
  @observable
  postByName = {}

  @action
  savePost(post) {
    this.postByName[post.name] = post
  }
}

export function createPostStore() {
  const store = new PostStore()

  setContext(postKey, store)

  return store
}

export function getPostStore() {
  return getContext(postKey)
}

export function getPost(name) {
  const store = getPostStore()

  return createStore(() => store.postByName[name])
}
