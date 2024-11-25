<template>
  <div id="app">
    <div class="ui inverted segment navbar">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          <router-link class="item" to="/words" exact>
            <i class="comment outline icon"></i> Words
          </router-link>
          <router-link v-if="loggedIn" class="item" to="/words/new" exact>
            <i class="plus circle icon"></i> New
          </router-link>
          <router-link v-if="loggedIn" class="item" to="/test" exact>
            <i class="graduation cap icon"></i> Test
          </router-link>
          <router-link class="item" to="/me" exact>
            <i class="user icon"></i> About Us
          </router-link>
          <a v-if="loggedIn" class="item" @click="logOut" exact>
            <i class="user icon"></i> Log Out
          </a>
          <router-link v-else class="item" to="/login" exact>
            <i class="user icon"></i> Log In
          </router-link>
        </div>
      </div>
    </div>

    <div class="ui text container">
      <flash-message class="myFlash"></flash-message>
      <div class="ui one column grid">
        <div class="column">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  },
  methods: {
    logOut() {
      this.$store.commit("destroyToken");
      this.$router.push("/login");
    }
  }
};
</script>

<style>
#app > div.navbar {
  margin-top: 1.5em;
}

.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 50;
  right: 0;
}

input {
  width: 300px;
}

div.label {
  width: 120px;
}

div.input {
  margin-bottom: 10px;
}

button.ui.button {
  margin-top: 15px;
  display: block;
}
</style>
