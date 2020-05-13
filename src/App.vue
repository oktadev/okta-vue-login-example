<template>
  <div id="app">
    <md-toolbar color="primary" class="expanded-toolbar">
      <span class="branding">
        <md-button><router-link to="home">{{title}}</router-link></md-button>
        <md-button><router-link to="home"><md-icon>home</md-icon></router-link></md-button>
      </span>
      <md-button v-if='authenticated' v-on:click='logout' id='logout-button'>Logout</md-button>
      <md-button v-else v-on:click='login' id='login-button'>Login</md-button>
      <md-menu md-direction="bottom-start">
        <md-button md-menu-trigger>
          <md-icon>menu</md-icon>
        </md-button>
        <md-menu-content>
          <md-menu-item @click="$router.safeNavigate($route, 'home')">Home</md-menu-item>
          <md-menu-item @click="$router.safeNavigate($route, 'read')">Read</md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-toolbar>
    <div class="router">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    title: "Vue Groups",
    authenticated: false
  }),
  watch: {
    '$route': 'isAuthenticated'
  },
  methods: {
    async isAuthenticated () {
      this.authenticated = await this.$auth.isAuthenticated()
    },
    login () {
      this.$auth.loginRedirect('/')
    },
    async logout () {
      await this.$auth.logout();
      await this.isAuthenticated();
      if (this.$route.path !== '/') this.$router.push({ path: '/' })
    }
  },
  created() {
    this.isAuthenticated();
  }
}
</script>

<style>
#app {
  font-family: 'Ubuntu', sans-serif;
}

.branding {
  flex: 1;
  text-align: left;
}

h1, h2 {
  text-align: center;
}

.router {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.content {
  padding-top: 16px;
  padding-bottom: 16px;
  width: 1024px;
}
</style>
