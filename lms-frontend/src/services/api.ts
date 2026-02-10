import axios, { type InternalAxiosRequestConfig } from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('lms_token')

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }

  return config
})
