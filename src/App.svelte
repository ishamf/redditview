<script>
  import { createListingStore, loadListing, getListing } from './store/listing'
  import { createPostStore } from './store/post'

  import Post from './components/Post.svelte'

  createListingStore()
  createPostStore()

  let posts = getListing({ type: 'best' })

  loadListing({ type: 'best' })
</script>

<main>
  <h1>Reddit</h1>

  {#each $posts as post}
    <Post name={post} showSub />
  {/each}
</main>

<style>
  main {
    padding: 1em;
    max-width: 640px;
    margin: 0 auto;
  }

  :global(:root) {
    background-color: #f3f3f3;

    --primary-color: #4d9de0;
    --secondary-color: #bcc4db;
    color: #2d3142;

    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
</style>
