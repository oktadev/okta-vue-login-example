# Vue Login Example

This example app shows how to add login and access control to a Vue app.

Please read [Vue Login and Access Control the Easy Way](https://developer.okta.com/blog/2020/05/15/vue-login) to see how this app was created.

**Prerequisites:** [Node.js](https://nodejs.org/).

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage, and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To install this example application, run the following commands:

```bash
git clone https://github.com/oktadeveloper/okta-vue-login-example.git
cd okta-vue-login-example
npm install
```

This will get a copy of the project installed locally. Start the app using:

```bash
npm run serve
```

You won't be able to log in until you register this app with Okta.

### Create an Application in Okta

You will need to create an OpenID Connect Application in Okta to get your values to perform authentication.

Log in to your Okta Developer account (or [sign up](https://developer.okta.com/signup/) if you don’t have an account) and navigate to **Applications** > **Add Application**. Click **Single-Page App**, click **Next**, give the app a name you’ll remember, set the Login redirect URI to `http://localhost:8080/callback`, and click **Done**.

Set the `issuer` and copy the `clientId` into `src/router.js`.

```javascript
Vue.use(Auth, {
  issuer: 'https://{YourOktaDomain}/oauth2/default',
  client_id: '{ClientId}',
  redirect_uri: window.location.origin + '/callback',
  scopes: ['openid','profile'],
  pkce: true
});
```

Now you should be able to login at `http://localhost:8080`! 

## Links

This example uses the following libraries provided by Okta:

* [Okta Vue SDK](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-vue)

## Help

Please post any questions as comments on the [blog post](https://developer.okta.com/blog/2020/05/15/vue-login), or visit our [Okta Developer Forums](https://devforum.okta.com/). You can also email developers@okta.com if you would like to create a support ticket.

## License

Apache 2.0, see [LICENSE](LICENSE).
