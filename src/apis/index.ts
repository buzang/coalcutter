import axios from 'axios'

const request = axios.create({
  baseURL: 'http://127.0.0.1:8082/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default request
