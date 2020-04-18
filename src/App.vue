<template lang="pug">
  #app
    Header
    <router-link to="/"></router-link>
    <router-view />
    <router-view name='R' class="Regist"></router-view>
    <router-view name='L' class="Regist"></router-view>
    <router-view name='I' class="Regist"></router-view>
    Footer
</template>

<script>
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/views/Main";

export default {
  name: "App",
  components: {
    Footer,
    Header,
    Main
  }
};
</script>

<style>
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);
* {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
#app {
  max-height: 125vw;
  height: 50vw;
  width: 100%;
  position: relative;
  background-color: #ffff;
}
</style>
