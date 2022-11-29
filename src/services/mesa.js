import { getApiUrl } from './apiConfig'
import axios from 'axios'

export const getAllMesas = ({ setMesaList }) => {
    const mesaUrl = getApiUrl("mesa/getAll")
    axios.get(mesaUrl, { withCredentials: true }).then((response) => {
        setMesaList(response.data)
    })
}

export const updateMesa = ({ mesa }) => {
    console.log(mesa)
    const mesaUpdateUrl = getApiUrl("mesa/update")
    axios.put(mesaUpdateUrl, mesa, { withCredentials: true })  
}

export const getAllHoras = ({ setHoraList }) => {
    const mesaUrl = getApiUrl("horaMesa/getAll")
    axios.get(mesaUrl, { withCredentials: true }).then((response) => {
        setHoraList(response.data)
    })
}

export const updateHora = ({ horaMesa }) => {
    console.log(horaMesa)
    const mesaUpdateUrl = getApiUrl("horaMesa/update")
    axios.put(mesaUpdateUrl, horaMesa, { withCredentials: true })  
}