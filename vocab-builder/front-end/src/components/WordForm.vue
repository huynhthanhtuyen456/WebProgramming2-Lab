<template>
  <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out all three fields: German, English, French!</p>
    <!-- <div class="ui input fluid">
      <select class="ui dropdown" v-model="currentLang">
        <option v-for="language in listLanguages" :value="language">{{ language.name }}</option>
      </select>
    </div> -->

    <!-- <div class="ui input fluid">
      <a class="positive ui button" @click="add(currentLang)">Add language</a>
      <a class="positive ui button" @click="remove(currentLang)">Remove language</a>
    </div> -->
    
    <div class="ui compact menu">
      <div class="ui simple dropdown item">
        <i class="flag icon"></i>
        Select a language (Optional)
        <div class="menu">
          <div class="item" v-for="language in listLanguages" @click="add(language)">
            <div><i class="flag" :class="[language.code]"></i> {{language.name}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="ui labeled input fluid"></div>

    <div class="ui labeled input fluid">
      <div class="ui label"><i class="germany flag"></i> German</div>
      <input type="text" placeholder="Enter word..." v-model="word.german" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label"><i class="united kingdom flag"></i> English</div>
      <input type="text" placeholder="Enter word..." v-model="word.english" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label"><i class="fr flag"></i> French</div>
      <input type="text" placeholder="Enter word..." v-model="word.french" />
    </div>

    <div v-for="(language, index) in languages" :key="language.code" class="ui labeled input fluid">
      <div class="ui label"><i class="flag" :class="[language.code]"></i> {{language.name}}</div>
      <input v-if="word.additionalLanguages && word.additionalLanguages[language.field]" type="text" placeholder="Enter word..." v-model="word.additionalLanguages[language.field]" />
      <input v-else type="text" placeholder="Enter word..." v-model="selectedLanguages[language.field]" />
      <a class="ui label button left" @click="remove(language)">Remove</a>
    </div>

    <button class="positive ui button">Submit</button>
  </form>
</template>

<script>
import { ListLanguages } from "@/helpers/constants";
export default {
  name: "word-form",
  props: {
    word: {
      type: Object,
      required: false,
      default: () => {
        return {
          english: "",
          german: "",
          french: "",
          additionalLanguages: {}
        };
      },
    },
  },
  data() {
    return {
      errorsPresent: false,
      listLanguages: ListLanguages,
      currentLang: {"name": "Andorra", "code": "ad", "field": "andorra"},
      languages: [],
      selectedLanguages: {}
    };
  },
  watch: {
    word() {
      if (this.word.additionalLanguages) {
        let keys = Object.keys(this.word.additionalLanguages);
        keys.forEach(element => {
          let obj = this.listLanguages.find(obj => obj.field === element)
          if (obj) this.languages.push(obj);
        });
      }
    }
  },
  methods: {
    onSubmit: function () {
      if (this.word.english === "" || this.word.german === "" || this.word.french === "") {
        this.errorsPresent = true;
      } else {
        let data = {...this.word.additionalLanguages, ...this.selectedLanguages}
        this.word.additionalLanguages = data;
        this.$emit("createOrUpdate", this.word);
      }
    },
    findLanguage(lang) {
      let isFounded = false;

      this.languages.forEach(element => {
        if (element.code == lang.code) {
          isFounded = true;
        }
      });
      return isFounded
    },
    add(currentLang) {
      let isFounded = this.findLanguage(currentLang);
      if (isFounded) {
        this.flash(`${currentLang.name} language existed in form!`, "error")
        return;
      }
      this.currentLang = currentLang;
      this.languages.push(this.currentLang);
    },
    remove(currentLang) {
      let isFounded = false;
      this.languages.forEach(element => {
        if (element.code == currentLang.code) {
          isFounded = true;
        }
      });
      if (!isFounded) {
        this.flash(`${currentLang.name} language does not exist in form!`, "error");
        return;
      }
      this.currentLang = currentLang;
      this.languages.pop(currentLang);
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}

.left {
  margin-left: 5px !important;
}
</style>
