<template lang="pug">
    footer
      .phone
        | Потоцкая Екатерина +7 (999) 999-99-99
      .theme
      .foot
        a(href='https://www.instagram.com/potockaya.e/' target='_blank')
          i.fa.fa-instagram.fa-3x
          p Инстаграм
        a(href='https://vk.com/id117721065' target='_blank')
          i.fa.fa-vk.fa-3x
          p Вконтакте
</template>
<style scoped>
footer {
  position: fixed;
  height: 70px;
  width: 100%;
  bottom: 0;
  background-color: #f0f0f0;
}

.phone {
  font-family: "Bellota", cursive;
  font-size: 1vw;
  padding-top: 3vh;
  padding-left: 3vw;
}

.foot {
  width: 35vw;
  position: absolute;
  bottom: 1vh;
  right: 0;
}
.fa-vk {
  color: #4a76a8;
  padding-left: 1vw;
}
.fa-instagram {
  color: rgba(219, 109, 35, 0.867);
  padding-left: 1vw;
}
a {
  display: inline-flex;
  text-decoration: none;
  margin-left: 3vw;
  color: black;
  width: 12vw;
  border-radius: 20px;
  transition: 0.5s;
}
a:hover {
  color: #fff;
  background-color: #484349;
}

p {
  font-family: "Bellota", cursive;
  font-size: 1.2vw;
  padding-left: 1vw;
  position: relative;
  margin-top: 0.5vw;
}
</style>