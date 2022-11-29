import { getApiUrl } from './apiConfig'
import axios from 'axios'

//Props recibe la data del login
export const submitLogin = (props) => {
    const { loginData, setWrongCredentials, navigate, setOpen } = props
    const loginUrl = getApiUrl('auth/login')
    axios.post(loginUrl, loginData, { withCredentials: true })
        .then(() => {
            navigate('/index', { replace: true })
        }).catch(error => {
            setWrongCredentials({ wrongData: true, infoText: error.response.data.infoMessage })
            setOpen(true)
        })
}
export const submitRegister = (props) => {
    const { registerData, setRegisterData, setWrongData, setOpen } = props
    const registerUrl = getApiUrl('auth/register')
    axios.post(registerUrl, registerData).then(response => {
        setRegisterData({ userName: "", nombre: "", apellido: "", password: "" })
        setWrongData({ status: false, infoText: response.data.infoMessage })
        setOpen(true)
    }).catch(error => {
        setWrongData({ status: true, infoText: error.response.data.infoMessage })
        setOpen(true)
    })
}
export const getUserDetails = ({ setUserRole }) => {
    const userDetailsUrl = getApiUrl('auth/details')
    axios.get(userDetailsUrl, { withCredentials: true }).then(userDetails => {
        setUserRole(userDetails.data.roles)
        const cartCountUrl = getApiUrl(`shoppingList/count/${userDetails.data.id}`)
        axios.get(cartCountUrl, { withCredentials: true }).then(response => {
            localStorage.setItem("number", response.data.toString())
            window.dispatchEvent(new Event('storage'))
        })
    })
}


export const logout = ({ navigate }) => {
    const logoutUrl = getApiUrl('auth/logout')
    axios.get(logoutUrl, { withCredentials: true }).then(() => {
        navigate('/', { replace: true })
    })
}