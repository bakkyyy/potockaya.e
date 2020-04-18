<template lang="pug">
	.container
		.auth 
			.auth_form
				span.ui-title-2 Регистрация
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
						.error(v-if="!$v.password.required") Придумайте пароль
						.error(v-if="!$v.password.minLength") Пароль должен состоять не меньше, чем из 8-ми символов
						input(
							type="password"
							placeholder=" Пароль"
							v-model="password"
							:class="{error: $v.password.$error}"
							@blur="$v.password.$touch()"
						)
					.form-item(:class="{ errorInput: $v.repeatPassword.$error }")
						.error(v-if="!$v.repeatPassword.sameAsPassword") Пароли не совпадают
						input(
							type="password"
							placeholder=" Повторите пароль"
							v-model="repeatPassword"
							:class="{error: $v.repeatPassword.$error}"
							@blur="$v.repeatPassword.$touch()"
						)
					.button-list
						router-link(to="/" class="link") 
							span Закрыть
						button.button.button-primory(
							type="submit"
						) 
							span(v-if="loading") Регистрация...
							span(v-else) Зарегистрироваться
					.button-info
						p.typo__p(v-if="submitStatus === 'OK'") 
							span.status Спасибо за регистрацию!
						p.typo__p(v-if="submitStatus === 'ERROR'")
							span.status Пожалуйста, введите корректные данные.
						p.typo__p(v-else-if="'The email address is already in use by another account.'=== submitStatus") 
							span.status Этот email уже занят
			.auth_banner
				img(src="@/assets/registration_logo.png")

</template>

<script>
import {
  required,
  email,
  minLength,
  sameAs,
  alpha
} from "vuelidate/lib/validators";
import { helpers } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
      submitStatus: null
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    },
    repeatPassword: {
      sameAsPassword: sameAs("password")
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        console.log("submit!");
        const user = {
          email: this.email,
          password: this.password
        };
        this.$store
          .dispatch("registerUser", user)
          .then(() => {
            console.log("REGISTER!");
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
  margin-bottom: 5%;
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
  font-size: 1vw;
  opacity: 1;
}
.link {
  text-decoration: none;
  color: black;
  border-radius: 20px;
  width: 30%;
  text-align: center;
}
.ui-title-2 {
  font-size: 2.5vw;
  position: relative;
  left: 30%;
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
}
.button.button-primory {
  width: 60%;
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
  font-size: 1.1vw;
}
</style>
