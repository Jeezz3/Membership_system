import axios from 'axios';
import Button from 'primevue/button';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row'; 
import { FilterMatchMode } from '@primevue/core/api';

import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';


export default {
  components: {
    Button,
    DataTable,
    Column,
    ColumnGroup,
    Row,
    Dialog,
    InputText,
  },
  data() {
    return {
      customers: [],
      add_member_dialog: false,
      filters: {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {value: null, matchMode: FilterMatchMode.STARTS_WITH}
      }
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
    show_add_member_dialog() {
      this.add_member_dialog = true;
    },
    hide_add_member_dialog() {
      this.add_member_dialog = false;
    }
  }
}