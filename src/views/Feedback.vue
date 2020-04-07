<template lang="pug">
	.container
		.title Отзывы о моей работе
		.feedback-button(@click="fdbckClick()" v-if="this.feedbackClick") Написать отзыв
		.feedback-button(@click="fdbckClick()" v-else) Закрыть вкладку
		.feedback-panel
			router-link(to="/" class="back") 
				span Назад
		.feedback-write(:class="feedbackClick? 'feedback-write-off':'feedback-write'")
			.title-text Напишите свой отзыв тут:
			textarea.text
			.rating_block
				input(name="rating" value="5" id="rating_5" type="radio")
				label(for="rating_5" class="label_rating")
				
				input(name="rating" value="4" id="rating_4" type="radio")
				label(for="rating_4" class="label_rating")
				
				input(name="rating" value="3" id="rating_3" type="radio")
				label(for="rating_3" class="label_rating")
				
				input(name="rating" value="2" id="rating_2" type="radio")
				label(for="rating_2" class="label_rating")
				
				input(name="rating" value="1" id="rating_1" type="radio")
				label(for="rating_1" class="label_rating")
			.button-write Оставить отзыв
</template>

<script>
export default {
  data() {
    return {
      submitStatus: null,
      feedbackText: "",
      mack: "",

      feedbackClick: true
    };
  },
  methods: {
    fdbckClick() {
      if (this.feedbackClick === false) {
        this.feedbackClick = true;
      } else this.feedbackClick = false;
    },
    onSubmit() {
      // this.$v.$touch()

      if (this.$v.$invalid) {
        console.log("ERROR");
        this.submitStatus = "ERROR";
      } else {
        console.log("SEND");
        this.submitStatus = "PENDING";

        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
      const feedback = {
        text: this.feedbackText,
        mack: this.mack,
        completed: false,
        editing: false
      };
      this.$store.dispatch("newFeedback", feedback);
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  background-color: white;
}
.feedback-panel {
  background-color: #f0f0f0;
  border: 1px solid black;
  position: relative;
  top: 15%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
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
  font-family: "Bellota", cursive;
  text-decoration: none;
  color: black;
}
.back:hover {
  background-color: black;
  color: white;
  cursor: pointer;
}

.feedback-write {
  position: relative;
  border: 1px solid red;
  width: 20%;
  height: 40vh;
  float: right;
  top: 10vh;
  right: 3vw;
  background-color: white;
}
.button-write {
  border-radius: 20px;
  position: relative;
  text-align: center;
  top: 10%;
  margin: 0 auto;
  width: 45%;
  font-family: "Bellota", cursive;
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
  position: relative;
  width: 80%;
  height: 60%;
  margin-left: 10%;
  top: 7%;
  resize: none;
  font-family: "Bellota", cursive;
  text-decoration: none;
  color: black;
}
.title-text {
  font-family: "Bellota", cursive;
  text-align: center;
  position: relative;
  top: 3%;
}
.feedback-button {
  border-radius: 20px;
  width: 13vw;
  font-family: "Bellota", cursive;
  font-size: 1.5vw;
  text-align: center;
  position: absolute;
  right: 6.5%;
  top: 19%;
}
.feedback-button:hover {
  color: white;
  background-color: #484349;
  cursor: pointer;
}
.rating_block {
  position: relative;
  top: 8%;
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
</style>
