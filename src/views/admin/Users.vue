<template>
  <div class="users">
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
      :items="houseOwners"
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
export default {
  name: "Users",

  data: () => ({
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
          FirstName: "Sergio",
          LastName: "Ramos",
          PhoneNumber: "9910294855",
          City: "Paris",
          Avatar:
            "https://www.realmadrid.com/img/vertical_380px/ramos_ficha_550x650_20210630115027.jpg",
        },
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

    sortBy(prop) {
      this.houseOwners.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
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
