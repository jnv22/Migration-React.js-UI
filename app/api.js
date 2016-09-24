import axios from "axios"
import env from "./env"

module.exports = {
  birds: function() {
    return axios({
    method: 'get',
    url: env.URL_ROOT + '/birds',
    headers: {'Content-Type': 'application/json'}
    })
  },
  checkUserLoggedIn: function() {
    return axios({
    method: 'head',
    url: env.URL_ROOT + '/user',
    headers: {'Content-Type': 'application/json'}
    })
  },
  getUser: function() {
    return axios({
    method: 'get',
    url: env.URL_ROOT + '/user',
    headers: {'Content-Type': 'application/json'}
    })
  },
  getLocation: function(city) {
    return axios({
    method: 'get',
    url: env.URL_ROOT + '/location/' + city,
    headers: {'Content-Type': 'application/json'}
    })
  }
}
