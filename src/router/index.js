import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Signin from '../views/Signin.vue';
import Signup from '../views/Signup.vue';
import Profile from '../views/Profile.vue';
import loggedIn from './guards/loggedIn';
import notLoggedIn from './guards/notLoggedIn';

Vue.use(VueRouter);

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
    path: '/signin',
    name: 'Signin',
    component: Signin,
    beforeEnter: notLoggedIn,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
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
