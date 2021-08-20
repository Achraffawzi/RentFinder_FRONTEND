<template>
  <div class="login">
    <Navbar />

    <!-- Login form -->
    <v-container>
      <v-form
        @submit.prevent="onLogin"
        class="d-block mx-auto"
        style="max-width: 400px"
        ref="formLogin"
      >
      <h2 class="primary--text text-center">Log in</h2>
        <v-text-field
          label="Email"
          prepend-icon="email"
        ></v-text-field>
        <v-text-field
          prepend-icon="lock"
          :append-icon="showPasswordModel ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPasswordModel ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="showPasswordModel = !showPasswordModel"
        ></v-text-field>

        <v-btn
          depressed
          class="primary my-4 text-capitalize"
          block
          >Log in</v-btn
        >
        <p class="text-center">
          Don't have an account?
          <router-link :to="{ name: 'signup' }" class="font-weight-bold primary--text"
            >Sign up</router-link
          >
        </p>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Login",
  components: {
    Navbar,
  },
  data() {
      return {
          showPasswordModel: false,
      }
  }
};
</script>
