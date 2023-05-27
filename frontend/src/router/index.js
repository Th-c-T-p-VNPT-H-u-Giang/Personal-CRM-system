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

  // Edit customer
  {
    path: "/customer/edit/:id",
    name: "EditCustomer",
    component: () => import("../views/customer/EditCustomer.vue"),
  },
  // View customer
  {
    path: "/customer/view/:id",
    name: "ViewCustomer",
    component: () => import("../views/customer/ViewCustomer.vue"),
  },
  //Customer types
  {
    path: "/customer-types",
    name: "CustomerTypes",
    component: () => import("../views/customer/customerTypes/index.vue"),
  },
  // Add customer type
  {
    path: "/customer-types/add",
    name: "AddCustomerType",
    component: () =>
      import("../views/customer/customerTypes/AddCustomerType.vue"),
  },
  {
    path: "/customer-types/edit/:id",
    name: "EditCustomerType",
    component: () =>
      import("../views/customer/customerTypes/EditCustomerType.vue"),
  },
  // Activity
  {
    path: "/activity",
    name: "Activity",
    component: () => import("../views/activity/index.vue"),
  },
  // Employee
  {
    path: "/employee",
    name: "Employee",
    component: () => import("../views/employee/index.vue"),
  },
  // Unit
  {
    path: "/unit",
    name: "Unit",
    component: () => import("../views/unit/index.vue"),
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
  {
    path: "/report_assignment_staff",
    name: "ReportAssignment",
    component: () =>
      import("../views/report/report_assignment_staff/index.vue"),
  },
  // Report customer cycle
  {
    path: "/report_customer_cycle",
    name: "ReportCustomerCycle",
    component: () => import("../views/report/report_customer_cycle/index.vue"),
  },
  // Reporting customer is managed by the leader
  {
    path: "/report_leader_customer",
    name: "ReportLeaderCustomer",
    component: () => import("../views/report/leader/leader_customer/index.vue"),
  },
  // Reporting staff is managed by the leader
  {
    path: "/report_leader_staff",
    name: "ReportLeaderStaff",
    component: () => import("../views/report/leader/leader_staff/index.vue"),
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
