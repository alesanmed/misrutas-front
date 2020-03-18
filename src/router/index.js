import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue';
import store from '../store';

Vue.use(VueRouter);

const loggedIn = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    return next();
  }

  return next('/login');
};

const notLoggedIn = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    return next();
  }

  return next('/');
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: loggedIn,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: notLoggedIn,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: loggedIn,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
