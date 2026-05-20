import axios from 'axios'
import * as yup from 'yup';
import { yupResolver } from '@primevue/forms/resolvers/yup';
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
      day_to_idx: {
        'Monday': 0,
        'Tuesday': 1,
        'Wednesday': 2,
        'Thrusday': 3,
        'Friday': 4,
        'Saturday': 5,
        'Sunday': 6
      },
      display_create_dialog: false,
      display_edit_dialog: false,
      create_item_form: {
        name: '',
        day: '',
        start_time: null,
        end_time: null,
        max_attendance: null
      },
      resolver: yupResolver(
        yup.object({
          name: yup.string().required("Name is required"),
          day: yup.string().required("Day is required"),
          start_time: yup.date().required("Start time is required"),
          end_time: yup.date().required("End time is required"),
          max_attendance: yup.number().min(1, "Must be at least 1").required("Max attendance is required")
        }))
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
              item['start_time'] = this.string_date_to_time(item['start_time']);
              item['end_time'] = this.string_date_to_time(item['end_time']);
            }
          }
          console.log("this.days: ", this.days);
        });
      }catch{
        alert("ERROR!");
      };
    },
    create_schedule_item(event) {
      const values = event.values; // Access validated values from the event object
      console.log("Validated values:", values);

      const input_data = {
        name: values.name,
        days: this.day_to_idx[values.day],
        start_time: this.formatDate(values.start_time), 
        end_time: this.formatDate(values.end_time),     
        max_attendance: values.max_attendance
      };

      console.log("Formatted input data:", input_data);

      // check for overlap
        let day_schedule = this.days.find(day => day.day === input_data.day).items;
        console.log("day_schedule: ", day_schedule);

        for (let i = 0; i < day_schedule.length; i++) {
          let item = day_schedule[i];
          if ((input_data.start_time >= item.start_time && input_data.start_time < item.end_time) ||
              (input_data.end_time > item.start_time && input_data.end_time <= item.end_time) ||
              (input_data.start_time <= item.start_time && input_data.end_time >= item.end_time)) {
            alert("Schedule overlaps with existing schedule!");
            return;
          }
        }


      console.log("Input data to be sent to the backend:", input_data);

      this.hide_create_dialog(); // Hide the dialog after form submission
      // const token = localStorage.getItem('access');

      // try{
      //   let res = axios.post('http://127.0.0.1:8000/api/create_schedule/', input_data,
      //     {headers: { Authorization: `Bearer ${token}`}}
      //   );
      //   res.then((response) => {
      //     console.log(response);
      //     this.get_schedule();
      //   });

      // }catch{
      //   alert("ERROR!");
      // }

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
      return new Date(dateObj).toLocaleString();
    }
  }
}

