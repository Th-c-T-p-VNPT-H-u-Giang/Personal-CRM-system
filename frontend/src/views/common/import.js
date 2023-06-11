import Table from "../../components/table/table_duy.vue";
import Pagination from "../../components/table/pagination_duy.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Search from "../../components/form/search.vue";
import DeleteAll from "../../components/form/delete-all.vue";
import form_wizard_customer from "../../components/form/form-wizard-customer.vue";
import Select_Advanced from "../../components/form/select_advanced.vue";
import { reactive, computed, watch, ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { formatDateTime, formatDate } from "../../assets/js/common.js";
// import { toString, _filter } from "../../assets/js/pagination.js";

// services
import Event from "../../services/event.service";
import Habit from "../../services/habit.service";
// import Account from "../../services/account.service";
// import Appointment from "../../services/appointment.service";
// import Center_VNPT from "../../services/center_vnpt.service";
import Company_KH from "../../services/company.service";
import Customer_Types from "../../services/customerType.service";
import Customer_Work from "../../services/customerWorks.service";
import Customer from "../../services/customer.service";
import CustomerEvent from "../../services/customerEvent.service";
import CustomerHabit from "../../services/customerHabit.service";
// import Cycle from "../../services/cycle.service";
// import Department from "../../services/department.service";
// import Employee from "../../services/employee.service";
// import Log from "../../services/log.service";
// import Permission from "../../services/permission.service";
// import Position from "../../services/position.service";
// import Role from "../../services/role.service";
// import Task from "../../services/task.service";
// import Unit from "../../services/unit.service";

// http methods
import {
  http_getAll,
  http_create,
  http_getOne,
  http_deleteOne,
  http_update,
} from "../../assets/js/common.http";

// alert methods
import {
  alert_success,
  alert_error,
  alert_delete,
  alert_warning,
  alert_info,
} from "../../assets/js/common.alert";

export {
  // components
  Table,
  Pagination,
  Dropdown,
  Select,
  Search,
  DeleteAll,
  Select_Advanced,
  form_wizard_customer,
  // compositions
  reactive,
  computed,
  watch,
  ref,
  onBeforeMount,
  // router
  useRouter,
  // format date or datetime
  formatDateTime,
  formatDate,
  // service
  Event,
  Habit,
  // Account,
  // Appointment,
  // Center_VNPT,
  Company_KH,
  Customer_Types,
  Customer_Work,
  Customer,
  CustomerEvent,
  CustomerHabit,
  // Cycle,
  // Department,
  // Employee,
  // Log,
  // Permission,
  // Position,
  // Role,
  // Task,
  // Unit,
  // http service
  http_getAll,
  http_create,
  http_getOne,
  http_deleteOne,
  http_update,
  // alert
  alert_success,
  alert_error,
  alert_delete,
  alert_warning,
  alert_info,
};
