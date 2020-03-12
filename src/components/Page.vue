<template>
  <div class="page">
    <Item v-for="pack in packets" :key="pack" v-bind:pack="pack" />
    
  </div>
</template>

<script>
import Item from "@/components/Item";
export default {
  props: ["packets"],
  components: {
    Item
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.page {
  height: 100%;
  position: relative;
  border-bottom: 5px dotted black;

}

</style>