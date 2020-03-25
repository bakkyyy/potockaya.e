<template lang="pug">
  #app
    Header
    .title Тут делают красивые фотографии
    .container
      Categories(v-for="(catalog,index) in catalogs" :key="catalog.id" v-bind:ctlg="catalog" v-bind:photoid="catalogs[index].id")
      <router-view></router-view>
    Footer
</template>

<script>
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Categories from "@/views/Categories";
import Gallery from "@/views/Gallery";

export default {
  name: "App",
  data() {
    return {
      catalogs: [
        {
          id: "0",
          image: require("@/assets/photosession_preview.jpg"),
          title: "Прогулочная фотосессия",
          price: "1200 p"
        },
        {
          id: "1",
          image: require("@/assets/waiting_for_a_miracle_preview.jpg"),
          title: "В ожидании чуда",
          price: "1500 p"
        },
        {
          id: "2",
          image: require("@/assets/hen_party_preview.jpg"),
          title: "Девичники",
          price: "1500 p"
        },
        {
          id: "3",
          image: require("@/assets/family_photo_shoot_preview.jpg"),
          title: "Семейная фотосессия",
          price: "2000 p"
        },
        {
          id: "4",
          image: require("@/assets/wedding_photo_shoot_preview.jpg"),
          title: "Свадьба",
          price: "1100 p"
        },
        {
          id: "5",
          image: require("@/assets/love_story_preview.jpg"),
          title: "Love story",
          price: "1500 p"
        },
        {
          id: "6",
          image: require("@/assets/mother_baby_preview.jpg"),
          title: "Мама + Малыш",
          price: "1300 p"
        },
        {
          id: "7",
          image: require("@/assets/reportage_shooting_preview.jpg"),
          title: "Репортажная съемка",
          price: "1500 p"
        },
        {
          id: "8",
          image: require("@/assets/gift_preview.jpg"),
          title: "Подарочные сертификаты",
          price: "1000 p"
        }
      ],
      count: 0
    };
  },
  components: {
    Footer,
    Header,
    Categories,
    Gallery
  }
};
</script>

<style>
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);
* {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
#app {
  height: 1900px;
  width: 100%;
  position: relative;
  background-color: #ffff;
}

.title {
  font-family: "Pacifico", cursive;
  font-size: 250%;
  position: relative;
  text-align: center;
  width: 100%;
  top: 10%;
}

.container {
  width: 100%;
  background-color: #f0f0f0;
  position: relative;
  top: 15%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
