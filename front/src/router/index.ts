import { createRouter, createWebHistory } from 'vue-router';
import UserProfileView from '../views/UserProfileView.vue';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/user-profile',
    name: 'user-profile',
    component: UserProfileView,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
