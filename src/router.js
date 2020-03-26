import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Edit from './components/Edit.vue'
import Read from './components/Read.vue'
import Auth from '@okta/okta-vue'
import { isInGroup } from './auth-guards'

Vue.use(Router)
Vue.use(Auth, {
  issuer: 'https://dev-322018.oktapreview.com/oauth2/default',
  client_id: '0oak3zy3jhU7IZdW70h7',
  redirect_uri: window.location.origin + '/implicit/callback',
  scopes: ['openid','profile'],
});

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/read',
      name: 'read',
      component: Read,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit,
      meta: {
        requiresAuth: true,
      },
      beforeEnter: isInGroup('editor')
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '*',
      beforeEnter: (to, from, next) => {
        next('/');
      }
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router;
