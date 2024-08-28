import {createRouter, createWebHistory} from 'vue-router';
import Home from "@/components/CourseManagement.vue";
import CourseDetails from './components/CourseDetails.vue';
import InstanceDetails from './components/InstanceDetails.vue';

const routes = [
   {
      name: 'Home',
      path: '/',
      component: Home
   },
   {
      name: 'CourseDetails',
      path: '/course/:id',
      component: CourseDetails
   },
   {
      name: 'InstanceDetails',
      path: '/instance/:id',
      component: InstanceDetails
   }
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

export default router;
