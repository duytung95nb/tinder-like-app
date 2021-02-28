import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    page: 0,
    users: [],
    currentUserIndex: 0,
    userIdToDetailMap: {},
 };

 const slice = createSlice({
   name: 'home',
   initialState: initialState,
   reducers: {
      setUsers: (state, action) => {
        state.users = [...state.users, ...action.payload];
      },
      setPage: (state, action) => {
        state.page = action.payload;
      },
      setUserToNext: (state) => {
        if(state.currentUserIndex === state.users.length - 1) { return; }
        state.currentUserIndex = state.currentUserIndex + 1;
      },
      setUserIdToDetailMap: (state, action) => {
        state.userIdToDetailMap[action.payload.id] = action.payload;
      },
      dislikeUser: () => { },
      likeUser: () => { },
   },
 });
 export const { reducer, actions } = slice;