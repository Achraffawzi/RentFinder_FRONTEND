<template>
  <div class="house-owners">
    <!-- Upper div for sorting and searching -->
    <div class="sort-search d-flex align-center justify-space-between">
      <div class="sort">
        <v-btn depressed class="subtitle-2 font-weight-regular text-lowercase">
          <v-icon small>person</v-icon>
          <span>sort by Lastname</span>
        </v-btn>
        <v-btn depressed class="subtitle-2 font-weight-regular text-lowercase">
          <v-icon small>location_on</v-icon>
          <span>sort by City</span>
        </v-btn>
      </div>
      <div class="search">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </div>
    </div>
    <v-data-table
      :headers="headers"
      :items="houseOwners"
      sort-by="LastName"
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
        <v-toolbar flat>
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
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "HouseOwners",

  data: () => ({
    search: "",
    dialogDelete: false,
    headers: [
      {
        text: "Firstname",
        align: "start",
        sortable: false,
        filterable: false,
        value: "FirstName",
      },
      { text: "Lastname", value: "LastName", filterable: true, },
      { text: "phone number", value: "PhoneNumber", filterable: false, },
      { text: "City", value: "City", filterable: false, },
      { text: "Avatar", value: "Avatar", filterable: false, },
      { text: "Actions", value: "actions", sortable: false },
    ],
    houseOwners: [],
    editedIndex: -1,
    editedItem: {
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      City: "",
      Avatar: "",
    },
    defaultItem: {
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      City: "",
      Avatar: "",
    },
  }),

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.houseOwners = [
        {
          FirstName: "Achraf",
          LastName: "FAWZI",
          PhoneNumber: "9910294855",
          City: "London",
          Avatar:
            "https://www.realmadrid.com/img/vertical_380px/ramos_ficha_550x650_20210630115027.jpg",
        },
      ];
    },

    deleteItem(item) {
      this.editedIndex = this.houseOwners.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      // Impl Delete house owner api
      this.houseOwners.splice(this.editedIndex, 1);
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
