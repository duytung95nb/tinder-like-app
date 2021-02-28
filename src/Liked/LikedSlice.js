import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    likedUsers: []
 };

 const slice = createSlice({
   name: 'liked',
   initialState: initialState,
   reducers: {
      liked: (state, action) => {
        state.likedUsers = [...state.likedUsers, action.payload];
      },
      removeFromLiked: (state, action) => {
        state.likedUsers = state.likedUsers.filter(u => u.id !== action.payload);
      }
   },
 });
 export const { reducer, actions } = slice;