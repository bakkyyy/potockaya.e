<template lang="pug">
  about
    .panel
      .info
        |"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and  equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
      .back
        <router-link to="/" class="bck">Понятно</router-link>
</template>

<style scoped>
.panel {
  position: fixed;
  width: 90%;
  height: 90%;
  background-color: #d3c0cd;
  left: 5%;
  bottom: 5%;
  opacity: 85%;
  border: 3px solid black;
  border-radius: 20px;
}
.info {
  position: absolute;
  width: 90%;
  height: 80%;
  top: 5%;
  left: 5%;
  border: 1px solid red;
}
.back {
  position: absolute;
  bottom: 5%;
  left: 45%;
  width: 10%;
  text-align: center;
  background-color: #222;
  border-radius: 20px;
}
.bck {
  color: white;
  text-decoration: none;
}
.back:hover {
  background-color: #fff;
}
.back:hover .bck {
  color: #000;
}
</style>