import axios from "axios"
import env from "./env"

module.exports = {
  birds: function() {
    return axios({
    method: 'get',
    url: env.URL_ROOT + '/birds',
    headers: {'Content-Type': 'application/json'}
    })
  }
}
