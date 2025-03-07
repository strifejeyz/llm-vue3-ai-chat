<template>
    <v-row justify="center">
        <v-dialog scrim="rgba(0, 0, 0, 0.8)" v-model="dialog" :fullscreen="fullscreen" persistent :max-width="max_width" :max-height="max_height" :scrim="false" transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark :color="color ? color : 'info'">
                    <template v-if="$slots.toolbar">
                        <slot name="toolbar"/>
                    </template>
                    <template v-else>
                        <v-toolbar-title :text="title"/>
                        <v-spacer/>
                        <v-btn icon dark @click="$emit('close')">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </template>
                </v-toolbar>
                <slot></slot>
                <v-footer :color="footer_color" v-if="$slots.footer" class="border-t">
                    <slot name="footer"></slot>
                </v-footer>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    props: ['visible','title','fullscreen','max_width','max_height','color','footer_color'],
    data:() => ({
        dialog: false,
    }),
    mounted() {
        this.dialog = this.visible;
        this.$emit('onmount')
    },
    watch: {
        visible(newValue) {
            this.dialog = newValue;
        },
    },
}
</script>
