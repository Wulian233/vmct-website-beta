import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme, { VPBadge } from 'vitepress/theme-without-fonts'

import mediumZoom from 'medium-zoom'
import googleAnalytics from '../google-analytics'

import MyLayout from './components/MyLayout.vue'

import Link from './components/Link.vue'
import Coins from './components/Coins.vue'
import DownloadLinks from './components/DownloadLinks.vue'
import Card from '../theme/components/Card.vue'
import LinkGrid from '../theme/components/LinkGrid.vue'

import 'uno.css'
import './styles/blur.css'
import './styles/vars.css'
import './styles/main.css'
import './styles/ui.css'


export default {
  ...DefaultTheme,
  Layout: MyLayout,

  enhanceApp({ app }) {
    googleAnalytics({ id: 'G-98VEMPQYQD', debug: false });

    const components = { Link, Coins, Card, DownloadLinks, LinkGrid, VPBadge };
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  },

  setup() {
    const route = useRoute();

    const handleRouteChange = () => nextTick(initZoom);

    onMounted(initZoom);
    watch(() => route.path, handleRouteChange);
  },
};

const initZoom = () => {
  mediumZoom('.main img:not(.no-zoomable)', {
    background: 'var(--vp-c-bg)',
  })
}
