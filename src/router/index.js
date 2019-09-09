import Vue from 'vue'
import Router from 'vue-router'
import BackgroundCanvas from '../components/SpaceWorld.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'BackgroundCanvas',
            component: BackgroundCanvas
        }
    ]
})