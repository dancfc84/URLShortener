const devUrl = '/api'
const prodUrl = "https://t1ny-url.herokuapp.com/api"

const baseUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl

export default baseUrl

