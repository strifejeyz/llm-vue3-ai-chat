import {createStore} from 'vuex';
import createPersistedState from 'vuex-persistedstate';
export default createStore({
    state: {
        snackbar: {
            visible: false,
            content: '',
            icon: '',
            type: 'success',
        },
        config: {
            model: "mistral-7b-instruct-v0.3",
            baseurl: "https://lmstudio.codestrife.site",
            prompt: "",
            instruct: "You are an AI assistant. Keep responses short and informative.",
            models: [],
            chats:  [],

            // UI settings
            width: 500,
            init_msg: "What can I help with?",
            icon: "https://gravatar.com/avatar/8eaa69e8312fa88456f0bbad796adc20?s=200&d=robohash&r=x",
            title: "Assistant",
            visible: true,
            theme: "dark", // light or dark
        }
    },
    actions: {
        SetSnackbar({commit}, params) {
            commit('SET_ANY_STATE', {
                target: 'snackbar',
                value: params
            });
        },
        SetError({commit}, message) {
            commit('SET_SNACKBAR', {
                visible: true,
                content: message,
                type: 'error',
                icon: 'mdi-alert-circle-outline'
            });
        },
        SetSuccess({commit}, message) {
            commit('SET_SNACKBAR', {
                visible: true,
                content: message,
                type: 'success',
                icon: 'mdi-check-all'
            });
        },
        SetAnyState({commit}, params) {
            commit('SET_ANY_STATE', params)
        },
        AddChat({commit, state}, chat) {
            const config = {...state.config};
            config.chats.push(chat)
            commit('SET_ANY_STATE', {
                target: "config",
                value: config,
            });
        },
        EditConfig({commit, state}, {target,value}) {
            const config = {...state.config};
            config[target] = value;
            commit('SET_ANY_STATE', {
                target: "config",
                value: config,
            });
        }
    },
    mutations: {
        SET_SNACKBAR(state, params) {
            state.snackbar.visible = params.visible;
            state.snackbar.content = params.content;
            state.snackbar.icon = params.icon;
            state.snackbar.type = params.type;
        },
        SET_ANY_STATE(state, {target, value}) {
            state[target] = value;
        },
    },

    // Persist your state
    plugins: [createPersistedState({
        paths: ['config'],
    })]
});
