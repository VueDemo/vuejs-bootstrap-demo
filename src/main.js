import Vue from 'vue'
//import Validator from 'vue-validator'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import { domain, fromNow } from './filters'
import App from './components/App.vue'
import UsersView from './components/UsersView.vue'
import NewsView from './components/NewsView.vue'
import ItemView from './components/ItemView.vue'
import UserView from './components/UserView.vue'
import UserImageView from './components/UserImageView.vue'
import SecretQuote from './components/SecretQuote.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'

import auth from './auth'

Vue.use(VueResource)
Vue.use(Router)

Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

// Check the user's auth status when the app starts
auth.checkAuth()



// register filters globally
Vue.filter('fromNow', fromNow)
Vue.filter('domain', domain)

// routing
export var router = new Router()

router.map({
  '/images': {
    component: UserImageView
  },
  '/users': {
    component: UsersView
  },
  '/news/:page': {
    component: NewsView
  },
  '/user/:id': {
    component: UserView
  },
  '/item/:id': {
    component: ItemView
  },
  '/secretquote': {
    component: SecretQuote
  },
  '/login': {
    component: Login
  },
  '/signup': {
    component: Signup
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/users'
})

router.start(App, '#app')
