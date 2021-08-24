<template>
  <div class="login">
    <Navbar />

    <!-- Login form -->
    <v-container>
      <v-form
        @submit.prevent="onLogin"
        method = 'POST'
        class="d-block mx-auto"
        style="max-width: 400px"
        ref="formLogin"
      >
      <h2 class="primary--text text-center">Log in</h2>
        <v-text-field
          label="Email"
          prepend-icon="email"
          v-model="user.email"
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
          v-model="user.password"
        ></v-text-field>

        <v-btn
          depressed
          class="primary my-4 text-capitalize"
          block
          type="submit"
          >Log in</v-btn
        >
        <p class="text-center">
          Don't have an account?
          <router-link :to="{ name: 'signup' }" class="font-weight-bold primary--text"
            >Sign up</router-link
          >
        </p>
      </v-form>

      <Footer />
    </v-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { createApiEndPoints, END_POINTS } from "../../api.js";
export default {
  name: "Login",
  components: {
    Navbar,
    Footer,
  },
  data() {
      return {
        //#region Component Models
          showPasswordModel: false,
        //#endregion

        //#region Component Models
        user: {
          email: "",
          password: "",
        }
        //#endregion
      }
  },

  methods: {
    onLogin () {
      createApiEndPoints (END_POINTS.AUTH_LOGIN)
        .create(this.user)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
};
</script>
