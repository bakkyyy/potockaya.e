<template>
  <div class="page">
    <div class="minititle">{{pack.title}}</div>
    <div class="tab">
      <table>
        <tr>
          <td>
            <img v-bind:src="pack.image1" />
          </td>
          <td>
            <img v-bind:src="pack.image2" />
          </td>
          <td>
            <img v-bind:src="pack.image3" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pack: {}
  }
};
</script>

<style scoped>
.minititle {
  font-family: "Bellota", cursive;
  font-size: xx-large;
  position: absolute;
  top: 6%;
  text-align: center;
  width: 100%;
}

.tab {
  position: absolute;
  top: 15%;
  left: 6%;
}
img {
  width: 80%;
}
</style>