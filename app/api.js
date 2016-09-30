import axios from "axios"
import env from "./env"

module.exports = {
  birds: function() {
    return axios({
    method: 'get',
    url: env.URL_ROOT + '/api/birds',
    headers: {'Content-Type': 'application/json'}
    })
  },
  checkUserLoggedIn: function() {
    return axios({
    method: 'head',
    url: env.URL_ROOT + '/api/user',
    withCredentials: true,
    headers: {'Content-Type': 'application/json'}
    })
  },
  getUser: function() {
    return axios({
    method: 'get',
    url: env.URL_ROOT + '/api/user',
    withCredentials: true,
    headers: {'Content-Type': 'application/json'}
    })
  },
  getLocation: function(city) {
    return axios({
    method: 'get',
    url: env.URL_ROOT + '/api/location/' + city,
    headers: {'Content-Type': 'application/json'}
    })
  },
  saveBird: function(data) {
    return axios({
      method: 'post',
      url: env.URL_ROOT + '/api/birds',
      data: data,
      withCredentials: true,
      headers: {'Content-Type': 'application/json'}
    })
  },
  signOut: function() {
    return axios({
    method: 'get',
    url: env.URL_ROOT + '/api/logout',
    headers: {'Content-Type': 'application/json'}
    })
  }
}
