<template lang="pug">
	.categories
		<router-link class="ttl" :to="{name: 'Gallery', params: {myid: id}}">
			.link
				.content
					img(v-bind:src="ctlg.image")
				.title {{ctlg.title}}
				.price {{ctlg.price}} 
			</router-link>
</template>

<script>
import Gallery from "@/views/Gallery";
export default {
  name: "Categories",
  props: ["ctlg"],
  components: {
    Gallery
  },
  computed: {
    id() {
      return this.ctlg.id;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap");

.categories {
  width: 27%;
  background-color: #ffff;
  display: inline-block;
  margin: 3%;
  height: 50vh;
  color: black;

  font-size: 130%;

  transition: 0.6s;
}
.link {
  height: 50vh;
}

.categories:hover {
  transform: scale(1.2);
  cursor: pointer;
  background-color: #484349;
}
.categories:hover .ttl {
  color: white;
}
.content {
  width: 90%;
  height: 70%;
  margin: 5%;
}

.title {
  width: 80%;
  margin-left: 5%;
  margin-top: -3%;
  font-family: "Bellota", cursive;
  font-weight: 900;
}
.price {
  margin-right: 5%;
  margin-top: 3%;
  float: right;
}
.ttl {
  text-decoration: none;
  color: black;
  transition: 1s;
}
img {
  object-fit: fill;
  height: 100%;
  width: 100%;
}
</style>
