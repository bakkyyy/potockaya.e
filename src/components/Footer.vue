<template lang="pug">
    footer(v-bind:style="{background: ftColor}")
      .phone
        | Потоцкая Екатерина +7 (999) 999-99-99
      .theme
        #test.switch
          input#switch.switch-check(type='checkbox' v-on:click="$emit('chngclr', $event.target.checked)") 
          label.switch-label(for='switch')
            | Темная тема
            span.switch-slider.switch-slider-on
            span.switch-slider.switch-slider-off


      .foot
        a(href='https://www.instagram.com/potockaya.e/' target='_blank')
          i.fa.fa-instagram.fa-3x
          p Инстаграм
        a(href='https://vk.com/id117721065' target='_blank')
          i.fa.fa-vk.fa-3x
          p Вконтакте
</template>
<script>
export default {
  el: "#test",
  data: {
    ftColor: "#D3C0CD"
  }
};
</script>
<style scoped>
footer {
  position: absolute;
  height: 70px;
  width: 100%;
  bottom: 0;
  background-color: #987284;
}

.phone {
  font-family: "Bellota", cursive;
  font-size: 120%;
  padding-top: 1.5%;
  padding-left: 3%;
}

.foot {
  width: 50%;
  position: absolute;
  bottom: 13%;
  right: 0;
}
.fa-vk {
  color: #4a76a8;
  padding-left: 5%;
}
.fa-instagram {
  color: #dddd;
  padding-left: 5%;
}
a {
  display: inline-flex;
  text-decoration: none;
  margin-left: 10%;
  color: black;
}
a:hover {
  color: #fff;
}

p {
  font-family: "Bellota", cursive;
  font-size: 140%;
  padding-left: 10%;
  padding-top: 10%;
}
.theme {
  position: absolute;
  left: 40%;
  bottom: 20%;
  font-family: "Bellota", cursive;
  font-size: 140%;
}
.switch:hover label,input {
  color: #fff;
  cursor: pointer;
}
</style>