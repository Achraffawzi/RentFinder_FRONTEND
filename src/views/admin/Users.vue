<template>
  <div class="users">
    <BaseSnackbar
      v-if="show"
      :show="show"
      :message="snackbarMsg"
      :color="snackbarColor"
      v-on:closeSnackbar="show = false"
    />
    <!-- Upper div for sorting and searching -->
    <div
      class="
        sort-search
        d-flex
        align-center
        justify-space-between
        flex-wrap
        mb-16
      "
    >
      <div class="sort">
        <v-btn
          depressed
          class="subtitle-2 font-weight-regular text-lowercase"
          @click="sortBy('LastName')"
        >
          <v-icon small>person</v-icon>
          <span>sort by Lastname</span>
        </v-btn>
        <v-btn
          depressed
          class="subtitle-2 font-weight-regular text-lowercase"
          @click="sortBy('City')"
        >
          <v-icon small>location_on</v-icon>
          <span>sort by City</span>
        </v-btn>
      </div>
      <div class="search">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          hide-details
          class="ma-0 pa-0"
        ></v-text-field>
      </div>
    </div>
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
      :search="search"
    >
      <!-- Avatar template -->
      <template v-slot:[`item.Avatar`]="{ item }">
        <v-avatar size="48">
          <img
            :src="'http://localhost:4000/static/images/user/' + item.Avatar"
            alt="avatar"
          />
        </v-avatar>
      </template>
      <!-- Dialog template -->
      <template v-slot:top>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this user?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { createApiEndPoints, END_POINTS } from "../../../api.js";
import BaseSnackbar from "@/components/BaseSnackbar.vue";
export default {
  name: "Users",

  components: { BaseSnackbar },

  data() {
    return {
      show: false,
      snackbarMsg: "",
      snackbarColor: "",
      search: "",
      dialogDelete: false,
      headers: [
        {
          text: "FirstName",
          align: "start",
          sortable: false,
          filterable: false,
          value: "FirstName",
        },
        {
          text: "LastName",
          value: "LastName",
          filterable: true,
          sortable: true,
        },
        {
          text: "phone number",
          value: "PhoneNumber",
          filterable: false,
          sortable: false,
        },
        { text: "City", value: "City", filterable: false, sortable: true },
        { text: "Avatar", value: "Avatar", filterable: false, sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        Id: 0,
        FirstName: "",
        LastName: "",
        PhoneNumber: "",
        City: "",
        Avatar: "",
      },
      defaultItem: {
        Id: 0,
        FirstName: "",
        LastName: "",
        PhoneNumber: "",
        City: "",
        Avatar: "",
      },
    };
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      try {
        const req = createApiEndPoints(END_POINTS.GET_ALL_USERS);
        const response = await req.fetch();
        this.users = response.data.users;
      } catch (e) {
        console.log(e);
      }
    },

    sortBy(prop) {
      this.users.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      // Impl Delete house owner api
      try {
        const req = createApiEndPoints(END_POINTS.DELETE_USER);
        console.log("this.editedItem.Id => " + this.editedItem.Id);
        await req.delete({userId: this.editedItem.Id});


        this.users.splice(this.editedIndex, 1);


        this.show = true;
        this.snackbarMsg = "User has been deleted successfully";
        this.snackbarColor = "success";
      } catch (e) {
        console.log(e);
        this.show = true;
        this.snackbarMsg = "Something went wrong!";
        this.snackbarColor = "error";
      }
      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
