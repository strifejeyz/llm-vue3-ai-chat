<script>
import {mapActions, mapState} from "vuex";
export default {
    name: "Alerts",
    methods: {
        ...mapActions(['SetSnackbar', 'SetDialog']),
    },
    computed: {
        ...mapState(['snackbar'])
    }
}
</script>

<template>
    <div>
        <v-snackbar v-model="snackbar.visible" :color="snackbar.type">
            <template v-if="snackbar.icon">
                <v-icon class="mr-2">{{ snackbar.icon }}</v-icon>
            </template>
            {{ snackbar.content }}
            <template v-slot:action="{ attrs }">
                <v-btn color="blue" text v-bind="attrs" @click="SetSnackbar({visible:false,content:''})">Close</v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
