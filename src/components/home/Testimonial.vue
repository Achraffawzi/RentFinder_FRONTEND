<template>
  <div class="testomonial text-center">
    <v-card outlined max-width="600" class="pa-4 mx-auto">
      <v-avatar size="100">
        <img src="https://source.unsplash.com/random" alt="" />
      </v-avatar>
      <h4 class="text-h4 font-weight-medium my-3">Ella Johnson</h4>
      <v-rating
      size="20"
        background-color="yellow lighten-3"
        length="5"
        color="yellow"
        value="10"
        readonly
      ></v-rating>
      <v-card-text>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
          officia obcaecati neque voluptas ducimus mollitia sapiente laudantium,
          harum eius impedit.
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Testimonial",
  props: ["reviewsList"],
};
</script>
