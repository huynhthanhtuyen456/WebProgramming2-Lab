<template>
  <div>
    <h1>Edit Word</h1>
    <word-form @createOrUpdate="createOrUpdate" :word="this.word"></word-form>
  </div>
</template>

<script>
import WordForm from "@/components/WordForm.vue";
import { api } from "@/helpers/helpers";

export default {
  name: "edit-word",
  components: {
    "word-form": WordForm,
  },
  data: function () {
    return {
      word: {},
    };
  },
  async mounted() {
    this.word = await api.getWord(this.$route.params.id);
  },
  methods: {
    createOrUpdate: async function (word) {
      let data = await api.updateWord(word);
      if (data) {
        this.flash("Word updated successfully!", "success");
        this.$router.push(`/words/${word._id}`);
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
