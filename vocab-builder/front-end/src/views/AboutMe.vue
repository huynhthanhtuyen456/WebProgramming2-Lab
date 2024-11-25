<template>
  <div>
    <h1>PM76 page</h1>
    <p>
      This page belongs to Matt Prichard and has been added to the system
      working on my own to demonstrate my ability to add a new item to the menu
      bar with a new icon of my choice attaching a template from a new view.
    </p>
  </div>
</template>

<script>
import WordForm from "@/components/WordForm.vue";
import { api } from "@/helpers/helpers";

export default {
  name: "about-me",
  components: {
    "word-form": WordForm,
  },
  // data: function() {
  //     return {
  //         word: {}
  //     };
  // },
  // async mounted() {
  //     this.word = await api.getWord(this.$route.params.id)
  // },
  // methods: {
  //     createOrUpdate: async function(word) {
  //         await api.updateWord(word);
  //         this.flash('Word updated successfully!', 'success');
  //         this.$router.push(`/words/${word._id}`);
  //     }
  // }
};
</script>
