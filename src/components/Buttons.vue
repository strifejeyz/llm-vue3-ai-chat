<template>
    <v-btn @click="NewSession" variant="flat" v-if="config.chats.length" size="small" class="mr-3">New Session</v-btn>
    <v-btn @click="ChangeTheme('light')" title="Click for Light theme" v-if="config.theme=='dark'" size="small" icon="mdi-brightness-4" elevation="0"/>
    <v-btn @click="ChangeTheme('dark')" title="Click for Dark theme" v-else size="small" icon="mdi-white-balance-sunny" elevation="0"/>

    <v-btn @click="config.visible=false" v-if="config.visible" size="small" icon="mdi-chevron-down" elevation="0"/>
    <v-btn @click="config.visible=true" v-else size="small" icon="mdi-chevron-up" elevation="0"/>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    computed: {
        ...mapState(['config'])
    },
    methods: {
        ...mapActions(['EditConfig']),
        NewSession() {
            if (confirm("Start a new session?")) {
                this.EditConfig({target:'chats',value:[]});
            }
        },
        ChangeTheme(theme) {
            this.EditConfig({
                target: "theme",
                value: theme
            });
        }
    }
}
</script>
