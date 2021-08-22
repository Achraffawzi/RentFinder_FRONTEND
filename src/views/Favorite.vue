<template>
  <div class="favorite">
    <Navbar />

    <v-container>
      <!-- favorite houses section  -->
      <h4 class="text-h4 font-weight-bold mb-10">Favorite Houses</h4>
      <CardAnnouncement :result="result" />

      <Footer />
    </v-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import CardAnnouncement from "@/components/CardAnnouncement.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Favorite",
  components: {
    CardAnnouncement,
    Navbar,
    Footer,
  },
  data() {
    return {
      result: [
        {
          id: "3",
          city: "Tangier",
          photos: [
            "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F1026205392%2FBeautiful-luxury-home-exterior-at-twilight%2F960x0.jpg%3Ffit%3Dscale",
          ],
          title: "In publishing and graphic design, Lorem ipsum",
          price: 3,
          description:
            "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
          totalfloors: 3,
          totalbathrooms: 3,
          totallivingrooms: 3,
          totalkitchens: 3,
          totalbedrooms: 3,
          surface: 3,
          publicationDate: "24-06-2021",
          rating: 3,
        },
      ],
    };
  },
};
</script>
