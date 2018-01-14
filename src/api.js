import axios from "axios"

const api = {
  birds: function() {
    return axios({
    method: 'get',
    url: process.env.REACT_APP_URL_ROOT + '/birds',
    headers: {'Content-Type': 'application/json'}
    })
  },
  checkUserLoggedIn: function() {
    return axios({
    method: 'head',
    url: process.env.REACT_APP_URL_ROOT + '/user',
    withCredentials: true,
    headers: {'Content-Type': 'application/json'}
    })
  },
  getUser: function() {
    return axios({
    method: 'get',
    url: process.env.REACT_APP_URL_ROOT + '/user',
    withCredentials: true,
    headers: {'Content-Type': 'application/json'}
    })
  },
  getLocation: function(city) {
    return axios({
    method: 'get',
    url: process.env.REACT_APP_URL_ROOT + '/location/' + city,
    headers: {'Content-Type': 'application/json'}
    })
  },
  saveBird: function(data) {
    return axios({
      method: 'post',
      url: process.env.REACT_APP_URL_ROOT + '/birds',
      data: data,
      withCredentials: true,
      headers: {'Content-Type': 'application/json'}
    })
  },
  signOut: function() {
    return axios({
    method: 'get',
    url: process.env.REACT_APP_URL_ROOT + '/logout',
    headers: {'Content-Type': 'application/json'}
    })
  }
}

export default api;
