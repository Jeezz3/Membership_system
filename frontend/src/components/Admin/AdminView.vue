<template>
  <div>
    <h2>Admin Dashboard</h2>
    <nav>
      <router-link to="/admin">Analytic</router-link> |
      <router-link to="/admin/members">Members</router-link> |
      <router-link to="/admin/schedule">Schedule</router-link> |
      <router-link to="/admin/attendance">Attendance</router-link>
    </nav>
    <router-view /> <!-- child routes render here -->
  </div>
</template>

<script src="@/scripts/Admin/AdminView.js" />
