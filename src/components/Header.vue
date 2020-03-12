<template lang="pug">
    header
      .head potockaya.e
      .read
        <router-link to="/about" class ='abt'>Обязательно к прочтению</router-link>
        <router-view/>
</template>

<style scoped>
header {
  width: 100%;
  height: 70px;
  background-color: #987284;
  position: fixed;
  z-index: 9;
  opacity: 0.95;
}

.head {
  position: absolute;
  left: 3%;
  font-size: 50px;
  font-family: "Dancing Script", cursive;
}
.read {
  width: 20%;
  height: 80%;
  position: relative;
  top: 30%;
  float: right;
  font-family: "Bellota", cursive;
  font-size: 140%;
  opacity: 1;
}
 .abt {
  text-decoration: none;
  color: black;
} 
.abt:hover {
  cursor: pointer;
  color: white;
}
</style>