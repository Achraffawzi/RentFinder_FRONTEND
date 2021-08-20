<template>
  <div class="signup">
    <Navbar />

    <!-- Signup form -->
    <v-container>
    <v-form
      @submit.prevent="onSignup"
      method="POST"
      class="d-block mx-auto"
      style="max-width: 400px"
      ref="formSignup"
    >
    <h2 class="primary--text text-center mb-4">Sign Up</h2>
    
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              label="Firstname"
              v-model="newUser.FirstName"
              prepend-icon="badge"
              :rules="name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Lastname"
              v-model="newUser.LastName"
              prepend-icon="badge"
              :rules="name"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn
          depressed
          class="primary my-4 text-capitalize"
          block
          type="submit"
          >Sign up</v-btn
        >
        <p class="text-center">
          Already have an account?
          <router-link :to="{ name: 'login' }" class="font-weight-bold primary--text"
            >Log in</router-link
          >
        </p>
    </v-form>
    </v-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Signup",
  components: {
    Navbar,
  },
};
</script>
