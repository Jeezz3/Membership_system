<template>
  <div class="admin-dashboard">
    <div class="admin-header">
        <h2>Admin Dashboard</h2>
    </div>
    <div class="admin-menu">
        <AdminMenu />
    </div>

    <div class="admin-content">
        <router-view /> <!-- child routes render here -->
    </div>  

    <div class="admin-footer"></div>
  </div>
</template>

<script src="@/scripts/Admin/AdminView.js" />

<style src="@/css/Admin/AdminView.css" />
