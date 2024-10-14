import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit"

import Cookies from "js-cookie"

interface AuthLoginState {
    user: {
        identifier: string,
        password: string
    } | undefined,
    isLogin: boolean
    isLoading: boolean
}

const initialState: AuthLoginState = {
    user: undefined,
    isLoading: true,
    isLogin: false
}




//getuser

export const getUserAction = createAsyncThunk(
    "user/getUser",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/users/me", {
                method: "GET",
                headers: {
                    authorization: `Bearer ${Cookies.get("jwt")}`,
                    "Content-Type": "application/json",
                },
            }
            )
            return await response.json()
        } catch (error) {
            thunkAPI.rejectWithValue(error)
        }
    }
)

//login action with async thunk
export const loginAction = createAsyncThunk(
    "user/loginUser",
    async (data: { identifier: string, password: string }) => {
        const response = await fetch(import.meta.env.VITE_API_URL + "/auth/local", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                identifier: data.identifier,
                password: data.password,
            }),
        })
        return response.json()
    }
)
//register action with async thunk

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.user = {
                identifier: action.payload.identifier,
                password: action.payload.password
            }
            state.isLogin = true
            // localStorage.setItem("jwt", action.payload.jwt)
            Cookies.set("jwt", action.payload.jwt, { expires: 1 })
        },
        logout(state) {
            state.user = undefined
            state.isLogin = false
            Cookies.remove("jwt")
            // localStorage.removeItem("jwt")
        },
        setUser(state, action) {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {
        //login
        builder.addCase(loginAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(loginAction.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoading = false
            state.isLogin = true
        })
        builder.addCase(loginAction.rejected, (state) => {
            state.isLoading = false
        })

        //get user
        builder.addCase(getUserAction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getUserAction.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLogin = true
            state.isLoading = false
        })
        builder.addCase(getUserAction.rejected, (state) => {
            state.isLoading = false
        })
    },
})


export const { login, setUser, logout } = authSlice.actions

export default authSlice.reducer
