<template>
    <v-card elevation="0" id="chat-ui" :width="config.width">
        <v-card-title class="chat-header d-flex">
            <img class="chat-icon" :src="config.icon" alt="">
            {{config.title}}
            <v-spacer/>
            <Buttons/>
        </v-card-title>
        <v-card-text v-if="config.visible" class="chat-body">
            <h1 v-if="!config.chats.length" class="text-center mt-5 mb-5">
                {{config.init_msg}}
            </h1>
            <Message v-for="chat in config.chats" :chat="chat"/>
            <Message v-if="response.id" :chat="response"/>
        </v-card-text>
        <v-card-actions v-if="config.visible" class="border-t">
            <div class="chat-prompt-area">
                <textarea ref="textarea" class="prompt-text" @keydown.enter.prevent="SendPrompt" v-model="config.prompt" rows="3" @input="AdjustHeight" placeholder="Ask anything..."/>
                <v-btn @click="SendPrompt" :loading="is_loading" :disabled="!config.prompt" variant="outlined" size="small" class="prompt-btn" icon="mdi-play" color="info"/>
            </div>
        </v-card-actions>
    </v-card>
</template>

<script>
import Axios from "axios"
import {mapState,mapActions} from "vuex";
import Message from "@/components/Message.vue";
import Buttons from "@/components/Buttons.vue";
export default {
    components: {Buttons, Message},
    data:() => ({
        is_loading: false,
        response: {
            id: null,
            role: "ai",
            message: "",
            timestamp: null,
        }
    }),
    computed: {
        ...mapState(['config']),
        History() {
            const {chats,instruct,prompt} = this.config;
            const history = [];
            history.push({ role:"user", content:instruct});
            chats.forEach(chat => {
                let role = chat.role=='ai'?'assistant':'user';
                history.push({role: role,content:chat.message});
            });
            history.push({role: "user",content: prompt});
            return history;
        }
    },
    methods: {
        ...mapActions(['SetAnyState','AddChat','EditConfig']),
        AdjustHeight() {
            this.$nextTick(() => {
                const textarea = this.$refs.textarea;
                if (textarea) {
                    textarea.style.height = "auto";
                    textarea.style.height = textarea.scrollHeight + "px";
                }
            });
        },
        SendPrompt() {
            const { instruct, prompt } = this.config;
            const data = {model: this.config.model,messages: this.History};
            this.is_loading = true;

            // Insert the user prompt
            this.AddChat({
                id: Date.now(),
                role: "human",
                message: prompt,
                timestamp: new Date().toISOString()
            });
            this.EditConfig({target:'prompt',value:''});

            // Set initial AI response message
            this.response.id = Date.now();
            this.response.timestamp = new Date().toISOString();
            this.response.message = "Thinking...";

            Axios.post("/v1/chat/completions",data).then(res => {
                // Populate the response word per word
                let words = res.data.choices[0].message.content.split(" ");
                let count = 0;
                this.response.message = "";
                let interval = setInterval(()=>{
                    if (count < words.length) {
                        this.response.message += words[count]+" ";count++;
                    } else {
                        clearInterval(interval);
                        this.AddChat({...this.response});
                        this.response = {
                            id: null,
                            role: "ai",
                            message: "",
                            timestamp: null,
                        }
                    }
                },50);
                this.is_loading = false;
            }).catch(error => {
                console.error("Error:", error)
            });
        },
    },
    mounted() {
        Axios.defaults.baseURL = this.$store.state.config.baseurl;
        Axios.get('/v1/models').then(res => {
            const config = {...this.config};
            config.models = res.data.data;
            this.SetAnyState({target: 'config',value: config});
        });
    },
    watch: {
        "config.prompt"() {
            this.AdjustHeight();
        },
    },
}
</script>
