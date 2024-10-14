
const URL = import.meta.env.VITE_API_URL as string


const loginUser = async (identifier: string, password: string)=>{
    try {
        const response = await fetch(URL + "/auth/local", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ identifier, password }),
        })
       
        if(!response.ok){
            const errorData = await response.json()
            throw new Error(errorData.message)
        }
        return await response.json()
    } catch  {
        // console.error(error)
        throw new Error("An error occurred while trying to login")
    }
}

const registerUser = async (email: string, username: string, password: string)=>{
    try {
        const response = await fetch(URL + "/auth/local/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, username, password }),
        })
            if(!response.ok){
                const errorData = await response.json()
                throw new Error(errorData.message)
            }
            return await response.json()
    } catch (error) {
        console.error(error)
        throw new Error("An error occurred while trying to register")
    }
}



export { loginUser,registerUser }