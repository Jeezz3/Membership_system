import { createRouter, createWebHistory } from 'vue-router'
import axios from "axios"

import LoginView from '@/components/Front/LoginView.vue'
import AdminView from '@/components/Admin/AdminView.vue'
import AnalyticView from '@/components/Admin/AdminAnalytic.vue'
import MembersView from  '@/components/Admin/AdminMember.vue'
import ScheduleView from '@/components/Admin/AdminSchedule.vue'
import AttendanceView from '@/components/Admin/AdminAttendance.vue'

const routes = [
  { path: '/', name: 'login', component: LoginView},
  { path: '/admin', 
    component: AdminView, 
    meta: { requiresAuth: true },
    children:[
        {path: '', name: 'admin-analytic', component: AnalyticView},
        {path: 'members',name: 'admin-members', component: MembersView},
        {path: 'schedule', name: 'admin-schedule', component: ScheduleView},
        {path: 'attendance',name: 'admin-attendance',component: AttendanceView}
    ]
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('access')
  console.log("to: ",to);
  console.log("from: ",from);
  console.log("next: ",next);
  console.log("requiresAuth: ",to.meta.requiresAuth);
  if (to.meta.requiresAuth) {
    if (!token) {
      next('/')
    } else {
        console.log("got token");
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/me/', {
          headers: { Authorization: `Bearer ${token}` }
        })
        console.log(res);
        if (res.data.is_staff) {
          next()
        } else {
          alert("Not authorized")
          next('/')
        }
      } catch {
        console.log("catch")
        alert("Not authorized")
        next('/')
      }
    }
  } else {
    next()
  }
})

export default router