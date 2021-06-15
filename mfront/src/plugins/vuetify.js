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
                primary: '#457b9d',
                secondary: '#457b9d',
                fondo: '#f1faee',
                accent: '#a8dadc',
                error: '#F17300',
                info: '#DBE4EE',
                success: '#a8dadc',
                warning: '#e63946'
            },
        },
    }
});
