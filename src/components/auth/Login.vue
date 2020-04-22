<template lang="pug">
	.container-login
		.auth-login
			.auth_form-login
				span.ui-title-2 Вход
				form.form-login(@submit.prevent="onSubmit") 
					.form-item-login(:class="{ errorInput: $v.email.$error }")
						.error-login(v-if="!$v.email.required") Введите email адрес
						.error-login(v-if="!$v.email.email") Некорректный Email
						input.inp-login(
							type="email"
							placeholder=" Email"
							v-model="email"
							:class="{error: $v.email.$error}"
							@blur="$v.email.$touch()"
						)
					.form-item-login(:class="{ errorInput: $v.password.$error }")
						.error-login(v-if="!$v.password.required") Введите пароль
						input.inp-login(
							type="password"
							placeholder=" Пароль"
							v-model="password"
							:class="{error: $v.password.$error}"
							@blur="$v.password.$touch()"
						)
					.button-list-login
						router-link(to="/" class="link-login") 
							span.span-login Закрыть
						button.button-login.button-primory(
							type="submit"
							:disabled="submitStatus === 'PENDING'"
						) 
							span.span-login(v-if="loading") Вход...
							span.span-login(v-else) Войти
					.button-info-login
						p.typo__p(v-if="submitStatus === 'OK'") 
							span.span-login.status Успешно!
						p.typo__p(v-if="submitStatus === 'ERROR'")
							span.span-login.status Неправильный логин или пароль.
						p.typo__p(v-if="submitStatus === 'Too many unsuccessful login attempts. Please try again later.'")
							span.span-login.status Слишком много попыток входа, пожалуйста, повторите попытку позже
						p.typo__p(v-if="'The password is invalid or the user does not have a password.' === submitStatus")
							span.span-login.status Пароль не подходит к этому email адресу
			.auth_banner
				img.banner-img(src="@/assets/registration_logo.png")

</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { helpers } from "vuelidate/lib/validators";
import "@/styles/login.css";
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
