<template>
  <nav class="mb-5 navbar">
    <v-app-bar style="background-color: transparent" elevate-on-scroll>
      <v-container class="d-flex align-center justify-space-between">
        <!-- Logo link -->
        <router-link :to="{ name: 'home' }" class="navbar__logo mr-3">
          <span
            class="text-h5"
            :class="[
              this.$route.path === '/' ? 'white--text' : 'primary--text',
            ]"
            >Rent</span
          >
          <span
            class="text-h5 font-weight-bold"
            :class="[
              this.$route.path === '/'
                ? 'white--text'
                : 'navigattionDrawer--text',
            ]"
            >Finder</span
          >
        </router-link>

        <!-- Humburger Menu -->
        <div class="navbar__humburger" @click="toggleNavbar">
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </div>

        <!-- Links -->
        <div class="navbar__links flex-grow-1 d-flex align-center">
          <router-link
            class="ma-4"
            :class="[this.$route.path === '/' ? 'white--text' : 'third--text']"
            :to="{ name: '' }"
            >Search for a house</router-link
          >
          <router-link
            class="ml-sm-0 ml-sm-auto ma-4"
            :class="[this.$route.path === '/' ? 'white--text' : 'third--text']"
            :to="{ name: 'login' }"
            >Log in</router-link
          >
          <router-link
            class="ma-4"
            :class="[this.$route.path === '/' ? 'white--text' : 'third--text']"
            :to="{ name: 'signup' }"
            >Sign up</router-link
          >
        </div>
      </v-container>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {
    toggleNavbar() {
      let navbar = document.querySelector(".navbar__links");
      let lines = document.querySelectorAll(".line");

      if (this.collapsed) {
        lines[0].setAttribute(
          "style",
          "background-color: #fff; width: 30px;height: 2px; margin: 5px; transition: all 0.3s ease-in-out;"
        );
        lines[1].setAttribute(
          "style",
          "background-color: #fff; width: 30px;height: 2px; margin: 5px; transition: all 0.3s ease-in-out;"
        );
        lines[2].setAttribute(
          "style",
          "background-color: #fff; width: 30px;height: 2px; margin: 5px; transition: all 0.3s ease-in-out;"
        );
        navbar.style.height = "0";

        this.collapsed = false;
      } else {
        // Change lines color to primary
        for(let i = 0; i < lines.length; i++) {
          lines[i].style.backgroundColor = '#008DE9';
        }
        lines[0].style.transform = "translateY(10px) rotate(225deg)";
        lines[1].setAttribute(
          "style",
          "opacity:0; -moz-opacity:0; filter:alpha(opacity=0)"
        );
        lines[2].style.transform = "translateY(-5px) rotate(-227deg)";

        navbar.style.height = "100vh";
        this.collapsed = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
  // Hide the actual navbar and show the humburger menu
  .navbar__links {
    display: none !important;
    background-color: #e2e2e2;
    position: fixed;
    top: 0%;
    left: 0;
    font-size: 20px;
    right: 0;
    bottom: 0%;
    width: auto;
    height: 0vh;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
    margin-top: 0 !important;

    a {
      color: $primary-color !important;
    }
  }

  .navbar__humburger {
    display: block;
    cursor: pointer;
    position: fixed;
    right: 30px;
    z-index: 10;

    .line {
      display: block;
      width: 30px;
      height: 2px;
      background: #fff;
      margin: 5px;
      transition: all 0.3s ease-in-out;
    }
  }
}
</style>
