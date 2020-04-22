<template lang="pug">
    header
      <router-link to="/" class ='router-link-header'>
      .head-logo Катя, которая фотографирует
      </router-link>
      .nav-header
        .feedback-header.button-header
          router-link(to="/feedback" class ='router-link-header')
            span.sheader Отзывы
        .addimage-header.button-header(:class="!mainUser?'buttonhide': 'addimage-header.button-header'")
          router-link(to="/addimage" class ='router-link-header')
            span.sheader Добавить фото
        .registr-header.button-header(:class="checkUser?'buttonhide': 'registr-header.button-header'")
          router-link(to="/registration" class ='router-link-header') 
            span.sheader Зарегистрироваться
        .login-header.button-header(:class="checkUser?'buttonhide': 'login-header.button-header'")
          router-link(to="/login" class ='router-link-header')
            span.sheader Войти
        .logout-header.button-header(:class="checkUser?'logout-header.button-header': 'buttonhide'")
          .router-link-header(@click='logout')
            span.sheader Выйти
</template>

<script>
import Read from "@/views/Read";
import Registration from "@/components/auth/Registration.vue";
import "@/styles/header.css";
export default {
  components: {
    Read,
    Registration
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/");
    }
  },

  computed: {
    checkUser() {
      return this.$store.getters.checkUser;
    },
    mainUser() {
      return this.$store.getters.mainUser;
    }
  }
};
</script>