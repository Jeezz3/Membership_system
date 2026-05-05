import axios from 'axios'

export default {
  data() {
    return { username: '', password: '' }
  },
  methods: {
    async login() {
      const res = await axios.post('http://127.0.0.1:8000/api/token/', {
        username: this.username,
        password: this.password
      })
      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)
      this.$router.push('/admin')
    }
  }
}