import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

interface Comment {
    content: string
    documentId: string
}

interface CommentState {
    item: Comment[],
}

const initialState: CommentState = {
    item: [],
}
export const postComment = createAsyncThunk(
    'comments/postComment',
    async ({ content, documentId }: Comment) => {
        const response = await fetch(import.meta.env.VITE_API_URL + '/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: {
                    "content": content,
                    "documentId": documentId
                }
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to post comment');
        }
        return await response.json();
    }
);


const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        addComment(state, action) {
            state.item.push(action.payload)
        }
    }
})

export const { addComment } = commentSlice.actions
export default commentSlice.reducer