<template>
  <div class="change-password">
    <!-- Alert -->
    <BaseAlert v-if="alertData" :alertData="alertData" />

    <h5 class="text-h5 font-weight-bold">Change password</h5>
    <v-form ref="changePasswordForm">
      <v-text-field
        v-model="oldPassword"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRule"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Current Password"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-text-field
        v-model="newPassword"
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRule"
        :type="show2 ? 'text' : 'password'"
        name="input-10-1"
        label="New Password"
        hint="At least 8 characters"
        counter
        @click:append="show2 = !show2"
      ></v-text-field>

      <v-text-field
        v-model="confirmPassword"
        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="confirmPasswordRule"
        :type="show3 ? 'text' : 'password'"
        name="input-10-1"
        label="Confirm New Password"
        hint="At least 8 characters"
        counter
        @click:append="show3 = !show3"
      ></v-text-field>

      <v-btn
        class="primary white--text"
        text
        @click="onChangePassword"
        :loading="loading"
        :disabled="loading"
      >
        Save
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { createApiEndPoints, END_POINTS } from "../../../api.js";
import BaseAlert from "@/components/BaseAlert.vue";
export default {
  name: "ChangePassword",

  components: { BaseAlert },

  data() {
    return {
      //#region vuetify bindings
      show1: false,
      show2: false,
      show3: false,
      loading: false,
      //#endregion

      //#region Component Bindings
      alertData: null,
      //#endregion

      //#region Input models
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      //#endregion

      //#region Input rules
      passwordRule: [
        (password) =>
          password.length >= 8 || "Password must be at least 8 characters",
      ],
      confirmPasswordRule: [
        (password) => password === this.newPassword || "Password not match",
      ],
      //#endregion

      //#region Other Component Data
      loader: null,
      alertMessage: "",
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
    async onChangePassword() {
      this.loading = true;
      if (this.$refs.changePasswordForm.validate()) {
        try {
          let reqObj = {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
            confirmPassword: this.confirmPassword,
          };
          const req = createApiEndPoints(END_POINTS.CHANGE_PASSWORD);
          await req.update({ ...reqObj });

          this.alertData = {
            alertMessage: "Password has been changed successfully",
            alertColor: "success",
            alertIcon: "check",
          };

          this.$refs.changePasswordForm.reset();
        } catch (e) {
          this.loading = false;
          this.alertData = {
            alertMessage: " your old password might be incorrect",
            alertColor: "error",
            alertIcon: "error",
          };
        }
      } else {
        this.alertData = {
          alertMessage: "Please verify pasword fields",
          alertColor: "error",
          alertIcon: "error",
        };
      }

      this.loading = false;
    },
  },
};
</script>
