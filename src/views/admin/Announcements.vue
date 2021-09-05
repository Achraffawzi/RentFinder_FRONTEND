<template>
  <div class="announcements">
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
          @click="sortBy('Price')"
        >
          <v-icon small>money</v-icon>
          <span>sort by Price</span>
        </v-btn>
        <v-btn
          depressed
          class="subtitle-2 font-weight-regular text-lowercase"
          @click="sortBy('Location')"
        >
          <v-icon small>location_on</v-icon>
          <span>sort by Location</span>
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
      :items="announcements"
      class="elevation-1"
      :search="search"
    >
      <!-- Avatar template -->
      <template v-slot:[`item.Avatar`]="{ item }">
        <v-avatar size="48">
          <img :src="item.Avatar" alt="avatar" />
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
import { createApiEndPoints, END_POINTS } from "../../../api";
import BaseSnackbar from "@/components/BaseSnackbar.vue";
export default {
  name: "Announcements",

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
          text: "Title",
          align: "start",
          sortable: false,
          filterable: false,
          value: "Title",
        },
        {
          text: "Price",
          value: "Price",
          filterable: false,
          sortable: true,
        },
        {
          text: "Location",
          value: "Location",
          filterable: true,
          sortable: true,
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      announcements: [],
      editedIndex: -1,
      editedItem: [
        {
          Id: 0,
          Title: "",
          Description: "",
          Photos: "",
          Price: 0,
          Location: "",
          TotalFloors: 0,
          TotalBathrooms: 0,
          TotalLivingrooms: 0,
          TotalKitchens: 0,
          TotalBedrooms: 0,
          Surface: 0,
          IsAvailable: 0,
          UserId: 0,
        },
      ],
      defaultItem: [
        {
          Id: 0,
          Title: "",
          Description: "",
          Photos: "",
          Price: 0,
          Location: "",
          TotalFloors: 0,
          TotalBathrooms: 0,
          TotalLivingrooms: 0,
          TotalKitchens: 0,
          TotalBedrooms: 0,
          Surface: 0,
          IsAvailable: 0,
          UserId: 0,
        },
      ],
    };
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.initialize();
  },

  methods: {
    async initialize() {
      try {
        const req = createApiEndPoints(END_POINTS.GET_ANNOUNCEMENTS);
        const response = await req.fetch();
        this.announcements = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async onDeleteAnnouncement(announcementID) {
      try {
        const req = createApiEndPoints(
          END_POINTS.DELETE_ANNOUNCEMENT + "" + announcementID + "/delete"
        );
        const response = await req.deleteFromParams();

        this.show = true;
        this.snackbarMsg = response.data.message;
        this.snackbarColor = "success";
        console.log(response);
      } catch (e) {
        this.show = true;
        this.snackbarMsg = "something went wrong!";
        this.snackbarColor = "error";
      }
    },

    sortBy(prop) {
      this.announcements.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },

    deleteItem(item) {
      this.editedIndex = this.announcements.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      // Impl Delete house owner api
      this.onDeleteAnnouncement(this.editedItem.Id);
      this.announcements.splice(this.editedIndex, 1);
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
