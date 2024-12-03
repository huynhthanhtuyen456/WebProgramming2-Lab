<template>
  <div>
    <h2>Score: {{ score }} out of {{ this.words.length }}</h2>

    <div v-if="!startToTest" class="ui compact menu">
      <div class="ui simple dropdown item">
        <i class="flag icon"></i>
        Select a language to test
        <div class="menu">
          <div class="item" v-for="language in listLanguages" @click="selectTestLang(language)">
            <div><i class="flag" :class="[language.code]"></i> {{language.name}}</div>
          </div>
        </div>
      </div>
    </div>

    <form v-if="startToTest" action="#" @submit.prevent="onSubmit">
      <!-- <div class="ui labeled input fluid">
        <div class="ui label"><i class="germany flag"></i> German</div>
        <input
          type="text"
          readonly
          :disabled="testOver"
          :value="currWord.german"
        />
      </div> -->
      <!-- <div class="ui labeled input fluid">
        <div class="ui label"><i class="france flag"></i> France</div>
        <input
          type="text"
          readonly
          :disabled="testOver"
          :value="currWord.french"
        />
      </div> -->
      <div class="ui labeled input fluid">
        <div class="ui label"><i class="flag" :class="[testLang.code]"></i> {{testLang.name}}</div>
        <input
          type="text"
          readonly
          :disabled="testOver"
          :value="currWord[testLang.field]"
        />
      </div>
      <div class="ui labeled input fluid">
        <div class="ui label"><i class="united kingdom flag"></i> English</div>
        <input
          type="text"
          placeholder="Enter word..."
          v-model="english"
          :disabled="testOver"
          autocomplete="off"
        />
      </div>

      <button class="positive ui button" :disabled="testOver">Submit</button>
    </form>

    <p :class="['results', resultClass]">
      <span v-html="result"></span>
    </p>

    <table id="words" class="ui celled compact table" v-if="result">
      <thead>
        <th>English</th>
        <th>{{ testLang.name }}</th>
        <!-- <th>German</th>
        <th>French</th> -->
        <th colspan="1">Your answer</th>
      </thead>
      <tr v-for="(word, i) in words" :key="i">
        <td>{{ word.english }}</td>
        <td>{{ word[testLang.field] }}</td>
        <!-- <td>{{ word.german }}</td>
        <td>{{ word.french }}</td> -->
        <td :class="['results', resultClass]" v-if="answers[i].toLowerCase() != word.english.toLowerCase()">{{ answers[i] || "No Answer" }}</td>
        <td class="success" v-else>{{ answers[i] }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "vocab-test",
  props: {
    words: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      randWords: [...this.words.sort(() => 0.5 - Math.random())],
      incorrectGuesses: [],
      result: "",
      resultClass: "",
      english: "",
      score: 0,
      testOver: false,
      answers: [],
      listLanguages: [
        {code: "france", name: "France", field: "french"},
        {code: "germany", name: "German", field: "german"},
      ],
      testLang: {},
      startToTest: false
    };
  },
  computed: {
    currWord: function () {
      return this.randWords.length ? this.randWords[0] : "";
    },
  },
  methods: {
    onSubmit: function () {
      if (this.english.toLowerCase() === this.currWord.english.toLowerCase()) {
        this.flash("Correct!", "success", { timeout: 1000 });
        this.score += 1;
      } else {
        this.flash("Wrong!", "error", { timeout: 1000 });
        this.incorrectGuesses.push(this.currWord[this.testLang.field]);
      }

      this.answers.push(this.english);

      this.english = "";
      this.randWords.shift();

      if (this.randWords.length === 0) {
        this.testOver = true;
        this.displayResults();
      }
    },
    displayResults: function () {
      if (this.incorrectGuesses.length === 0) {
        this.result = "You got everything correct. Well done!";
        this.resultClass = "success";
      } else {
        const incorrect = this.incorrectGuesses.join(", ");
        this.result = `<strong>You got the following words wrong:</strong> ${incorrect}`;
        this.resultClass = "error";
      }
    },
    selectTestLang: function (lang) {
      this.startToTest = true;
      this.testLang = lang;
    }
  },
};
</script>

<style scoped>
.results {
  margin: 25px auto;
  padding: 15px;
  border-radius: 5px;
}

.error {
  border: 1px solid #ebccd1;
  color: #a94442;
  background-color: #f2dede;
}

.success {
  border: 1px solid #d6e9c6;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>
