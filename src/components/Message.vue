<template>
    <div :class="`chat from-${chat.role}`">
        <div class="chat-date">{{FormatDate}}</div>
        <div v-html="chat.message"></div>
    </div>
</template>

<script>
import moment from "moment";
export default {
    props: ['chat'],
    computed: {
        FormatDate() {
            return moment(this.chat.timestamp).format("MMMM D, YYYY h:mm A");
        }
    }
}
</script>
