import { createSlice } from "@reduxjs/toolkit"


interface RegisterState {
    user: {
        username: string
        email: string
        password: string
    } | null,
    isRegister: boolean
}


const initialState: RegisterState = {
    user: null,
    isRegister: false
}


const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        register(state, action) {
            state.user = action.payload
            state.isRegister = true
        },
    }
})


export const { register } = registerSlice.actions
export default registerSlice.reducer