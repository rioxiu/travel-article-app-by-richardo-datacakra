import { createSlice } from "@reduxjs/toolkit"



interface Article {
    title: string,
    description: string,
    cover_image_url: string,
    category: string,
}

interface ArticleState {
    item: Article[],
    loading: boolean,
}


const initialState: ArticleState = {
    item: [],
    loading: false,
}



const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        addArticle(state, action) {
            state.item.push(action.payload)
        }
        , getArticle(state) {
            state.loading = true
        }
    }
})


export const { addArticle } = articleSlice.actions
export default articleSlice.reducer