<template>
  <router-view class="mainDiv" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.mainDiv {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
button {
  padding: 10px 20px;
    font-size: 20px;
    background-color: #41B883;
    border: none;
    color: white;
    border-radius: 5px;
    margin: 10px;
     cursor: pointer;
}
</style>
