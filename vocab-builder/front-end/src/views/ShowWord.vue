<template>
  <div>
    <h1>Show Word</h1>

    <div class="ui labeled input fluid">
      <div class="ui label"><i class="germany flag"></i> German</div>
      <input type="text" readonly :value="word.german" />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class="united kingdom flag"></i> English</div>
      <input type="text" readonly :value="word.english" />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class="france flag"></i> France</div>
      <input type="text" readonly :value="word.french" />
    </div>
    <div v-for="(value, name, index) in word.additionalLanguages" class="ui labeled input fluid">
      <div class="ui label"><i :class="[languages[name].code]" class="flag"></i> {{languages[name].name}}</div>
      <input type="text" readonly :value="value" />
    </div>
    <div class="actions">
      <router-link v-if="loggedIn"
        :to="{ name: 'edit', params: { id: this.$route.params.id } }"
      >
        Edit word
      </router-link>
    </div>
  </div>
</template>

<script>
import { api } from "@/helpers/helpers";
import { DictLanguages } from "@/helpers/constants";

export default {
  name: "show",
  data() {
    return {
      word: {},
      languages: DictLanguages
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  },
  async mounted() {
    this.word = await api.getWord(this.$route.params.id);
  },
};
</script>

<style scoped>
.actions a {
  display: block;
  text-decoration: underline;
  margin: 20px 10px;
}
</style>
