import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionsButtons'
import { TimeAgo } from './TimeAgo'
import { selectAllPosts } from "./postsSlice"

export const PostsList = () => {
  const posts = useSelector(selectAllPosts)

  //Sort posts in reverse chronological order by date time string
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderPosts = orderedPosts.map(post => (
    <article className="post-excerpt" key={ post.id } >
      <h3>{ post.title }</h3>
      <p className="post-content">{ post.content.substring(0, 100) }</p>
      <Link
        to={ `/posts/${post.id}` }
        className="button muted-button"
      >  View Post
      </Link>
      <hr />
      <PostAuthor userId={ post.user } />
      <TimeAgo timestamp={ post.date } />
      <ReactionButtons post={ post } />
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      { renderPosts }
    </section>
  )
}
