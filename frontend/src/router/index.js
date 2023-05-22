import { createWebHistory, createRouter } from "vue-router";

const routes = [
  // Dashboard
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/dashboard/index.vue"),
  },
  // Customer
  {
    path: "/customer",
    name: "Customer",
    component: () => import("../views/customer/index.vue"),
  },
  // Activity
  {
    path: "/event",
    name: "Event",
    component: () => import("../views/event/index.vue"),
  },
  // Employee
  {
    path: "/employee",
    name: "Employee",
    component: () => import("../views/employee/index.vue"),
  },

  {
    path: "/Unit",
    name: "Unit",
    component: () => import("../views/unit/index.vue"),
  },

  {
    path: "/unita",
    name: "unit",
    component: () => import("../views/unit/unit.vue"),
  },
  {
    path: "/unita/:id",
    name: "unit_level",
    component: () => import("../views/unit/unit_level.vue"),
  },
  // Level
  {
    path: "/level",
    name: "Level",
    component: () => import("../views/level/index.vue"),
  },
  // Assignment
  {
    path: "/assignment",
    name: "Assignment",
    component: () => import("../views/assignment/index.vue"),
  },
  // Appointment
  {
    path: "/appointment",
    name: "Appointment",
    component: () => import("../views/appointment/index.vue"),
  },
  // Account
  {
    path: "/account",
    name: "Account",
    component: () => import("../views/account/index.vue"),
  },
  // Report
  {
    path: "/report",
    name: "Report",
    component: () => import("../views/report/index.vue"),
  },
  // Setting
  {
    path: "/setting",
    name: "Setting",
    component: () => import("../views/setting/index.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
