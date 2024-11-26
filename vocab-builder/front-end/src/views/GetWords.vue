<template>
  <div>
    <h1>Words</h1>
    <div class="ui labeled input fluid">
        <div class="ui label"><i class="search icon"></i> Search</div>
        <input type="text" name="search-box" @keyup="searchWords"/>
    </div>
    <table id="words" class="ui celled compact table">
      <thead>
        <th>English</th>
        <th>German</th>
        <th colspan="3"></th>
      </thead>
      <tr v-for="(word, i) in words" :key="i">
        <td>{{ word.english }}</td>
        <td>{{ word.german }}</td>
        <td width="75" class="center aligned">
          <router-link :to="{ name: 'show', params: { id: word._id } }"
            >Show</router-link
          >
        </td>
        <td width="75" class="center aligned">
          <router-link :to="{ name: 'edit', params: { id: word._id } }"
            >Edit</router-link
          >
        </td>
        <td
          width="75"
          class="center aligned"
          @click.prevent="onDestroy(word._id)"
        >
          <a :href="`/words/${word._id}`">Destroy</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { api } from "@/helpers/helpers";

export default {
  name: "words",
  data() {
    return {
      words: [],
      languages: [
        { text: "German", key: "german" },
        { text: "English", key: "english" },
      ],
      selected: "german",
    };
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm("Are you sure?");
      if (!sure) return;
      await api.deleteWord(id);
      this.flash("Word deleted successfully!", "success");
      const newWords = this.words.filter((word) => word._id !== id);
      this.words = newWords;
    },
    async searchWords(e) {
        this.words = await api.searchWords(e.target.value.trim());
        console.log(this.words);
    }
  },
  async mounted() {
    this.words = await api.getWords();
  },
};
</script>

<style>
    input[name="search-box"] {
        display: block;
        margin: 2rem auto;
        max-width: 500px;
        width: 95%;
        padding: 0.5rem 1rem;
    }

    /* .search-item {
        margin: 2rem auto;
        max-width: 500px;
    } */
</style>
