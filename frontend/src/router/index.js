import { createWebHistory, createRouter } from "vue-router";

const routes = [
  // Dashboard
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/dashboard/index.vue'),
  },
  // Customer
  {
    path: '/customer',
    name: 'Customer',
    component: () => import('../views/customer/index.vue'),
  },
  // Activity 
  {
    path: '/activity',
    name: 'Activity',
    component: () => import('../views/activity/index.vue'),
  },
  // Employee 
  {
    path: '/employee',
    name: 'Employee',
    component: () => import('../views/employee/index.vue'),
  },
  // Unit 
  {
    path: '/unit',
    name: 'Unit',
    component: () => import('../views/unit/index.vue'),
  },
  // Level
  {
    path: '/level',
    name: 'Level',
    component: () => import('../views/level/index.vue'),
  },
  // Assignment
  {
    path: '/assignment',
    name: 'Assignment',
    component: () => import('../views/assignment/index.vue'),
  },
  // Appointment
  {
    path: '/appointment',
    name: 'Appointment',
    component: () => import('../views/appointment/index.vue'),
  },
  // Account
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/account/index.vue'),
    
  },
  //AccountList.vue
  // {
  //   path:'/accountlist',
  //   name: 'AccountList',
  //   component: () => import('../views/account/AccountList.vue'),
  // },
  //permissionlist.vue
  {
    path: '/permissionlist',
    name: 'PermissionList',
    component: () => import('../views/account/PermissionList.vue')
  },
  //rolelist.vue
  {
    path: '/rolelist',
    name: 'RoleList',
    component: () => import('../views/account/RoleList.vue')
  },
  //view account
  {
    path: '/account/:id',
    name: 'AccountList.view',
    component: () => import('../views/account/view.vue'),
    props: true,
  },
  // view role
  {
    path: '/rolelist/:id',
    name: 'RoleList.view',
    component: () => import('../views/account/view.vue'),
    props: true,
  }, 
  // view permission
  {
    path: '/permissionlist/:id',
    name: 'PermissionList.view',
    component: () => import('../views/account/view.vue'),
    props: true,
  },
  // Report
  {
    path: '/report',
    name: 'Report',
    component: () => import('../views/report/index.vue'),
  },
  // report Staff assigned by learder 
  {
    path: '/staffassignedbyleader',
    name: 'StaffAssignedByLeader',
    component: () => import('../views/report/Staff_Assigned_by_Leadership.vue'),
  },
 
  // Setting
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('../views/setting/index.vue'),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
