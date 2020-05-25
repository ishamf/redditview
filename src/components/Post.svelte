<script>
  export let name, showSub

  import { DateTime } from 'luxon'

  import { getPost } from '../store/post'
  import { formatLargeNumber } from '../utils'

  let post = getPost(name)

  let postCreateTime

  $: postCreateTime = DateTime.fromSeconds($post.created_utc)
</script>

<a class="container" href={$post.permalink}>
  <span class="points">{formatLargeNumber($post.score)}</span>
  <div class="content">
    <h3>{$post.title}</h3>
    <div class="items">
      {#if showSub}
        <span class="item">r/{$post.subreddit}</span>
      {/if}
      <time class="item" datetime={postCreateTime.toISO()}>
        {postCreateTime.toRelative()}
      </time>
      <span class="item">
        {$post.num_comments} {$post.num_comments === 1 ? 'comment' : 'comments'}
      </span>
    </div>

  </div>

  <a href={$post.url} class="open-link">
    <img src="/images/icons/external-link.svg" alt="Open link" />
  </a>

</a>

<style>
  .container {
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
    background-color: white;

    margin: 1rem 0;
    border-radius: 1rem;
    overflow: hidden;

    display: flex;
    flex-direction: row;
    align-items: center;

    color: inherit;
    text-decoration: inherit;
  }

  .container:hover {
    background-color: #f6f6f6;
  }

  .points {
    flex: 0;
    flex-basis: 3rem;
    text-align: center;
    padding: 0.5rem;
  }

  .content {
    flex: 1;
    padding-right: 10px;
  }

  .items {
    margin: 6px 0 1rem;
    display: flex;
    flex-direction: row;
  }

  .item {
    flex: 1;
    max-width: 20rem;
    margin: 0;

    font-size: 0.8rem;
  }

  .item + .item {
    margin-left: 10px;
  }

  h3 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    padding: 0 0 4px;

    margin: 1rem 0 0;
  }

  .open-link {
    flex: 0;
    flex-basis: 3rem;
    align-self: stretch;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #f8f8f8;
  }

  .open-link:hover {
    background-color: #f0f0f0;
  }
</style>
