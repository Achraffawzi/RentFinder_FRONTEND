<template>
  <div class="edit-profile">
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
          <v-img
            src="https://www.realmadrid.com/img/vertical_380px/ramos_ficha_550x650_20210630115027.jpg"
          ></v-img>
        </v-avatar>
        <input type="file" id="filePicker" class="d-none" />
        <v-btn class="primary white--text text-lowercase d-block mt-4"
          >Save Photo</v-btn
        >
      </v-col>
      <!-- Profile info col -->
      <v-col cols="12" md="7">

        <!-- Firstname -->
        <div>
          <div class="d-flex justify-space-between align-center py-4">
            <div class="d-flex flex-column align-start justify-center">
              <span class="font-weight-bold">Firstname</span>
              <v-text-field
                v-model="profileInfo.FirstName"
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
                v-model="profileInfo.LastName"
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
                v-model="profileInfo.PhoneNumber"
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
                v-model="profileInfo.City"
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
        <v-btn :loading="loadingProfile" :disabled="loadingProfile" class="primary white--text text-lowercase">Save changes</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { createApiEndPoints, END_POINTS } from "../../../api.js";
let filePicker = document.querySelector("#filePicker");
export default {
  name: "EditProfile",

  data() {
    return {
      //#region Main Data
      profileInfo: {
        FirstName: "",
        LastName: "",
        PhoneNumber: "",
        City: "",
      },
      //#endregion

      //#region Component Bindings
      isFirstnameChanging: false,
      isLastnameChanging: false,
      isPhoneNumberChanging: false,
      isCityChanging: false,
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
    }
  },

  mounted() {
    this.getUserInfo();
  },

  methods: {
    async getUserInfo() {
      const req = createApiEndPoints(END_POINTS.GET_USER_INFO);
      const res = await req.fetch();
      this.profileInfo.FirstName = res.data.FirstName;
      this.profileInfo.LastName = res.data.LastName;
      this.profileInfo.PhoneNumber = res.data.PhoneNumber;
      this.profileInfo.City = res.data.City;
    },

    openFileUplaod() {
      filePicker.click();
    },

    changeButtonValue(prop) {
      return prop ? "Save" : "Change";
    },
  },
};
</script>
