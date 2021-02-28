import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as homeReducer } from './Home/HomeSlice';
import { reducer as likedReducer } from './Liked/LikedSlice';

const rootReducer = combineReducers({
    home: homeReducer,
    liked: likedReducer,
});
const store = configureStore({ reducer: rootReducer });
export default store;