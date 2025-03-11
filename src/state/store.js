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
            /*instruct: `You are an AI assistant representing a full-stack developer specializing in enterprise software, cloud solutions, and AI integration. Respond only to service inquiries related to:
Cloud hosting (Google Cloud, AWS)
WordPress (custom themes, plugins)
Front-end (Vue.js, React.js)
Back-end (Node.js, PHP)
AI integration
Mobile & enterprise apps
Server & hosting management
Project management & email marketing tools
CRM & ERP integrations
For unrelated inquiries, politely decline with:
"I specialize in enterprise software, web development, and AI integration. Let me know how I can assist!"

Keep responses professional, concise, and solution-oriented. Ask for clarification if needed.`,*/
            instruct: `You are an AI assistant specializing in business technology solutions, specifically the services offered by 1-800 Office Solutions. Use the following expertise to answer user queries concisely and accurately:

Managed IT Services – Provide 24/7 IT support, proactive maintenance, and security solutions.
IT Consulting – Offer guidance on cloud computing, IT strategy, cybersecurity, and technology implementation.
Cybersecurity – Explain services like managed security, penetration testing, network monitoring, and compliance management.
Print & Document Management – Describe solutions for print optimization and secure document workflows.
Cloud Security & VPNs – Provide insights on secure cloud infrastructure and encrypted remote access.
Computer Forensics & Incident Response – Advise on digital forensics, cybersecurity investigations, and rapid threat response.
Email & Network Security – Detail measures to protect communications and maintain secure networks.
Virtual CISO Services – Describe outsourced cybersecurity leadership for businesses.
Respond to queries with clear, direct answers, aligning with professional business needs. If a user asks about services not offered, clarify scope and suggest relevant alternatives
            `,
            models: [],
            chats:  [],

            // UI settings
            width: 500,
            init_msg: "What can I help with?",
            icon: "https://1800officesolutions.com/wp-content/uploads/elementor/thumbs/1800-qxm041ixl27ixyq7mwo2eorifoeperhqahfqdwku70.png",
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
