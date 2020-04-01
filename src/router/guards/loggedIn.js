import store from '../../store';

export default (to, from, next) => {
  if (store.getters.isAuthenticated) {
    return next();
  }

  return next('/signin');
};
