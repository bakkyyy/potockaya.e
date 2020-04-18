<template lang="pug">
	.container
		.main
			form(@submit.prevent="onCreateImage")
				.categories(:class="{ error: $v.category.$error }" @blur="$v.category.$touch()")
					.category
						input(id="1" type="radio" v-model="category" value="0") 
						label(for="1") Прогулочная фотосессия
					.category
						input(id="2" type="radio" v-model="category" value="1")
						label(for="2") В ожидании чуда
					.category
						input( id="3" type="radio" v-model="category" value="2")
						label(for="3") Девчиники
					.category
						input(id="4" type="radio" v-model="category" value="3") 
						label(for="4") Семейная фотосессия
					.category
						input(id="5" type="radio" v-model="category" value="4")
						label(for="5") Свадьба
					.category
						input( id="6" type="radio" v-model="category" value="5")
						label(for="6") Love-story
					.category
						input(id="7" type="radio" v-model="category" value="6") 
						label(for="7") Мама + Малыш
					.category
						input(id="8" type="radio" v-model="category" value="7")
						label(for="8") Репортажная съемка
				.info
					.main_instruction Памятка при добавленнии фотографий
					.preferably  
						p Инструкция:
						br
						| 1) Выбрать фото, которое хочешь добавить, нажав на кнопку "Выбрать фото"
						br
						br
						| 2) Выбрать категорию, в которую ты хочешь ее добавить 
						br
						br
						| 3) Нажать на кнопку "Добавить в коллекцию" и подождать пока появится надпись "Готово"
						br
					.preferably 
						p Желательно:
						br
						| - Чтобы фотки были сжаты по размеру, потому что от "тяжелых" фотографий сайт будет долго прогружаться
						br
						br
						| - Названия фотографий должны былть понятные, а не просто набор букв и цифр. Пример: "love_story_katya.jpg" 
						br
						br
						| - Все поля должны быть заполнены
				.preview-photo(:class="{ error: $v.imageUrl.$error }" @blur="$v.imageUrl.$touch()")
					.text-photo Предпросмотр фото:
					.example-image
						img(:src="imageUrl")
				.button-panel
					button.upload(@click="onPickFile" type="button") Выбрать фото 
					input(type="file" ref="fileInput" accept="image/*" style="display: none" @change="onFilePicked")
					button.selected(type="submit" @click="statusUpLoad" :disabled="submitStatus === 'PENDING'") Добавить фото
				.status(v-if="this.imageStatus")
						div(v-if="loading") Фото загружается...
						div(v-else) Готово!
				
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      imagename: "",
      category: "",
      imageUrl: "",
      date: "",
      image: null,
      imageStatus: false,
      submitStatus: null
    };
  },
  validations: {
    imageUrl: {
      required
    },
    category: {
      required
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    statusUpLoad() {
      if (!this.$v.$invalid) {
        this.imageStatus = true;
      }
    },
    onCreateImage() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "PENDING";
        const imageData = {
          imagename: this.imagename,
          category: this.category,
          imageUrl: this.imageUrl,
          image: this.image,
          date: this.date
        };
        this.$store.dispatch("createImage", imageData);
        this.submitStatus = "OK";
        this.category = "";
        this.$v.$reset();
      }
    },
    onPickFile() {
      this.$refs.fileInput.click();
      this.imageStatus = false;
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      this.imagename = filename;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Этот файл не подходит");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener(
        "load",
        () => (this.imageUrl = fileReader.result)
      );
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
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
      this.date = dateTime;
    }
  },
  created() {
    setInterval(this.getNow, 1000);
  }
};
</script>

<style scoped>
* {
  font-family: "Bellota", cursive;
}
.main {
  width: 100%;
  height: 40vw;
  top: 5vw;
  position: relative;
}
.categories {
  border-radius: 20px;
  width: 20vw;
  display: inline-block;
  position: absolute;
  right: 3vw;
  top: 10%;
  background-color: #f0f0f0;
}
.category {
  margin-bottom: 8%;
  margin-top: 8%;
  margin-left: 8%;
}
.info {
  width: 30vw;
  height: 35vw;
  margin-left: 1%;
  margin-top: 1%;
  background-color: #f0f0f0;
  border-radius: 20px;
  position: absolute;
}
.example-image {
  width: 100%;
  height: 90%;
}
.preview-photo {
  position: relative;
  padding: 2%;
  border-radius: 20px;
  width: 25vw;
  height: 17vw;
  background-color: #f0f0f0;
  margin: 0 auto;
}
.text-photo {
  text-align: center;
  font-size: 1.2vw;
  font-weight: 500;
}
.button-panel {
  position: relative;
  margin: 0 auto;
  width: 30vw;
  top: 15vw;
  display: flex;
  justify-content: space-between;
}

button {
  background-color: white;
  font-size: 1.2vw;
  padding: 0;
  border: none;
  border-radius: 20px;
}
button:hover {
  background-color: #484349;
  color: white;
  cursor: pointer;
}
.upload {
  width: 30%;
}
.selected {
  width: 35%;
}
img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.main_instruction {
  text-align: center;
  font-weight: 900;
  color: rgb(255, 230, 0);
  text-shadow: 1px 0 1px #000, 0 1px 1px #000, -1px 0 1px #000, 0 -1px 1px #000;
}
.preferably {
  margin-top: 10%;
}
p {
  font-weight: 600;
}
.status {
  width: 15vw;
  height: 1.5vw;
  font-size: 1.3vw;
  text-align: center;
  position: relative;
  margin: 0 auto;
  margin-top: 8%;
}
.error {
  border-color: red;
  border: 1px solid red;
}
</style>