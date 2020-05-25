<script>
  export let name, showSub

  import { DateTime } from 'luxon'

  import { getPost } from '../store/post'
  import { formatLargeNumber } from '../utils'

  let post = getPost(name)

  let postCreateTime

  $: postCreateTime = DateTime.fromSeconds($post.created_utc)
</script>

<div class="container">
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

</div>

<style>
  .container {
    box-shadow: 0px 2px 1px 1px rgba(0, 0, 0, 0.075);
    background-color: white;

    padding: 0.5rem;
    margin: 1rem 0;

    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .points {
    flex: 0;
    flex-basis: 3rem;
    text-align: center;
    padding: 0.5rem;
    padding-left: 0;
    margin: 0;
  }

  .content {
    flex: 1;
  }

  .items {
    margin-top: 6px;
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

    margin: 0;
  }
</style>
