<template>
    <div>
        <h1>Login Page</h1>
        <register-form @createOrUpdateUser="register"></register-form>
    </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue';
import { api } from '@/helpers/helpers';

export default {
    name: 'register',
    components: {
        'register-form': UserForm
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn;
        }
    },
    async mounted() {
        if (this.loggedIn) {
            this.$router.push("/words");
        }
    },
    methods: {
        register: async function(user) {
            const res = await api.register(user);
            if (res) {
                this.$store.dispatch('userLogin', {
                    email: user.email,
                    password: user.password
                })
                .then(() => {
                    this.flash(res.message, "success")
                    this.$router.push("/words")
                })
            }
        }
    }
};
</script>

<style scoped>
    .error {
        color: red;
    }
</style>