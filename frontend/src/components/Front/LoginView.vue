<template>
  <div>
    <h2>Admin Login</h2>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
  </div>
</template>

<script src="@/scripts/Front/login.js"/>

