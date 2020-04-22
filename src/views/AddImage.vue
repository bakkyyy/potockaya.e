<template lang="pug">
	.container-add
		.main-add
			form.form-add(@submit.prevent="onCreateImage")
				.categories-add(:class="{ error: $v.category.$error }" @blur="$v.category.$touch()")
					.category-add
						input.input-add(id="1" type="radio" v-model="category" value="0") 
						label.label-add(for="1") Прогулочная фотосессия
					.category-add
						input.input-add(id="2" type="radio" v-model="category" value="1")
						label.label-add(for="2") В ожидании чуда
					.category-add
						input.input-add( id="3" type="radio" v-model="category" value="2")
						label.label-add(for="3") Девчиники
					.category-add
						input.input-add(id="4" type="radio" v-model="category" value="3") 
						label.label-add(for="4") Семейная фотосессия
					.category-add
						input.input-add(id="5" type="radio" v-model="category" value="4")
						label.label-add(for="5") Свадьба
					.category-add
						input.input-add( id="6" type="radio" v-model="category" value="5")
						label.label-add(for="6") Love-story
					.category-add
						input.input-add(id="7" type="radio" v-model="category" value="6") 
						label.label-add(for="7") Мама + Малыш
					.category-add
						input.input-add(id="8" type="radio" v-model="category" value="7")
						label.label-add(for="8") Репортажная съемка
				.info-add
					.main_instruction-add Памятка при добавленнии фотографий
					.preferably-add 
						p.p-add Инструкция:
						br
						| 1) Выбрать фото, которое хочешь добавить, нажав на кнопку "Выбрать фото"
						br
						br
						| 2) Выбрать категорию, в которую ты хочешь ее добавить 
						br
						br
						| 3) Нажать на кнопку "Добавить в коллекцию" и подождать пока появится надпись "Готово"
						br
					.preferably-add 
						p.p-add Желательно:
						br
						| - Чтобы фотки были сжаты по размеру, потому что от "тяжелых" фотографий сайт будет долго прогружаться
						br
						br
						| - Названия фотографий должны былть понятные, а не просто набор букв и цифр. Пример: "love_story_katya.jpg" 
						br
						br
						| - Все поля должны быть заполнены
				.preview-photo-add(:class="{ error: $v.imageUrl.$error }" @blur="$v.imageUrl.$touch()")
					.text-photo-add Предпросмотр фото:
					.example-image-add
						img.img-add(:src="imageUrl")
				.button-panel-add
					button.button-add.upload-add(@click="onPickFile" type="button") Выбрать фото 
					input.input-add(type="file" ref="fileInput" accept="image/*" style="display: none" @change="onFilePicked")
					button.button-add.selected-add(type="submit" @click="statusUpLoad" :disabled="submitStatus === 'PENDING'") Добавить фото
				.status-add(v-if="this.imageStatus")
						div.div-add(v-if="loading") Фото загружается...
						div.div-add(v-else) Готово!
				
</template>

<script>
import { required } from "vuelidate/lib/validators";
import "@/styles/addimage.css";
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
