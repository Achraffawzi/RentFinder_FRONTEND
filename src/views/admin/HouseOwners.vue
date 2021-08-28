<template>
  <div class="house-owners">
    <v-data-table
      :headers="headers"
      :items="houseOwners"
      sort-by="LastName"
      class="elevation-1"
    >
      <!-- Avatar template -->
      <template v-slot:[`item.Avatar`]="{ item }">
        <v-avatar color="teal" size="48">
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
    dialogDelete: false,
    headers: [
      {
        text: "Firstname",
        align: "start",
        sortable: false,
        value: "FirstName",
      },
      { text: "Lastname", value: "LastName" },
      { text: "phone number", value: "PhoneNumber" },
      { text: "City", value: "City" },
      { text: "Avatar", value: "Avatar" },
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
