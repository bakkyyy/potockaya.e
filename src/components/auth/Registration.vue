<template lang="pug">
	.container-reg
		.auth-reg
			.auth_form-reg
				span.title-reg Регистрация
				form.form-reg(@submit.prevent="onSubmit") 
					.form-item-reg(:class="{ errorInput: $v.email.$error }")
						.error-reg(v-if="!$v.email.required") Введите email адрес
						.error-reg(v-if="!$v.email.email") Некорректный Email
						input.input-reg(
							type="email"
							placeholder=" Email"
							v-model="email"
							:class="{error: $v.email.$error}"
							@blur="$v.email.$touch()"
						)
					.form-item-reg(:class="{ errorInput: $v.password.$error }")
						.error-reg(v-if="!$v.password.required") Придумайте пароль
						.error-reg(v-if="!$v.password.minLength") Пароль должен состоять не меньше, чем из 8-ми символов
						input.input-reg(
							type="password"
							placeholder=" Пароль"
							v-model="password"
							:class="{error: $v.password.$error}"
							@blur="$v.password.$touch()"
						)
					.form-item-reg(:class="{ errorInput: $v.repeatPassword.$error }")
						.error-reg(v-if="!$v.repeatPassword.sameAsPassword") Пароли не совпадают
						input.input-reg(
							type="password"
							placeholder=" Повторите пароль"
							v-model="repeatPassword"
							:class="{error: $v.repeatPassword.$error}"
							@blur="$v.repeatPassword.$touch()"
						)
					.button-list-reg
						router-link(to="/" class="link-reg") 
							span.span-reg Закрыть
						button.button-reg.button-primory-reg(
							type="submit"
						) 
							span.span-reg(v-if="loading") Регистрация...
							span.span-reg(v-else) Зарегистрироваться
					.button-info-reg
						p.typo__p-reg(v-if="submitStatus === 'OK'") 
							span.status-reg Спасибо за регистрацию!
						p.typo__p-reg(v-if="submitStatus === 'ERROR'")
							span.status-reg Пожалуйста, введите корректные данные.
						p.typo__p-reg(v-else-if="'The email address is already in use by another account.'=== submitStatus") 
							span.status-reg Этот email уже занят
			.auth_banner-reg
				img.img-reg(src="@/assets/registration_logo.png")

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
import "@/styles/registration.css";
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
        console.log("try registration");
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
