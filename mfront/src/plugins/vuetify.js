import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                primary: '#007bff',
                secondary: '#17a2b8',
                accent: '#6c757d',
                fondo: '#edf6f9',
                error: '#F17300',
                info: '#17a2b8',
                success: '#28a745',
                warning: '#ffc107',
                danger: '#dc3545',
                light: '#f8f9fa',
                dark: '#343a40',
                cbtn: '#0bce96',
            },
        },
    }
});
