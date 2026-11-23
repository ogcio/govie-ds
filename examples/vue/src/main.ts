import '@ogcio/theme-govie/theme.css';
import '@ogcio/design-system-vue/styles.css';
import '@ogcio/design-system-vue/fonts.css';
import './styles.css';
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';

createApp(App).use(router).mount('#app');
