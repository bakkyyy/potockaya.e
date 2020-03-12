<template lang='pug'>
  #app(v-bind:style="{background: bgColor}")
    Header
    .page
      .maint Катя, которая фотографирует
      .photo1
        img.ph1(src='@/assets/katya.png')
        .text
          | Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio laboriosam earum nesciunt hic at qui?
          | Magnam
          | placeat veniam commodi iure velit magni, aliquid ullam suscipit voluptatem consequatur a non, unde
          | nostrum.
          | Eligendi, facere molestiae non eveniet autem fugiat modi magnam sunt tempore repellendus in animi porro
          | officia numquam impedit odit. Ea deleniti, expedita vero sequi modi qui magnam molestias nulla
          | asperiores
          | impedit dignissimos ab maxime vitae odio dolor, aut facere cupiditate repudiandae minus facilis atque
          | corporis eum? Inventore odio ipsum
    .title
      a(name='photos')
      |Тут делают красивые фотографии:
    Page(v-bind:packets='packets')
    Footer(v-on:chngclr="bgColor = $event ? '#6B6D76' : '#D3C0CD'")
  
</template>

<script>
import Page from "@/components/Page";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
export default {
  name: "App",
  data() {
    return {
      packets: [
        {
          image1: require("@/assets/sess1.jpg"),
          image2: require("@/assets/sess2.jpg"),
          image3: require("@/assets/sess3.jpg"),
          title: "Обычная фотосессия - 1200 р"
        },
        {
          image1: require("@/assets/mir.jpg"),
          image2: require("@/assets/mir2.jpg"),
          image3: require("@/assets/mir3.jpg"),
          title: "В ожидании чуда - 1300 р"
        },
        {
          image1: require("@/assets/dev1.jpg"),
          image2: require("@/assets/dev2.jpg"),
          image3: require("@/assets/dev3.jpg"),
          title: "Девичники - 1500 р"
        },
        {
          image1: require("@/assets/sem.jpg"),
          image2: require("@/assets/sem2.jpg"),
          image3: require("@/assets/sem3.jpg"),
          title: "Семейная фотосессия - 2000 р"
        },
        {
          image1: require("@/assets/sv.jpg"),
          image2: require("@/assets/sv2.jpg"),
          image3: require("@/assets/sv3.jpg"),
          title: "Садебная фотосессия - 1100 р/ч"
        },
        {
          image1: require("@/assets/sem.jpg"),
          image2: require("@/assets/sem2.jpg"),
          image3: require("@/assets/sem3.jpg"),
          title: "Love Story - 1500 р"
        },
        {
          image1: require("@/assets/sem.jpg"),
          image2: require("@/assets/sem2.jpg"),
          image3: require("@/assets/sem3.jpg"),
          title: "Мама + малыш - 1300 р"
        }
      ],
      bgColor: "#D3C0CD"
    };
  },
  components: {
    Page,
    Footer,
    Header
  }
};
</script>

<style scoped>
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);
#app {
  height: 6500px;
  width: 100%;
  position: relative;
}

.page {
  height: 12%;
  position: relative;
  border-bottom: 5px dotted black;
}

.pagelast {
  height: 12%;
  position: relative;
}

.maint {
  font-family: "Pacifico", cursive;
  font-size: xx-large;
  position: absolute;
  left: 35%;
  top: 14%;
}

.photo1 {
  position: absolute;
  top: 19%;
  left: 12%;
  width: 70%;
  font-family: "Bellota", cursive;
  font-size: larger;
}

.text {
  padding-top: 5%;
}

.ph1 {
  width: 65%;
  float: left;
  margin: 7px 7px 7px 0px;
}

.title {
  font-family: "Pacifico", cursive;
  font-size: xx-large;
  position: relative;
  text-align: center;
  width: 100%;
}
</style>
