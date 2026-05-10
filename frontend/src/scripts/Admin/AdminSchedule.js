import axios from 'axios'

export default {
  data() {
    return {
      schedule: [],
    }
  },
  mounted() {
    console.log("schedule");
    this.get_schedule();
  },
  methods: {
    get_schedule() {
      const token = localStorage.getItem('access');
      try{
        const res = axios.get('http://127.0.0.1:8000/api/get_all_schedule/',
          {headers: { Authorization: `Bearer ${token}`}}
        );

        res.then((response) => {
          let data = response.data.data;
          console.log("data:",data);
          for(let i = 0; i < data.length; i++){
            this.schedule.push(data[i]);
          }

          console.log("this.schedule: ", this.schedule);

        });
      }catch{
        alert("ERROR!");
      };
    },
    create_schedule_item() {
      const token = localStorage.getItem('access');
      try{
        const res = axios.get('http://127.0.0.1:8000/api/get_all_schedule/',
          {headers: { Authorization: `Bearer ${token}`}}
        );

      }catch{
        alert("ERROR!");
      }
    }



  }
}

