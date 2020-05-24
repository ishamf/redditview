import { autorun } from 'mobx'
import { readable } from 'svelte/store'

function now() {
  const time = Date.now()
  const last = now.last || time
  return (now.last = time > last ? time : last + 1)
}

export function uniqid(prefix, suffix) {
  return (prefix ? prefix : '') + now().toString(36) + (suffix ? suffix : '')
}

export function createStore(getter, setter) {
  const store = readable(getter(), (set) => autorun(() => set(getter())))

  return {
    subscribe: store.subscribe,
    set: setter,
  }
}
