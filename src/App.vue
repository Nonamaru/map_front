<template>
  <!--
  <nav>
    <router-link to="/">User</router-link> |
    <router-link to="/admin">Admin</router-link>
  </nav>
  -->
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
*{
  margin: 0;
  padding: 0;
}
body{
  font-family: 'Roboto', sans-serif;
  background-color: white;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #403439;
}

nav {
  padding: 10px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #403439;
}

nav a.router-link-exact-active {
  color: #a15c7a;
}
</style>
