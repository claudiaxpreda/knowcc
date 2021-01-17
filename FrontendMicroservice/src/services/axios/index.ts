import axios from 'axios'

const GATEWAY_SERVICE_HOST = process.env.REACT_APP_GATEWAY_SERVICE_HOST || 'localhost'
console.log(process.env.REACT_APP_GATEWAY_SERVICE_HOST)

export default axios.create({
  baseURL: `http://${GATEWAY_SERVICE_HOST}:3000`,
  timeout: 2000
})