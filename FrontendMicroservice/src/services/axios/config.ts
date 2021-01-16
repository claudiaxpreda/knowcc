const getConfig = () => ({
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
  }
})

export default getConfig