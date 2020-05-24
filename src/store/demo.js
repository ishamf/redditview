import { setContext, getContext } from 'svelte'
import { observable } from 'mobx'
import { createStore } from '../utils'

export const demoKey = {}

class DemoStore {
  @observable
  text = ''
}

export function createDemoStore() {
  const store = new DemoStore()

  setContext(demoKey, store)

  return store
}

export function getDemoStore() {
  const store = getContext(demoKey)

  return {
    text: createStore(
      () => store.text,
      (content) => (store.text = content)
    ),
  }
}
