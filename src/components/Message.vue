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
<style scoped>
.chat {
    border-radius: 20px;
    padding: 15px;
    margin: 10px;
    box-shadow: 0 5px 5px #eaeaea;
    .chat-date {
        font-size: 10px;
        opacity: .7;
        margin-bottom: 5px
    }
    &.from-ai {
        background: #ffffff;
        width: fit-content;
        max-width: 300px;
    }
    &.from-human {
        background: #0067ff;
        width: fit-content;
        max-width: 300px;
        color: #ffffff;
        margin-left: auto;
    }
}
</style>
