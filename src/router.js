import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Edit from './components/Edit.vue'
import Read from './components/Read.vue'
import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: 'https://dev-322018.oktapreview.com/oauth2/default',
  client_id: '0oaqg7wcbinbloxq50h7',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scopes: ['openid','profile','groups'],
});

const authGuard = (group) => async function(to, from, next) {
  console.log('AUTH', await router.app.$auth.oktaAuth.tokenManager.get('idToken'));
  if (group) {
    // Check if user is member of the group.
    // This should be contained in the claims stored in the idToken.
  }
  const authenticated = await router.app.$auth.isAuthenticated();
  if (authenticated) {
    next();
  } else {
    router.app.$auth.loginRedirect(to.path);
    next(false);
  }
}

Vue.use(Router)

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
      beforeEnter: authGuard()
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit,
      beforeEnter: authGuard('Editors')
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

export default router;
