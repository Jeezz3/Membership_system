import axios from 'axios';
import Button from 'primevue/button';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row'; 
import { FilterMatchMode } from '@primevue/core/api';

import Dialog from 'primevue/dialog';



import { Form } from '@primevue/forms';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import InputNumber from 'primevue/inputnumber';
import RadioButton from 'primevue/radiobutton';
import RadioButtonGroup from 'primevue/radiobuttongroup';
import InputIcon from 'primevue/inputicon';



export default {
  components: {
    Button,
    DataTable,
    Column,
    ColumnGroup,
    Row,
    Dialog,
    Form,
    InputText,
    DatePicker,
    InputNumber,
    RadioButton,
    RadioButtonGroup 
  },
  data() {
    return {
      customers: [],
      add_member_dialog: false,
      filters: {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {value: null, matchMode: FilterMatchMode.STARTS_WITH}
      },
      membership_dialog: false,
      membership_id: null,
      membership_active_until: null,
      membership_remaining: null,
      membership_is_paused: null,
      membership_pause_start_date: null,

    }
  },
  mounted() {
    this.get_member();
  },
  methods: {
    get_member(){
      const token = localStorage.getItem('access');
      try {
        console.log("Get member item");
        let res = axios.get('http://127.0.0.1:8000/api/member_item', 
          {headers: { Authorization: `Bearer ${token}`}}
        );

        res.then((Response) => {

          console.log(Response.data.data);

          let data = Response.data.data;

          for(let i = 0; i < data.length; i++){
            data[i].status = data[i].status ? "active" : "inactive"
            data[i].created_at = data[i].created_at.split('T')[0];
          }
          this.customers = data;
        });
        
      }catch{
        alert("ERROR!")
      }
    },
    create_member(){
      const token = localStorage.getItem('access');
      try {

        const first_name_element = document.getElementById('first_name');
        const last_name_element = document.getElementById('last_name');

        let input_data = {"first_name": first_name_element.value, "last_name": last_name_element.value};

        let res = axios.post('http://127.0.0.1:8000/api/create_member/',
          input_data,
          {headers: { Authorization: `Bearer ${token}`}}
        );
        console.log("Create member done");        
      }catch{
        alert("ERROR!");
      }
      // refresh list
      this.get_member();
    },
    get_membership(requested_user){
      const user_id = requested_user;
      const token = localStorage.getItem('access');
      try{
        let input_data = {"member_id": user_id};

        let res = axios.get('http://127.0.0.1:8000/api/get_membership/' + user_id + '/',
          {headers: { Authorization: `Bearer ${token}`}}
        );

        res.then((resposne) => {
          let data = resposne.data;
          console.log(data);
          this.membership_id = user_id;
          this.membership_active_until = data.active_until;
          this.membership_remaining = data.remaining_sessions;
          this.membership_is_paused = data.is_paused;
          this.membership_pause_start_date = data.pause_start_date;
        })

      }catch{
        alert("ERROR!");
      }



    },
    edit_membership(){
      const token = localStorage.getItem('access');

      let input_data = {
          "active_until": this.formatDate(this.membership_active_until),
          "remaining_sessions": this.membership_remaining,
          "is_paused": this.membership_is_paused
        };

      console.log(input_data)
      try{
        let res = axios.put('http://127.0.0.1:8000/api/edit_membership/' + this.membership_id + '/',
          input_data,
          {headers: { Authorization: `Bearer ${token}`}}
        );
      }catch{
        alert("ERROR!");
      }
    },
    show_add_member_dialog() {
      this.add_member_dialog = true;
    },
    hide_add_member_dialog() {
      this.add_member_dialog = false;
    },
    show_membership_dialog(){
      this.membership_dialog = true;
    },
    hide_membership_dialog(){
      this.membership_dialog = false;
    },
    formatDate(dateObj) {
      if (!dateObj) return null;
      // Convert JS Date → ISO string
      return new Date(dateObj).toISOString();
  }
  }
}