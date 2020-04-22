<template lang="pug">
  .gallery-glr
    router-link.back-glr(to='/')  Назад
    .gallery-panel-glr(v-for="(image,index) in filtid.reverse()" :key="image.id")
      router-link.back-glr(:to='`/image/${image.id}`')
      img.img-glr(:src="image.imageUrl")
</template>

<script>
import "@/styles/gallery.css";
export default {
  name: "Gallery",
  data() {
    return {
      isScope: true
    };
  },
  props: ["myid"],
  computed: {
    filtid() {
      return this.images.filter(element => element.category === this.myid);
    },
    images() {
      return this.$store.getters.loadedImages;
    }
  }
};
</script>
