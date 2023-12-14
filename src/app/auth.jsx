import axios from "axios"

export const signup = async (req) => {
    try {
        const data = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwrhlv2YPnc-9Vib8dizzf_EOC3Bx89Zw", req)
        return data
    } catch (error) {
        alert("Account creation failed")
    }
}
export const login = async (req) => {
    try {
        const data = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwrhlv2YPnc-9Vib8dizzf_EOC3Bx89Zw", req)
        return data
    } catch (error) {
        alert("Authentication failed")
    }
}
export const reset = async (req) => {
    try {
        await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDwrhlv2YPnc-9Vib8dizzf_EOC3Bx89Zw", req)
        alert("Reset link send")
    } catch (error) {
        alert("failed")
    }
}
