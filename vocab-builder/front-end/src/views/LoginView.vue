<template>
    <div>
        <h1>Login Page</h1>
        <login-form @submitLogin="submitLogin" :authentication=this.authentication></login-form>
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import { api } from '@/helpers/helpers';

export default {
    name: 'login',
    components: {
        'login-form': LoginForm
    },
    data: function() {
        return {
            authentication: {}
        };
    },
    methods: {
        submitLogin: async function(authentication) {
            this.$store.dispatch('userLogin', {
              email: this.authentication.email,
              password: this.authentication.password
            })
            .then(() => {
              this.flash("Authenticated successfully.", "success")
              this.$router.push("/words")
            })
        }
    }
};
</script>

<style scoped>
    .error {
        color: red;
    }
</style>