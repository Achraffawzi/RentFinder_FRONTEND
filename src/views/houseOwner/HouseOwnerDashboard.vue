<template>
  <div class="dashboard">
    <Navbar />
    <v-container>
      <BaseSnackbar
        v-if="show"
        :show="show"
        :message="snackbarMsg"
        :color="snackbarColor"
        v-on:closeSnackbar="show = false"
      />

      <v-switch
        :value="darkMode"
        @change="toggleDarkMode"
        :label="`toggle ${switchLabel} mode`"
      ></v-switch>

      <!-- Statistic numbers -->
      <v-row v-if="analytics !== null">
        <v-col cols="12" sm="4" v-for="item in houseNumbers" :key="item.title">
          <DashboardNumbers :data="item" />
        </v-col>
      </v-row>

      <!-- Data Table -->
      <v-data-table
        :headers="headers"
        :items="announcements"
        sort-by="Price"
        class="elevation-1 mt-16"
      >
        <!-- custom Price template -->
        <template v-slot:[`item.Price`]="{ item }">
          <span class="font-weight-bold">${{ item.Price }}</span>
        </template>
        <!-- custom availability template -->
        <template v-slot:[`item.IsAvailable`]="{ item }">
          <v-chip :color="getColor(item.IsAvailable)" dark>
            {{ formatAvailability(item.IsAvailable) }}
          </v-chip>
        </template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              <v-btn class="text-lowercase">Sort by price</v-btn>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Announcement
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.Title"
                          label="Title"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.Location"
                          label="City"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.Price"
                          label="Price"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.TotalFloors"
                          label="Total floors"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.TotalBathrooms"
                          label="Total bathrooms"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.TotalLivingrooms"
                          label="Total livingrooms"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.TotalKitchens"
                          label="Total kitchens"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.TotalBedrooms"
                          label="Total bedrooms"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.Surface"
                          label="Surface"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-textarea
                        label="Description"
                        v-model="editedItem.Description"
                      ></v-textarea>
                    </v-row>
                    <v-row v-if="formTitle === 'Edit Announcement'">
                      <v-select
                        label="Available"
                        :items="available"
                        v-model="editedItem.IsAvailable"
                      ></v-select>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <!-- =================== NEXT DIALOG FOR ANNOUNCEMENT IMAGES UPLOAD ================ -->
                  <v-dialog v-model="dialogImagesUpload" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        color="blue darken-1"
                        text
                        @click="save"
                      >
                        Save and next
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="text-h5 grey lighten-2">
                        Upload images
                      </v-card-title>

                      <v-card-text>
                        <v-file-input
                          multiple
                          label="Upload images"
                        ></v-file-input>
                      </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          text
                          @click="dialogImagesUpload = false"
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <!-- =================== NEXT DIALOG FOR ANNOUNCEMENT IMAGES UPLOAD ================ -->
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
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
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import { createApiEndPoints, END_POINTS } from "../../../api.js";
import BaseSnackbar from "@/components/BaseSnackbar.vue";
import Navbar from "@/components/houseOwner/Navbar.vue";
import DashboardNumbers from "@/components/DashboardNumbers.vue";
export default {
  name: "HouseOwnerDashboard",
  components: {
    Navbar,
    BaseSnackbar,
    DashboardNumbers,
  },
  data() {
    return {
      //#region Component Dialogs
      dialog: false,
      dialogImagesUpload: false,
      dialogDelete: false,
      //#endregion

      darkMode: false,
      available: ["Yes", "No"],

      //#region
      show: false,
      snackbarMsg: "",
      snackbarColor: "",
      //#endregion

      //#region Data table properties
      headers: [
        {
          text: "Title",
          align: "start",
          value: "Title",
          sortable: false,
        },

        { text: "Description", value: "Description", sortable: false },
        { text: "Price", value: "Price" },
        { text: "City", value: "Location", sortable: false },
        { text: "Total Floors", value: "TotalFloors", sortable: false },
        { text: "Total Bathrooms", value: "TotalBathrooms", sortable: false },
        {
          text: "Total Livingrooms",
          value: "TotalLivingrooms",
          sortable: false,
        },
        { text: "Total Kitchens", value: "TotalKitchens", sortable: false },
        { text: "Total Bedrooms", value: "TotalBedrooms", sortable: false },
        { text: "Surface", value: "Surface", sortable: false },
        { text: "Available", value: "IsAvailable", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      //#endregion

      //#region Main Data
      announcements: [],
      editedIndex: -1,
      editedItem: {
        Id: 0,
        Title: "",
        Description: "",
        IsAvailable: 0,
        TotalLivingrooms: 0,
        TotalBathrooms: 0,
        TotalBedrooms: 0,
        TotalFloors: 0,
        TotalKitchens: 0,
        Location: 0,
        Surface: 0,
        Price: 0,
      },
      defaultItem: {
        id: 0,
        title: "",
        photos: "",
        city: "",
        price: 0,
        description: "",
        totalfloors: 0,
        totalbathrooms: 0,
        totallivingrooms: 0,
        totalkitchens: 0,
        totalbedrooms: 0,
        surface: 0,
        isAvailable: 1,
      },
      //#endregion

      //#region Statistics Numbers
      analytics: null,
      houseNumbers: null,
      //#endregion
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Announcement" : "Edit Announcement";
    },
    switchLabel: function () {
      return this.darkMode ? "light" : "dark";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.initialize();
    this.getHousesAnalytics();
  },

  methods: {
    toggleDarkMode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.darkMode = !this.darkMode;
    },

    async initialize() {
      try {
        const req = createApiEndPoints(END_POINTS.GET_ANNOUNCEMENTS_OF_USER);
        const response = await req.fetch();
        this.announcements = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async getHousesAnalytics() {
      try {
        const req = createApiEndPoints(END_POINTS.GET_ANNOUNCEMENTS_ANALYTICS);
        const response = await req.fetch();
        this.analytics = response.data;
        this.houseNumbers = [
          {
            title: "Available Houses",
            icon: "event_available",
            value: this.analytics?.housesAvailable,
          },
          {
            title: "Rented Houses",
            icon: "event_busy",
            value: this.analytics?.housesNotAvailable,
          },
          {
            title: "Total Houses",
            icon: "functions",
            value: this.analytics?.totalHouses,
          },
        ];
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
      } catch (e) {
        this.show = true;
        this.snackbarMsg = "something went wrong!";
        this.snackbarColor = "error";
      }
    },

    async onCreateAnnouncement() {
      try {
        console.log("inside try");
        let newAnnouncement = {
          title: this.editedItem.title,
          description: this.editedItem.description,
          isAvailable: this.editedItem.isAvailable,
          totalLivingrooms: parseInt(this.editedItem.totallivingrooms),
          totalBathrooms: parseInt(this.editedItem.totalbathrooms),
          totalBedrooms: parseInt(this.editedItem.totalbedrooms),
          totalFloors: parseInt(this.editedItem.totalfloors),
          totalKitchens: parseInt(this.editedItem.totalkitchens),
          location: this.editedItem.city,
          surface: parseInt(this.editedItem.surface),
          price: parseFloat(this.editedItem.price),
        };
        console.log("finishing object");
        console.log(newAnnouncement.price);

        const req = createApiEndPoints(END_POINTS.CREATE_ANNOUNCEMENT);
        const response = await req.create({ ...newAnnouncement });

        this.show = true;
        this.snackbarMsg = response.data.message;
        this.snackbarColor = "success";
      } catch (e) {
        this.show = true;
        this.snackbarMsg = "something went wrong!";
        this.snackbarColor = "error";
      }
    },

    async onEditAnnouncement(announcement) {
      try {
        const req = createApiEndPoints(
          END_POINTS.UPDATE_ANNOUNCEMENT + "" + announcement.Id + "/update"
        );
        announcement.IsAvailable = announcement.IsAvailable === "Yes" ? 1 : 0;
        const response = await req.update({
          title: announcement.Title,
          description: announcement.Description,
          isAvailable: announcement.IsAvailable,
          totalLivingrooms: announcement.TotalLivingrooms,
          totalBathrooms: announcement.TotalBathrooms,
          totalBedrooms: announcement.TotalBedrooms,
          totalFloors: announcement.TotalFloors,
          totalKitchens: announcement.TotalKitchens,
          location: announcement.Location,
          surface: announcement.Surface,
          price: announcement.Price,
        });

        this.show = true;
        this.snackbarMsg = response.data.message;
        this.snackbarColor = "success";
      } catch (e) {
        this.show = true;
        this.snackbarMsg = "something went wrong!";
        this.snackbarColor = "error";
      }
    },

    formatAvailability(availability) {
      return availability ? "Yes" : "No";
    },

    getColor(availability) {
      return availability ? "success" : "red";
    },

    editItem(item) {
      this.editedIndex = this.announcements.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.IsAvailable = item.IsAvailable === 1 ? "Yes" : "No";
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.announcements.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.onDeleteAnnouncement(this.editedItem.Id);
      this.announcements.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.onEditAnnouncement(this.editedItem);
        Object.assign(this.announcements[this.editedIndex], this.editedItem);
      } else {
        // Impl new announcement functionality
        this.onCreateAnnouncement();
        this.announcements.push(this.editedItem);
      }
      this.close();
      this.dialogImagesUpload = true;
    },
  },
};
</script>
