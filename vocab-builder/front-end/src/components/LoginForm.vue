<template>
  <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out both fields!</p>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <label for="EmailLabel">Email</label>
      </div>
      <input
        type="email"
        id="EmailLabel"
        required
        placeholder="Enter your email..."
        v-model="authentication.email"
      />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <label for="PasswordLabel">Password</label>
      </div>
      <input
        type="password"
        id="PasswordLabel"
        required
        placeholder="Enter your password..."
        v-model="authentication.password"
      />
    </div>

    <button class="positive ui button">Submit</button>
  </form>
</template>

<script>
export default {
  name: "login-form",
  props: {
    authentication: {
      type: Object,
      required: false,
      default: () => {
        return {
          email: "",
          password: "",
        };
      },
    },
  },
  data() {
    return {
      errorsPresent: false,
    };
  },
  methods: {
    onSubmit: function () {
      if (
        this.authentication.email === "" ||
        this.authentication.password === ""
      ) {
        this.errorsPresent = true;
      } else {
        this.$emit("submitLogin", this.authentication);
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
