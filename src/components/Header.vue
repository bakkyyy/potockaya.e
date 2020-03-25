<template lang="pug">
    header
      .head Катя, которая фотографирует
      .read
        <router-link to="/read" class ='mustread'>Обязательно к прочтению</router-link>
</template>

<script>
import Read from '@/views/Read'
export default {
  components: {
    Read
  }
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Marck+Script&display=swap");
header {
  width: 100%;
  height: 70px;
  position: fixed;
  z-index: 9;
  opacity: 0.95;
  background-color: #f0f0f0;
}

.head {
  position: absolute;
  left: 3%;
  font-size: 50px;
  font-family: 'Marck Script', cursive;
}
.read {
  width: 20%;
  text-align: center;
  position: relative;
  top: 30%;
  float: right;
  font-family: "Bellota", cursive;
  font-size: 140%;
  opacity: 1;

  border-radius: 20px;
}
.mustread {
  text-decoration: none;
  color: black;
}
.read:hover {
  cursor: pointer;
  background-color: #484349;
  transition: 0.5s;
}
.read:hover .mustread {
  color: white;
}
</style>