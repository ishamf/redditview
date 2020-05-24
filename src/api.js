export function fetchReddit(path, params) {
  return fetch(
    `https://www.reddit.com/${path}.json?${new URLSearchParams({
      raw_json: 1,
      ...params,
    }).toString()}`
  ).then((r) => r.json())
}

export function fetchListing({ type, subreddit, after }) {
  let path = type

  if (subreddit) {
    path = `r/${subreddit}${path}`
  }

  return fetchReddit(path, { after })
}
