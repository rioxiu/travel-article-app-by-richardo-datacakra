import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducer/authLoginReducer'
import registerReducer from '../reducer/registerReducer'
import articleReducer from '../reducer/articleReducer'
import commentReducer from '../reducer/commentReducer'
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        auth: authReducer,

        register: registerReducer,
        article: articleReducer,
        comment: commentReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),

})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();