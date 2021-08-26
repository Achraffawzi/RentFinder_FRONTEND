<template>
  <div class="login">
    <Navbar />

    <!-- Login form -->
    <v-container>
      <v-form
        @submit.prevent="onLogin"
        method="POST"
        class="d-block mx-auto"
        style="max-width: 400px"
        ref="formLogin"
      >
        <div v-if="alertData != null">
          <BaseAlert :alertData="alertData" />
        </div>
        <h2 class="primary--text text-center">Log in</h2>
        <v-text-field
          label="Email"
          prepend-icon="email"
          v-model="user.email"
          :rules="emailRule"
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
          :rules="passwordRule"
        ></v-text-field>

        <v-btn
          depressed
          class="primary my-4 text-capitalize"
          block
          type="submit"
          :loading="loadingLoginButton"
          :disabled="loadingLoginButton"
          >Log in</v-btn
        >
        <p class="text-center">
          Don't have an account?
          <router-link
            :to="{ name: 'signup' }"
            class="font-weight-bold primary--text"
            >Sign up</router-link
          >
        </p>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import BaseAlert from "@/components/BaseAlert.vue";
import { getUserPathName } from "@/globalFunctions.js";
import { createApiEndPoints, END_POINTS } from "../../api.js";
export default {
  name: "Login",
  components: {
    Navbar,
    BaseAlert,
  },
  data() {
    return {
      //#region Component Models
      showPasswordModel: false,
      //#endregion

      //#region Input Rules
      emailRule: [
        (email) =>
          /^[a-zA-Z0-9]+((.|_|-)[a-zA-Z0-9]+)?@(gmail|yahoo|hotmail).(com|fr|uk|net)$/.test(
            email
          ) || "please enter a valid email adresse",
      ],
      passwordRule: [
        (password) =>
          password.length >= 8 || "Password must have at least 8 characters",
      ],
      //#endregion

      //#region Main Data
      user: {
        email: "",
        password: "",
      },
      //#endregion

      //#region Component Bindings
      loadingLoginButton: false,
      alertData: null,
      //#endregion
    };
  },

  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },

  methods: {
    async onLogin() {
      this.loadingLoginButton = true;
      if (this.$refs.formLogin.validate()) {
        try {
          const response = await createApiEndPoints(
            END_POINTS.AUTH_LOGIN
          ).create(this.user);
          localStorage.setItem("L_T", response.data.token);
          let pathName = getUserPathName(response.data.token);
          this.$router.push({ name: pathName });
        } catch (e) {
          this.alertData = {
            alertMessage: "Please confirm your email to login",
            alertColor: "error",
            alertIcon: "error",
          };
        }
      } else {
        this.alertData = {
          alertMessage: "Please verify your information",
          alertColor: "error",
          alertIcon: "error",
        };
      }
      this.loadingLoginButton = false;
    },
  },
};
</script>
