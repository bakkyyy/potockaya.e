<template lang="pug">
	.container
		.auth 
			.auth_form
				span.ui-title-2 Вход
				form(@submit.prevent="onSubmit") 
					.form-item(:class="{ errorInput: $v.email.$error }")
						.error(v-if="!$v.email.required") Введите email адрес
						.error(v-if="!$v.email.email") Некорректный Email
						input(
							type="email"
							placeholder=" Email"
							v-model="email"
							:class="{error: $v.email.$error}"
							@blur="$v.email.$touch()"
						)
					.form-item(:class="{ errorInput: $v.password.$error }")
						.error(v-if="!$v.password.required") Введите пароль
						input(
							type="password"
							placeholder=" Пароль"
							v-model="password"
							:class="{error: $v.password.$error}"
							@blur="$v.password.$touch()"
						)
					.button-list
						router-link(to="/" class="link") 
							span Закрыть
						button.button.button-primory(
							type="submit"
							:disabled="submitStatus === 'PENDING'"
						) 
							span(v-if="loading") Вход...
							span(v-else) Войти
					.button-info
						p.typo__p(v-if="submitStatus === 'OK'") 
							span.status Успешно!
						p.typo__p(v-if="submitStatus === 'ERROR'")
							span.status Неправильный логин или пароль.
						p.typo__p(v-if="submitStatus === 'Too many unsuccessful login attempts. Please try again later.'")
							span.status Слишком много попыток входа, пожалуйста, повторите попытку позже
						p.typo__p(v-if="'The password is invalid or the user does not have a password.' === submitStatus")
							span.status Пароль не подходит к этому email адресу
			.auth_banner
				img(src="@/assets/registration_logo.png")

</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { helpers } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      password: "",
      submitStatus: null
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        console.log("try login");
        const user = {
          email: this.email,
          password: this.password
        };
        this.$store
          .dispatch("loginUser", user)
          .then(() => {
            console.log("LOGIN!");
            this.submitStatus = "OK";
            this.$router.push("/");
          })
          .catch(err => {
            this.submitStatus = err.message;
          });
      }
    }
  }
};
</script>

<style scoped>
.container {
  position: absolute;
  top: 10%;
  margin-left: 5%;
  width: 90%;
  height: 80%;
  background-color: #f0f0f0;
}
img {
  width: 60%;
  float: right;
  margin: 6%;
}
.auth {
  display: flex;
  height: 90%;
}
.auth_form {
  width: 50%;
}
.form-item {
  width: 100%;
}
form {
  width: 100%;
  margin-left: 10%;
  margin-top: 5%;
}
input {
  width: 90%;
  height: 2.5vw;
  margin-bottom: 10%;
  border-radius: 10px;
  font-family: "Bellota", cursive;
  font-size: 1vw;
  opacity: 1;
}
input.error {
  border-color: red;
}
span {
  font-family: "Bellota", cursive;
  font-size: 1.5vw;
  opacity: 1;
}
.error {
  font-family: "Bellota", cursive;
  font-size: 1.2vw;
  opacity: 1;
}
.link {
  text-decoration: none;
  color: black;
  border-radius: 20px;
  width: 8vw;
  text-align: center;
}
.ui-title-2 {
  font-size: 3vw;
  position: relative;
  left: 40%;
  font-weight: 900;
}

.link:hover {
  color: white;
  background-color: #484349;
}

.form-item .error {
  display: none;
}
.form-item.errorInput .error {
  display: block;
  color: red;
}
.button-list {
  position: absolute;
  left: 5vw;
  bottom: 1.5vw;
  width: 30%;
  display: flex;
  justify-content: space-between;
}
button {
  background-color: #f0f0f0;
  padding: 0;
  border: none;
  border-radius: 20px;
  width: 7vw;
}
button:hover {
  color: white;
  background-color: #484349;
  cursor: pointer;
}
.button-info {
  width: 30vw;
  position: absolute;
  bottom: 7vw;
  font-weight: 700;
  left: 3.5vw;
  text-align: center;
}
.status {
  font-size: 1.2vw;
}
</style>
