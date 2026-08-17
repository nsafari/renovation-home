import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
  },
  {
    path: '/projects/new',
    name: 'project-new',
    component: () => import('@/views/ProjectFormView.vue'),
  },
  {
    path: '/projects/:id',
    name: 'project-detail',
    component: () => import('@/views/ProjectDetailView.vue'),
  },
  {
    path: '/projects/:id/edit',
    name: 'project-edit',
    component: () => import('@/views/ProjectFormView.vue'),
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: () => import('@/views/ScheduleView.vue'),
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import('@/views/ReportsView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory('/renovation-home/'),
  routes,
})

export default router
