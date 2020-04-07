<template lang="pug">
    header
      <router-link to="/" class ='link'>
      .head Катя, которая фотографирует
      </router-link>
      .nav
        .registr.button(:class="checkUser?'buttonhide': 'registr.button'")
          router-link(to="/registration" class ='link') 
            span Зарегистрироваться
        .login.button(:class="checkUser?'buttonhide': 'login.button'")
          router-link(to="/login" class ='link')
            span Войти
        .feedback.button(:class="checkUser?'feedback.button': 'buttonhide'")
          router-link(to="/feedback" class ='link')
            span Отзывы
        .read.button
          router-link(to="/read" class ='link')
            span Обязательно к прочтению
        .logout.button(:class="checkUser?'logout.button': 'buttonhide'")
          .link(@click='logout')
            span Выйти
</template>

<script>
import Read from "@/views/Read";
import Registration from "@/components/auth/Registration.vue";
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
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Marck+Script&display=swap");
header {
  width: 100%;
  height: 70px;
  position: fixed;
  z-index: 9;
  opacity: 0.95;
  background-color: #f0f0f0;
}

.head {
  position: absolute;
  left: 3%;
  font-size: 50px;
  font-family: "Marck Script", cursive;
}
.read {
  width: 45%;
  text-align: center;
  position: relative;
  top: 30%;
}
.registr {
  width: 35%;
  text-align: center;
  position: relative;
  top: 30%;
}
.login {
  width: 12%;
  text-align: center;
  position: relative;
  top: 30%;
}
.logout {
  width: 12%;
  text-align: center;
  position: relative;
  top: 30%;
}
.feedback {
  width: 27%;
  text-align: center;
  position: relative;
  top: 30%;
}
.nav {
  width: 40%;
  text-align: center;
  position: relative;
  top: 30%;
  left: -1vw;
  float: right;
  display: flex;
  justify-content: space-between;
}
.link {
  text-decoration: none;
  color: black;
}
span {
  font-family: "Bellota", cursive;
  font-size: 125%;
  opacity: 1;
}
.button:hover {
  cursor: pointer;
  background-color: #484349;
  transition: 0.5s;
}
.button:hover .link {
  color: white;
}
.button {
  border-radius: 20px;
}
.buttonhide {
  display: none;
}
</style>
