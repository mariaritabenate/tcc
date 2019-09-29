import axios from 'axios'
import API from '../constants/Config'

export function findAll() {
    return axios.get(`${API.api}/tips`)
}
