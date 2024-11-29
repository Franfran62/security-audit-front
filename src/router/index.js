import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/SignInView.vue'
import HomeView from '@/views/HomeView.vue'
import { useCurrentPermission } from '@/hook/useCurrentPermission'
import { useFlashMessage } from '@/hook/useFlashMessage';

const { isGranted } = useCurrentPermission();
const { setFlashMessage } = useFlashMessage();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signin',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminHomeView.vue'),
      beforeEnter: (to, from, next) => {
        if (isGranted("admin")) {
          next();
        } else {
          setFlashMessage("warning", "Vous n'avez pas les droits pour accéder à cette page NON.");
          next('/');
        }
      }
    }
  ],
})

export default router
