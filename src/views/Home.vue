<template>
    <div class="home">
        <Banner />
        <GlobalStatistics />

        <!-- Featured Houses -->
        <section class="featured-houses py-16">
            <v-container>
                <h4 class="text-h4 font-weight-bold mb-4">Featured Houses</h4>
            </v-container>
            <CardAnnouncement />
        </section>
    </div>
</template>

<script>
import Banner from "@/components/home/Banner.vue";
import GlobalStatistics from "@/components/GlobalStatistics.vue";
import CardAnnouncement from "@/components/CardAnnouncement.vue";
export default {
    name: "Home",
    components: {
        Banner,
        GlobalStatistics,
        CardAnnouncement,
    },
}
</script>