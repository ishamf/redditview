<script>
  export let name

  import { getPost } from '../store/post'

  let post = getPost(name)

  let title

  $: title = $post && $post.title
</script>

<h1>{title}</h1>
