import { createSlice, nanoid } from "@reduxjs/toolkit"
import { sub } from "date-fns"


const initialState = [
  { id: "1", title: "First Post!", content: "Hello!", date: sub(new Date(), { minutes: 10 }).toISOString() },
  { id: "2", title: "Second Post!", content: "More Text", date: sub(new Date(), { minutes: 5 }).toISOString() },
]

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      // "prepare callback" function can take multiple arguments, generate random values like unique IDs, and run whatever other synchronous logic is needed to decide what values go into the action object. It should then return an object with the payload field inside.
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
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

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer
