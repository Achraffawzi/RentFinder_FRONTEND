<template>
  <div class="signup">
    <Navbar />

    <!-- Signup form -->
    <v-container>
      <v-form
        @submit.prevent="onSignup"
        class="d-block mx-auto"
        style="max-width: 600px"
        ref="formSignup"
      >
        <div v-if="alertData != null">
          <BaseAlert :alertData="alertData" />
        </div>
        <h2 class="primary--text text-center mb-4">Sign Up</h2>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              label="Firstname"
              prepend-icon="badge"
              :rules="nameRule"
              v-model="newUser.firstName"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Lastname"
              prepend-icon="badge"
              :rules="nameRule"
              v-model="newUser.lastName"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              label="Phone number"
              prepend-icon="phone"
              :rules="phoneNumberRule"
              v-model="newUser.phoneNumber"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="City"
              prepend-icon="location_on"
              :rules="nameRule"
              v-model="newUser.city"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              label="Email"
              prepend-icon="email"
              :rules="emailRule"
              v-model="newUser.email"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              prepend-icon="work"
              label="Role"
              :items="['User', 'HouseOwner']"
              :rules="roleRule"
              v-model="newUser.role"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              prepend-icon="lock"
              :append-icon="showPasswordModel ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPasswordModel ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="showPasswordModel = !showPasswordModel"
              :rules="passwordRule"
              v-model="newUser.password"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              prepend-icon="lock"
              :append-icon="
                showConfirmPasswordModel ? 'mdi-eye' : 'mdi-eye-off'
              "
              :type="showConfirmPasswordModel ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="
                showConfirmPasswordModel = !showConfirmPasswordModel
              "
              :rules="confirmPasswordRule"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn
          depressed
          class="primary my-4 text-capitalize"
          block
          type="submit"
          :loading="loadingSignup"
          >Sign up</v-btn
        >
        <p class="text-center">
          Already have an account?
          <router-link
            :to="{ name: 'login' }"
            class="font-weight-bold primary--text"
            >Log in</router-link
          >
        </p>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import BaseAlert from "@/components/BaseAlert.vue";
import { createApiEndPoints, END_POINTS } from "../../api.js";
export default {
  name: "Signup",

  components: {
    Navbar,
    BaseAlert,
  },

  data() {
    return {
      //#region Component Models
      showPasswordModel: false,
      showConfirmPasswordModel: false,
      alertData: null,
      //#endregion

      //#region Component Bindings
      loadingSignup: false,
      loader: null,
      //#endregion

      //#region Input rules
      nameRule: [
        (value) =>
          /^[a-zA-Z]{2,}$/.test(value) ||
          "This field must have an alphabetic value and at least two characters",
      ],
      phoneNumberRule: [
        (value) =>
          /^[0-9]{8,}$/.test(value) || "Phone number must be numeric and valid",
      ],
      emailRule: [
        (email) =>
          /^[a-zA-Z0-9]+((.|_|-)[a-zA-Z0-9]+)?@(gmail|yahoo|hotmail).(com|fr|uk|net)$/.test(
            email
          ) || "please enter a valid email adresse",
      ],
      roleRule: [(value) => !!value || "Please select a role"],
      passwordRule: [
        (password) =>
          password.length >= 8 || "Password must have at least 8 characters",
      ],
      confirmPasswordRule: [
        (password) =>
          password === this.newUser.password || "Password not match",
      ],
      //#endregion

      //#region User Signup Data
      newUser: {
        firstName: "",
        lastName: "",
        city: "",
        phoneNumber: "",
        email: "",
        password: "",
        role: "",
      },
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
    onSignup() {
      this.loadingSignup = true;
      setTimeout(() => {
        console.log(32);
      }, 3000);
      if (this.$refs.formSignup.validate()) {
        // Adding the userName
        const user = {
          firstName: this.newUser.firstName,
          lastName: this.newUser.lastName,
          city: this.newUser.city,
          phoneNumber: this.newUser.phoneNumber,
          email: this.newUser.email,
          password: this.newUser.password,
          role: this.newUser.role,
          userName: this.newUser.firstName + " " + this.newUser.lastName,
        };
        createApiEndPoints(END_POINTS.AUTH_REGISTER)
          .create(user)
          .then((response) => {
            this.alertData = {
              alertMessage: response.data.message,
              alertColor: "success",
              alertIcon: "check",
            };
          })
          .catch(() => {
            this.alertData = {
              alertMessage:
                "Something went wrong, please verify our information",
              alertColor: "error",
              alertIcon: "error",
            };
          });
      } else {
        this.alertData = {
          alertMessage: "Something went wrong, please verify our information",
          alertColor: "error",
          alertIcon: "error",
        };
      }
      this.loadingSignup = false;
    },
  },
};
</script>
