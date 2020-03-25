<template lang="pug">
  .gallery
    router-link.back(to='/')  Назад
    .gallery-panel(v-for="(photo,index) in filtid" :key="photo.id")
      router-link(:to='`/photo/${photo.id}`')
      img(:src='thumbUrl(photo.filename)')
</template>

<script>
import photos from "@/photos.json";
export default {
  name: "Gallery",
  data() {
    return {
      photos,
      isScope: true
    };
  },
  computed: {
    filtid() {
      return this.photos.filter(
        element => element.category === parseInt(this.myid)
      );
    }
  },
  props: ["myid"],
  methods: {
    thumbUrl(filename) {
      return require(`../assets/photos/${filename}`);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Marck+Script&display=swap");
.back {
  position: absolute;
  border-radius: 20px;
  width: 10%;
  text-align: center;
  margin-top: 1.5%;
  margin-left: 2%;
  font-size: 200%;
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
  height: 100%;
  background-color: #f0f0f0;
  overflow: auto;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 1rem;
  max-width: 90%;
  padding: 0 5rem;
  padding-top: 5%;
}
.gallery-panel img {
  margin-top: 5%;
  width: 100%;
  object-fit: cover;
  border-radius: 0.75rem;
}
img {
  width: auto;
  height: 80%;
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
  border: 5px solid #484349;
}
img:hover {
  transform: scale(1.05);
  cursor:zoom-in;
}
</style>
