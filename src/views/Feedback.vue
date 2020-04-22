<template lang="pug">
  .container
    .title Отзывы о моей работе
    .feedback-button(@click="fdbckClick()" v-if="this.feedbackClick" v-show="checkUser") Написать отзыв
    .feedback-button(@click="fdbckClick()" v-else) Закрыть вкладку
    img.arrow(src="@/assets/arrow.png" v-if="!checkUser")
    .please-registration(v-if="!checkUser") Чтобы оставить отзыв - зарегестрируйтесь
    .feedback-panel
      router-link(to="/" class="back-img") 
        span Назад
      .allMack 
        .sort-panel
          .all.sort(@click="filterFeedback='ALL'") Все отзывы
          .my.sort(@click="filterFeedback='MY'") Мои отзывы
          .up.sort(@click="filterFeedback='UP'") По возрастанию
          .down.sort(@click="filterFeedback='DOWN'") По убыванию
        .mack-panel
          .avgmack Средняя оценка пользователей - {{this.avgMack}}
          img.star(src="@/assets/rating_fill.png")
      .feedback-list
        .feedback-item(v-for="feedback in paginatedData" :key="feedback.data")
          .uname {{feedback.feedbackname}}
          .user-text-border
            .user-text {{feedback.text}} 
          .triangle
          .user-mack(v-for="star in 5")
            img.star(v-if="feedback.mack < star" src="@/assets/rating_empty.png")
            img.star(v-if="feedback.mack >= star" src="@/assets/rating_fill.png")
          .user-data {{feedback.data}}
    .button-next
      .pagenumber {{this.pageNumber + 1}} / {{this.pageCount}}
      button.button-fdb.next(@click="nextPage" :disabled="pageNumber >= pageCount-1") Следующая страница
      button.button-fdb.next(@click="prevPage" :disabled="pageNumber===0") Предыдущая страница
    .feedback-write(:class="feedbackClick? 'feedback-write-off':'feedback-write'")
      form(@submit.prevent="onSubmit")
        .title-name Ваши Имя и Фамилия
        input.input-fdb.name(type="text" v-model="feedbackname"  data-tooltip = "Введите имя и фамилию" :class="{ error: $v.feedbackname.$error }" @blur="$v.feedbackname.$touch()" placeholder="Имя и Фамилия через пробел")
        .title-text Напишите свой отзыв тут:
        textarea.text-fdb(v-model="feedbackText" :class="{ error: $v.feedbackText.$error }" placeholder="Отзыв..." @blur="$v.feedbackText.$touch()" @keyup.enter="newFeedback")
        .rating_block(:class="{ error: $v.mack.$error }" @change="$v.mack.$touch()")
          input.input-fdb(name="rating" value="5" id="rating_5" type="radio" v-model="mack")
          label.label-fdb(for="rating_5" class="label_rating")

          input.input-fdb(name="rating" value="4" id="rating_4" type="radio" v-model="mack")
          label.label-fdb(for="rating_4" class="label_rating")

          input.input-fdb(name="rating" value="3" id="rating_3" type="radio" v-model="mack")
          label.label-fdb(for="rating_3" class="label_rating")

          input.input-fdb(name="rating" value="2" id="rating_2" type="radio" v-model="mack")
          label.label-fdb(for="rating_2" class="label_rating")

          input.input-fdb(name="rating" value="1" id="rating_1" type="radio" v-model="mack")
          label.label-fdb(for="rating_1" class="label_rating")
        button.button-fdb.button-write( type="submit" :disabled="submitStatus === 'PENDING'") Оставить отзыв 
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { helpers } from "vuelidate/lib/validators";
import "@/styles/feedback.css";
export default {
  data() {
    return {
      submitStatus: null,
      feedbackText: "",
      feedbackname: "",
      mack: "",
      data: "",
      feedbackClick: true,
      pageNumber: 0,
      avgMack: 0,
      filterFeedback: "ALL"
    };
  },
  props: {
    size: {
      type: Number,
      required: false,
      default: 3
    }
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
      if (this.filterFeedback === "ALL") {
        return this.$store.getters.feedbacks;
      }
      if (this.filterFeedback === "MY") {
        return this.$store.getters.myfeedback;
      }
      if (this.filterFeedback === "UP") {
        return this.$store.getters.feedbacksup;
      }
      if (this.filterFeedback === "DOWN") {
        return this.$store.getters.feedbacksdown;
      }
    },
    checkUser() {
      return this.$store.getters.checkUser;
    },
    pageCount() {
      let l = this.feedbacksFilter.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.feedbacksFilter
        .slice()
        .reverse()
        .slice(start, end);
    }
  },
  created() {
    setInterval(this.getNow, 1000);
    setInterval(this.allMack, 1000);
  },
  methods: {
    allMack() {
      let avgmack = 0;
      let count = 0;
      this.$store.getters.feedbacks.forEach(element => {
        avgmack += +element.mack;
        count++;
      });
      this.avgMack = (avgmack / count).toFixed(1);
    },
    fdbckClick() {
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
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    }
  }
};
</script>
