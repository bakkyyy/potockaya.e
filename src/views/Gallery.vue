<template lang="pug">
  .gallery
    router-link.back(to='/')  Назад
    .gallery-panel(v-for="(image,index) in filtid.reverse()" :key="image.id")
      router-link(:to='`/image/${image.id}`')
      img(:src="image.imageUrl")
</template>

<script>
export default {
  name: "Gallery",
  data() {
    return {
      isScope: true,
    };
  },
  props: ["myid"],
  computed: {
    filtid() {
      return this.images.filter((element) => element.category === this.myid);
    },
    images() {
      return this.$store.getters.loadedImages;
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Marck+Script&display=swap");
.back {
  position: absolute;
  border-radius: 20px;
  width: 10vw;
  text-align: center;
  margin-top: 1.5vw;
  margin-left: 2vw;
  font-size: 1.7vw;
  font-family: "Bellota", cursive;
  text-decoration: none;
  color: black;
}
.back:hover {
  background-color: black;
  color: white;
  cursor: pointer;
}

.gallery {
  position: absolute;
  width: 100%;
  height: 73vh;
  background-color: #f0f0f0;
  overflow: auto;
  top: 10vh;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-column-gap: 1rem;
  max-width: 90vw;
  padding: 0 4.5%;
  padding-top: 5%;
}
.gallery-panel img {
  margin-top: 5%;
  width: 100%;
  object-fit: cover;
  border-radius: 0.75rem;
}
img {
  height: 45vw;
}

img:active {
  position: fixed;
  top: 5%;
  bottom: 5%;
  left: 0;
  right: 0;
  z-index: 999;
  display: table-cell;
  vertical-align: middle;
  margin: auto;
  height: 90vh;
  width: auto;
  grid-column-start: 2;
}
img:hover {
  transform: scale(1.05);
  cursor: zoom-in;
}
</style>
