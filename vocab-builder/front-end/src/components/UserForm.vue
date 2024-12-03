<template>
    <form action="#" @submit.prevent="onSubmit">
      <p v-if="errorsPresent" class="error">{{ errorMessage }}</p>
  
      <div class="ui labeled input fluid"></div>
  
      <div class="ui labeled input fluid">
        <div class="ui label">First Name <span class="error">*</span></div>
        <input type="text" pattern="[A-Za-z]*" title="Letters only" placeholder="Enter First Name..." v-model="user.first_name" required/>
      </div>
  
      <div class="ui labeled input fluid">
        <div class="ui label">Last Name <span class="error">*</span></div>
        <input type="text" pattern="[A-Za-z]*" title="Letters only" placeholder="Enter Last Name..." v-model="user.last_name" required/>
      </div>
  
      <div class="ui labeled input fluid">
        <div class="ui label">Email <span class="error">*</span></div>
        <input type="email" placeholder="Enter Email Address..." v-model="user.email" required/>
      </div>

      <div class="ui labeled input fluid">
        <div class="ui label">Password <span class="error">*</span></div>
        <input type="password" placeholder="Enter Password..." v-model="user.password" required/>
      </div>

      <div class="ui labeled input fluid">
        <div class="ui label">Pass Confirm <span class="error">*</span></div>
        <input type="password" placeholder="Re-type Password..." v-model="passwordConfirmation" required/>
      </div>
  
      <button class="positive ui button">Submit</button>
    </form>
  </template>
  
  <script>
  export default {
    name: "user-form",
    props: {
      user: {
        type: Object,
        required: false,
        default: () => {
          return {
            first_name: "",
            last_name: "",
            email: "",
            password: ""
          };
        },
      },
    },
    data() {
      return {
        errorsPresent: false,
        passwordConfirmation: "",
        errorMessage: ""
      };
    },
    methods: {
      onSubmit: function () {
        if (this.user.email === "" || this.user.password === "") {
          this.errorsPresent = true;
          this.errorMessage = "Please fill out both of email and password fields!"
        }  else if (this.user.password.length < 8) {
          this.errorsPresent = true;
          this.errorMessage = "Password must be at least 8 chars!"
        }
        else if (this.user.password !== this.passwordConfirmation) {
          this.errorsPresent = true;
          this.errorMessage = "Wrong password confirmation!";
        } 
        else {
          this.$emit("createOrUpdateUser", this.user);
        }
      }
    },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  
  .left {
    margin-left: 20px !important;
  }
  </style>
  