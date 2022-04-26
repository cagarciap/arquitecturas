<template>
  <div class="app">
    <Header />
    <Cultivos />
  </div>
</template>

<script>
import Cultivos from './components/cutivos.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
    Cultivos,
  },
  data() {
    return {
      values:{
        type:'confirmacion',
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
