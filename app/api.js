import axios from "axios"

export default {
  example: function(flightQuery) {
    return axios({
    method: 'post',
    url: '',
    data:'',
    headers: {'Content-Type': 'application/json'}
    })
  }
}
