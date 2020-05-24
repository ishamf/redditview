<script>
  import { createListingStore, loadListing, getListing } from './store/listing'
  import { createPostStore } from './store/post'

  import Post from './components/Post.svelte'

  createListingStore()
  createPostStore()

  let posts = getListing({ type: 'hot' })

  loadListing({ type: 'hot' })
</script>

<main>
  <h1>Reddit</h1>

  {#each $posts as post}
    <Post name={post} />
  {/each}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
