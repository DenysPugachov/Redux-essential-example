import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  { id: "0", name: "Pugachov Denys" },
  { id: "1", name: "Podrez Ievgenia" },
  { id: "2", name: "Polenok Stanislav" },
]

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {}
})

export default usersSlice.reducer