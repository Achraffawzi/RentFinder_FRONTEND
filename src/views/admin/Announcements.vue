<template>
  <div class="announcements">
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
export default {
  name: "Announcements",

  data: () => ({
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
      { text: "Location", value: "Location", filterable: true, sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    announcements: [],
    editedIndex: -1,
    editedItem: {
      Title: "",
      Price: 0,
      Location: "",
    },
    defaultItem: {
      Title: "",
      Price: 0,
      Location: "",
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
      this.announcements = [
        {
          Title: "Sergio",
          Price: 30,
          Location: "Paris",
        },
        {
          Title: "Achraf",
          Price: 10,
          Location: "London",
        },
      ];
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
