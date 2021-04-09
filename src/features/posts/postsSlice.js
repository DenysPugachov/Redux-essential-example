import { createSlice, nanoid } from "@reduxjs/toolkit"
import { sub } from "date-fns"


const initialState = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
  },
  {
    id: "2",
    title: "Second Post!",
    content: "More Text",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
  },
]

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reactionName } = action.payload
      const existingPost = state.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reactionName]++
      }
    },
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      // prepare callback" returns the action payload
      // random values should be put in the action, not calculated in the reducer
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
          }
        }
      }
    },
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

//selector for PostList.js
export const selectAllPosts = state => state.posts

//selector for SinglePostPage.js & EditPostForm.js
export const selectPostById = (state, postId) => state.posts.find(post => post.id === postId)