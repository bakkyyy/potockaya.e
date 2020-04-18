<template lang="pug">
    header
      <router-link to="/" class ='link'>
      .head(@click="iduser") Катя, которая фотографирует
      </router-link>
      .nav
        .feedback.button
          router-link(to="/feedback" class ='link')
            span Отзывы
        .addimage.button(:class="!mainUser?'buttonhide': 'addimage.button'")
          router-link(to="/addimage" class ='link')
            span Добавить фото
        .registr.button(:class="checkUser?'buttonhide': 'registr.button'")
          router-link(to="/registration" class ='link') 
            span Зарегистрироваться
        .login.button(:class="checkUser?'buttonhide': 'login.button'")
          router-link(to="/login" class ='link')
            span Войти
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
    },
    iduser() {
      console.log(this.mainUser);
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
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Marck+Script&display=swap");
header {
  width: 100%;
  height: 4vw;
  position: fixed;
  z-index: 9;
  opacity: 0.95;
  background-color: #f0f0f0;
}

.head {
  position: absolute;
  left: 3%;
  font-size: 3vw;
  font-family: "Marck Script", cursive;
}
.registr {
  width: 50%;
  text-align: center;
  position: relative;
  top: 30%;
}
.login {
  width: 18%;
  text-align: center;
  position: relative;
  top: 30%;
}
.logout {
  width: 18%;
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
.addimage {
  width: 40%;
  text-align: center;
  position: relative;
}
.nav {
  width: 30%;
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
  font-size: 1.1vw;
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
