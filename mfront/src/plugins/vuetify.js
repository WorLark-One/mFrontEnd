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
                primary: '#006d77',
                secondary: '#83c5be',
                fondo: '#edf6f9',
                accent: '#e29578',
                error: '#F17300',
                info: '#ffddd2',
                success: '#a8dadc',
                warning: '#e63946'
            },
        },
    }
});
