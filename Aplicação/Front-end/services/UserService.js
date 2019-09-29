import axios from 'axios'
import API from '../constants/Config'

export function auth(email, password) {
    return axios.post(`${API.api}/auth`, { email, password })
}

export function update(user) {
    return axios.put(`${API.api}/user`, { ...user })
}

export function create(fullName, email, password, confirmPassword) {
    return axios.post(`${API.api}/user`, { fullName, email, password, confirmPassword })
}

export function getCalendar(userId) {
    return axios.get(`${API.api}/user/calendar`, { params: { userId } })
}

