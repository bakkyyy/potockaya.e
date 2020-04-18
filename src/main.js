import Vue from "vue";
import Vuelidate from "vuelidate"
import App from "./App.vue";
import router from "./router";
import store from "./store"

import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

Vue.config.productionTip = false;
Vue.use(Vuelidate)

new Vue({
  router,
  render: h => h(App),
  store,
  created() {
    const firebaseConfig = {
      apiKey: "AIzaSyDstXD3GGO_qxPMcbAk8wEvhFf0sv-S9xs",
      authDomain: "potockaya-photographer74.firebaseapp.com",
      databaseURL: "https://potockaya-photographer74.firebaseio.com",
      projectId: "potockaya-photographer74",
      storageBucket: "potockaya-photographer74.appspot.com",
      messagingSenderId: "370995468442",
      appId: "1:370995468442:web:975938659c3962f1f6e723",
      measurementId: "G-NN6FLG9KXM"
    };

    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('loggedUser', user)
      }
      this.$store.dispatch('loadFeedbacks')
    })
    this.$store.dispatch('loadImages')
  }
}).$mount("#app");