<template lang="pug">
  .container
    .title Отзывы о моей работе
    .feedback-button(@click="fdbckClick()" v-if="this.feedbackClick" v-show="checkUser") Написать отзыв
    .feedback-button(@click="fdbckClick()" v-else) Закрыть вкладку
    img.arrow(src="@/assets/arrow.png" v-if="!checkUser")
    .please-registration(v-if="!checkUser") Чтобы оставить отзыв - зарегестрируйтесь
    .feedback-panel
      router-link(to="/" class="back") 
        span Назад
      .feedback-list
        .feedback-item(v-for="feedback in feedbacksFilter.slice().reverse()" :key="feedback.data")
          .uname {{feedback.feedbackname}}
          .user-text-border
            .user-text {{feedback.text}}
          .triangle
          .user-mack(v-for="star in 5")
            img(v-if="feedback.mack < star" src="@/assets/rating_empty.png")
            img(v-if="feedback.mack >= star" src="@/assets/rating_fill.png")
          .user-data {{feedback.data}}
    .feedback-write(:class="feedbackClick? 'feedback-write-off':'feedback-write'")
      form(@submit.prevent="onSubmit")
        .title-name Ваши Имя и Фамилия
        input.name(type="text" v-model="feedbackname"  data-tooltip = "Введите имя и фамилию" :class="{ error: $v.feedbackname.$error }" @blur="$v.feedbackname.$touch()" placeholder="Имя и Фамилия через пробел")
        .title-text Напишите свой отзыв тут:
        textarea.text(v-model="feedbackText" :class="{ error: $v.feedbackText.$error }" placeholder="Отзыв..." @blur="$v.feedbackText.$touch()" @keyup.enter="newFeedback")
        .rating_block(:class="{ error: $v.mack.$error }" @change="$v.mack.$touch()")
          input(name="rating" value="5" id="rating_5" type="radio" v-model="mack")
          label(for="rating_5" class="label_rating")

          input(name="rating" value="4" id="rating_4" type="radio" v-model="mack")
          label(for="rating_4" class="label_rating")

          input(name="rating" value="3" id="rating_3" type="radio" v-model="mack")
          label(for="rating_3" class="label_rating")

          input(name="rating" value="2" id="rating_2" type="radio" v-model="mack")
          label(for="rating_2" class="label_rating")

          input(name="rating" value="1" id="rating_1" type="radio" v-model="mack")
          label(for="rating_1" class="label_rating")
        button.button-write( type="submit" :disabled="submitStatus === 'PENDING'") Оставить отзыв 
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { helpers } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      submitStatus: null,
      feedbackText: "",
      feedbackname: "",
      mack: "",
      data: "",
      feedbackClick: true
    };
  },
  validations: {
    feedbackText: {
      required
    },
    mack: {
      required
    },
    feedbackname: {
      required,
      alpha: val =>
        /(^[А-Я]{1}[а-я]{1,14} [А-Я]{1}[а-я]{1,14}$)|(^[А-Я]{1}[а-я]{1,14} [А-Я]{1}[а-я]{1,14}$)/i.test(
          val
        )
    }
  },
  computed: {
    feedbacksFilter() {
      return this.$store.getters.feedbacks;
    },
    checkUser() {
      return this.$store.getters.checkUser;
    }
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  methods: {
    fdbckClick() {
      this.data = this.getNow();
      if (this.feedbackClick === false) {
        this.feedbackClick = true;
      } else this.feedbackClick = false;
    },
    onSubmit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        console.log("SEND_FEEDBACK");
        this.submitStatus = "PENDING";

        const feedback = {
          feedbackname: this.feedbackname,
          feedbackText: this.feedbackText,
          mack: this.mack,
          completed: false,
          editing: false,
          data: this.data
        };
        this.$store
          .dispatch("newFeedback", feedback)
          .then(() => {
            this.submitStatus = "OK";
            this.feedbackname = "";
            this.feedbackText = "";
            this.mack = "";

            this.$v.$reset();
          })
          .catch(err => {
            this.submitStatus = err.message;
          });
        setTimeout(() => {
          console.log("OK_FEEDBACK");
          this.submitStatus = "OK";
        }, 500);
      }
    },
    getNow() {
      const today = new Date();
      const date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = time + " " + " " + " " + date;
      this.data = dateTime;
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Bellota", cursive;
}
.container {
  width: 100%;
  height: 100vh;
  background-color: white;
}
.feedback-panel {
  background-color: #f0f0f0;
  position: relative;
  top: 15%;
}

.feedback-list {
  width: 80vw;
  height: 60vh;
  position: relative;
  overflow: scroll;
}
.feedback-item {
  position: relative;
  width: 80%;
  border: 3px dashed #484349;
  background-color: #ffff;
  border-radius: 8px;
  margin-top: 3vh;
  margin-left: 5%;
}
.title {
  font-family: "Pacifico", cursive;
  font-size: 250%;
  position: relative;
  text-align: center;
  width: 100%;
  top: 12%;
}
.back {
  border-radius: 20px;
  width: 10%;
  text-align: center;
  margin-top: 1.5%;
  margin-left: 2%;
  font-size: 200%;
  text-decoration: none;
  color: black;
}
.back:hover {
  background-color: black;
  color: white;
  cursor: pointer;
}

.feedback-write {
  position: absolute;
  border: 1px solid black;
  width: 20%;
  height: 48vh;
  float: right;
  top: 25vh;
  right: 3vw;
  background-color: white;
  border-radius: 5px;
}
form {
  position: relative;
  width: 100%;
  height: 40vh;
}
button {
  background-color: #ffff;
  border: none;
  font-size: 2.1vh;
  display: block;
}
.button-write {
  border: 1px solid black;
  border-radius: 20px;
  position: relative;
  text-align: center;
  top: 12%;
  margin: 0 auto;
  width: 45%;
  text-decoration: none;
  color: black;
}
.button-write:hover {
  color: white;
  background-color: #484349;
  cursor: pointer;
}
.feedback-write-off {
  display: none;
}
.text {
  width: 80%;
  height: 60%;
  margin-left: 10%;
  top: 9%;
  resize: none;
  position: relative;
  text-decoration: none;
  color: black;
  border-radius: 5px;
}
.title-text {
  text-align: center;
  position: relative;
  top: 7%;
}
.title-name {
  text-align: center;
  position: relative;
  top: 3%;
}
input.name {
  position: relative;
  width: 80%;
  height: 10%;
  margin-left: 10%;
  top: 5%;
  text-decoration: none;
  color: black;
  border-radius: 5px;
}
.feedback-button {
  border-radius: 20px;
  width: 13vw;
  font-size: 1.5vw;
  text-align: center;
  position: absolute;
  right: 6.5%;
  top: 19%;
}
.please-registration {
  width: 20vw;
  font-size: 1.1vw;
  text-align: center;
  position: absolute;
  right: 6.5%;
  top: 17%;
}
.feedback-button:hover {
  color: white;
  background-color: #484349;
  cursor: pointer;
}
.rating_block {
  position: relative;
  top: 9%;
  margin: 0 auto;
  width: 125px;
  height: 25px;
}
.rating_block input[type="radio"] {
  display: none;
}
.label_rating {
  float: right;
  display: block;
  width: 25px;
  height: 25px;
  background: url(https://simplamarket.com/files/uploads/rating.png) no-repeat
    50% 0;
  cursor: pointer;
}

.rating_block .label_rating:hover, /*Правило для ховера на текущий лейбл*/
.rating_block .label_rating:hover ~ .label_rating, /*Правило для всех следующих лейблов по DOM дереву*/
.rating_block input[type="radio"]:checked ~ .label_rating /*Правило для всех следующих лейблов после выбранного инпута, чтобы звездочки как бы зафиксировались*/
 {
  background-position: 50% -25px;
}

.error {
  border-color: red;
  border: 1px solid red;
}

.errorrating {
  color: red;
  text-align: center;
  border: 1px solid black;
  font-size: 1.5vh;
  position: relative;
}
.uname {
  width: 25%;
  font-size: 3vh;
  position: absolute;
  height: 100%;
  text-align: center;
  margin-top: 1%;
}
.user-text {
  background-color: #f0f0f0;
  width: 90%;
  position: relative;
  margin: 3%;
}
.user-mack {
  position: relative;
  display: inline;
  left: 8%;
}
.user-text-border {
  border: 1px solid #f0f0f0;
  background-color: #f0f0f0;
  border-radius: 5px;
  width: 67%;
  left: 30%;
  margin-top: 2%;
  margin-bottom: 1%;
  position: relative;
}
.triangle {
  position: absolute;
  width: 0px;
  left: 28.3%;
  top: 25%;
  height: 0px;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-right: 1.3vw solid #f0f0f0;;
}
.user-data {
  width: 10vw;
  position: absolute;
  left: 83%;
  bottom: 0px;
}
.arrow {
  position: absolute;
  z-index: 10;
  width: 3vw;
  right: 8vw;
  transform: rotate(310deg);
}
</style>
