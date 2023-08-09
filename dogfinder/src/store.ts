import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./features/filter/filterSlice";
import matchReducer from "./features/match/matchSlice";
import dogReducer from "./features/dog/dogSlice";
import authReducer from "./features/auth/authSlice";
import nextReducer from "./features/pages/next";

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        match: matchReducer,
        dog: dogReducer,
        auth: authReducer,
        pages: nextReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch