<template>
    <div class="home">
        <Banner />
        <GlobalStatistics />
    </div>
</template>

<script>
import Banner from "@/components/home/Banner.vue";
import GlobalStatistics from "@/components/GlobalStatistics.vue";
export default {
    name: "Home",
    components: {
        Banner,
        GlobalStatistics,
    },
}
</script>