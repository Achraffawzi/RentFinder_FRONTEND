<template>
    <div class="global-stats py-10 text-center">
        <v-container>
            <v-row>
                <v-col cols="12" md="4" v-for="stat in statistics" :key="stat.title">
                    <h4 class="text-h4 font-weight-bold">{{ formatStats(stat.value) }}</h4>
                    <p class="third--text font-weight-bold">{{ stat.title }}</p>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "GlobalStatistics",
    data() {
        return {
            statistics: [
                { title: "Total House owners", value: 1300 },
                { title: "Total users", value: 44030 },
                { title: "Total Announcements", value: 300 },
            ]
        }
    },
    methods: {
        // Format the stats values
        formatStats(value) {
            return value >= 1000 ? ((value / 1000).toFixed(0)).toString() + "k+" : value;
        }
    }
}
</script>