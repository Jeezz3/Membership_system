import axios from 'axios'
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import {Form} from '@primevue/forms';
import Select from 'primevue/select';

import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import DatePicker from 'primevue/datepicker';

export default {
  components: {
    Card,
    Button,
    Dialog,
    Form,
    InputNumber,
    InputText,
    Select,
    DatePicker
  },
  data() {
    return {
      schedule: [],
      days: [{'string': 'Monday', 'id': 0, items: []},
            {'string': 'Tuesday', 'id': 1, items: []},
            {'string': 'Wednesday', 'id': 2, items: []},
            {'string': 'Thrusday', 'id': 3, items: []},
            {'string': 'Friday', 'id': 4, items: []},
            {'string': 'Saturday', 'id': 5, items: []},
            {'string': 'Sunday', 'id': 6, items: []}],
      day_options: [
        {name : 'Monday'},
        {name : 'Tuesday'},
        {name : 'Wednesday'},
        {name : 'Thrusday'},
        {name : 'Friday'},
        {name : 'Saturday'},
        {name : 'Sunday'}
      ],
      display_create_dialog: false,
      display_edit_dialog: false,
      create_item_form: {
        name: '',
        day: '',
        time: '',
        max_attendance: ''
      }
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
          console.log(data);
          this.days.forEach(day => day.items = data[day.id]);

          // fix time format
          console.log("fixing time format")
          for(let i = 0; i < this.days.length;i++){
            let data_obj = this.days[i];
            let obj_item_list = data_obj.items
            for(let j = 0; j < obj_item_list.length; j++){
              let item = obj_item_list[j];
              item['time'] = this.string_date_to_time(item['time']);
            }
          }
          console.log("this.days: ", this.days);
        });
      }catch{
        alert("ERROR!");
      };
    },
    create_schedule_item(form_value) {
      console.log(this.create_item_form);
      let input_data = {
        'name' : this.create_item_form.name,
        'days' : this.create_item_form.day,
        'time' : this.formatDate(this.create_item_form.time.date),
        'max_attendance' : 
      }
      const token = localStorage.getItem('access');

    },
    string_date_to_time(string){
      return string.split("T")[1];
    },
    show_create_dialog(){
      this.display_create_dialog = true;
    },
    hide_create_dialog(){
      this.display_create_dialog = false;
    },
    show_edit_dialog(){
      this.display_edit_dialog = true;
    },
    hide_edit_dialog(){
      this.display_edit_dialog = false;
    },
    formatDate(dateObj) {
      if (!dateObj) return null;
      return newDate(dateObj).toISOString();
    }
  }
}

