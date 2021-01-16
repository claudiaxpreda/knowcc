import axios from 'axios'

const GATEWAY_SERVICE_HOST = process.env.GATEWAY_SERVICE_HOST || 'localhost'

export default axios.create({
  baseURL: `http://${GATEWAY_SERVICE_HOST}:3000`,
  timeout: 2000
})