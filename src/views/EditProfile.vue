<template>
  <div class="edit-profile">
    <!-- Alert -->
    <BaseAlert v-if="alertData" :alertData="alertData" />
    <v-row>
      <v-col cols="12" md="5">
        <v-avatar
          max-width="100"
          height="100"
          width="100"
          class="mx-auto"
          style="cursor: pointer"
          @click="openFileUplaod"
        >
          <img
            id="profile-image"
            :src="`http://localhost:4000/static/images/user/${userInfo.Avatar}`"
          />
        </v-avatar>
        <input
          type="file"
          id="filePicker"
          class="d-none"
          accept="image/*"
          @change="onFileSelected"
        />
        <v-btn
          @click="onSaveAvatar"
          class="primary white--text text-lowercase d-block mt-4"
          >Save Photo</v-btn
        >
      </v-col>
      <!-- Profile info col -->
      <v-col cols="12" md="7">
        <v-form
          @submit.prevent="onUpdateProfile"
          method="POST"
          ref="formUpdate"
        >
          <!-- Firstname -->
          <div>
            <div class="d-flex justify-space-between align-center py-4">
              <div class="d-flex flex-column align-start justify-center">
                <span class="font-weight-bold">Firstname</span>
                <v-text-field
                  v-model="userInfo.FirstName"
                  :disabled="!isFirstnameChanging"
                  :rules="nameRule"
                >
                </v-text-field>
              </div>
              <v-btn
                outlined
                color="primary"
                @click="isFirstnameChanging = !isFirstnameChanging"
                >{{ changeButtonValue(isFirstnameChanging) }}</v-btn
              >
            </div>
          </div>
          <v-divider></v-divider>

          <!-- Lastname -->
          <div>
            <div class="d-flex justify-space-between align-center py-4">
              <div class="d-flex flex-column align-start justify-center">
                <span class="font-weight-bold">Lastname</span>
                <v-text-field
                  v-model="userInfo.LastName"
                  :disabled="!isLastnameChanging"
                  :rules="nameRule"
                >
                </v-text-field>
              </div>
              <v-btn
                outlined
                color="primary"
                @click="isLastnameChanging = !isLastnameChanging"
                >{{ changeButtonValue(isLastnameChanging) }}</v-btn
              >
            </div>
          </div>
          <v-divider></v-divider>

          <!-- Phone number -->
          <div>
            <div class="d-flex justify-space-between align-center py-4">
              <div class="d-flex flex-column align-start justify-center">
                <span class="font-weight-bold">Phone number</span>
                <v-text-field
                  v-model="userInfo.PhoneNumber"
                  :disabled="!isPhoneNumberChanging"
                  :rules="phoneNumberRule"
                >
                </v-text-field>
              </div>
              <v-btn
                outlined
                color="primary"
                @click="isPhoneNumberChanging = !isPhoneNumberChanging"
                >{{ changeButtonValue(isPhoneNumberChanging) }}</v-btn
              >
            </div>
          </div>
          <v-divider></v-divider>

          <!-- City -->
          <div>
            <div class="d-flex justify-space-between align-center py-4">
              <div class="d-flex flex-column align-start justify-center">
                <span class="font-weight-bold">City</span>
                <v-text-field
                  v-model="userInfo.City"
                  :disabled="!isCityChanging"
                  :rules="nameRule"
                >
                </v-text-field>
              </div>
              <v-btn
                outlined
                color="primary"
                @click="isCityChanging = !isCityChanging"
                >{{ changeButtonValue(isCityChanging) }}</v-btn
              >
            </div>
          </div>
          <v-divider></v-divider>

          <!-- submit button -->
          <v-btn
            :loading="loadingProfile"
            :disabled="loadingProfile"
            class="primary white--text text-lowercase"
            type="submit"
            >Save changes</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { createApiEndPoints, END_POINTS } from "../../api.js";
import BaseAlert from "@/components/BaseAlert.vue";
export default {
  name: "EditProfile",

  components: { BaseAlert },

  data() {
    return {
      selectedFile: null,
      //#region Main Data
      userInfo: {
        Avatar: "",
        FirstName: "",
        LastName: "",
        PhoneNumber: "",
        City: "",
      },
      //#endregion

      //#region Component Bindings
      alertData: null,

      isFirstnameChanging: false,
      isLastnameChanging: false,
      isPhoneNumberChanging: false,
      isCityChanging: false,

      loadingProfile: false,
      loader: null,
      //#endregion

      //#region Input Rules
      nameRule: [
        (name) =>
          (name.length > 1 && isNaN(name)) ||
          "This field is required and must be alphabetic",
      ],

      phoneNumberRule: [
        (value) =>
          /^[0-9]{8,}$/.test(value) || "Phone number must be numeric and valid",
      ],
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

  mounted() {
    this.getUserInfo();
  },

  methods: {
    async getUserInfo() {
      try {
        const req = createApiEndPoints(END_POINTS.GET_USER_INFO);
        const res = await req.fetch();
        this.userInfo.Avatar = res.data.Avatar;
        this.userInfo.FirstName = res.data.FirstName;
        this.userInfo.LastName = res.data.LastName;
        this.userInfo.PhoneNumber = res.data.PhoneNumber;
        this.userInfo.City = res.data.City;
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    },

    async onUpdateProfile() {
      this.loadingProfile = true;

      if (this.$refs.formUpdate.validate()) {
        try {
          let user = {
            firstName: this.userInfo.FirstName,
            lastName: this.userInfo.LastName,
            phoneNumber: this.userInfo.PhoneNumber,
            city: this.userInfo.City,
            userName: this.userInfo.FirstName + "" + this.userInfo.LastName,
          };
          const req = createApiEndPoints(END_POINTS.UPDATE_PROFILE);
          await req.update({ ...user });
          this.loadingProfile = false;
          this.alertData = {
            alertMessage: "Your profile has been updated successfully",
            alertColor: "success",
            alertIcon: "check",
          };
        } catch (e) {
          console.log(e);
          this.loadingProfile = false;
          this.alertData = {
            alertMessage: "Something went wrong! Please try again",
            alertColor: "error",
            alertIcon: "error",
          };
        }
      } else {
        console.log("form not valid");
        this.loadingProfile = false;
        this.alertData = {
          alertMessage: "Please verify your profile information",
          alertColor: "error",
          alertIcon: "error",
        };
      }
    },

    openFileUplaod() {
      let filePicker = document.querySelector("#filePicker");
      filePicker.click();
    },

    changeButtonValue(prop) {
      return prop ? "Save" : "Change";
    },

    onFileSelected(event) {
      let imgSrc = document.querySelector("#profile-image");
      this.selectedFile = event.target.files[0];
      let reader = new FileReader();
      // NOTE: If an image SELECTED DO this
      if (this.selectedFile) {
        reader.readAsDataURL(this.selectedFile);
      }
      // NOTE: Set The Source / 'src' tag  of image
      reader.addEventListener("load", function () {
        imgSrc.setAttribute("src", reader.result);
      });
      this.userInfo.Avatar = reader.result;
    },

    async onSaveAvatar() {
      try {
        const formData = new FormData();
        formData.append("avatar", this.selectedFile);
        const req = createApiEndPoints(END_POINTS.UPDATE_AVATAR);
        await req.update(formData);
        this.alertData = {
          alertMessage: "Your profile picture has been updated successfully",
          alertColor: "success",
          alertIcon: "check",
        };
      } catch (e) {
        console.log(e);
        this.alertData = {
          alertMessage: "Something went wrong! Please try again",
          alertColor: "error",
          alertIcon: "error",
        };
      }
    },
  },
};
</script>
