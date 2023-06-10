import Table from "../../components/table/table_duy.vue";
import Pagination from "../../components/table/pagination_duy.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Search from "../../components/form/search.vue";
import DeleteAll from "../../components/form/delete-all.vue";
import Select_Advanced_Account from "../../components/form/select_advanced_account.vue";
import Select_Advanced from "../../components/form/select_advanced.vue"
import { reactive, computed, watch, ref, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
import { formatDateTime, formatDate } from "../../assets/js/common.js";
// import { toString, _filter } from "../../assets/js/pagination.js";

// services

import Account from "../../services/account.service";
import Permission from "../../services/permission.service";
import Role from "../../services/role.service";


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
    alert_info
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
    Select_Advanced_Account,
    // compositions
    reactive,
    computed,
    watch,
    ref,
    onBeforeMount,
    onMounted,
    // router
    useRouter,
    // format date or datetime
    formatDateTime,
    formatDate,
    // service
    Account,
    Permission,
    Role,
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
    alert_info
}
