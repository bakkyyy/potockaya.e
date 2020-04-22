<template lang="pug">
	.categories-ctg
		<router-link class="ttl-ctg" :to="{name: 'Gallery', params: {myid: id}}">
			.link-ctg
				.content-ctg
					img.img-ctg(v-bind:src="ctlg.image")
				.title-ctg {{ctlg.title}}
				.price-ctg {{ctlg.price}} 
			</router-link>
</template>

<script>
import Gallery from "@/views/Gallery";
import "@/styles/categories.css";
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
