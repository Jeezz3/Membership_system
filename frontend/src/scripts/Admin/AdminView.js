import axios from 'axios'

export default {
  data() {
    return { items: [] }
  },
  async mounted() {
    const token = localStorage.getItem('access')
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/me/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      this.items = res.data
    } catch {
      alert("You are not authorized to view items")
      this.$router.push('/')
    }
  }
}