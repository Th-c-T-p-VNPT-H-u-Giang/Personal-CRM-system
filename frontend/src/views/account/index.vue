<template>
  <div class="border-box d-flex flex-column ml-2">
    <!-- Menu -->
    <div class="d-flex menu my-3 mx-3 justify-content-end">
      <a
        @click="data.activeMenu = 1"
        :class="[data.activeMenu == 1 ? 'active-menu' : 'none-active-menu']"
        href="./account"
        >Tài Khoản</a
      >
      <a
        @click="data.activeMenu = 2"
        :class="[data.activeMenu == 2 ? 'active-menu' : 'none-active-menu']"
        href="./rolelist"
        >Vai Trò</a
      >
      <a
        @click="data.activeMenu = 3"
        :class="[data.activeMenu == 3 ? 'active-menu' : 'none-active-menu']"
        href="./permissionlist"
        >Phân Quyền</a
      >
    </div>
    <!-- Filter -->
    <!-- Filter -->
    <!-- <div class="border-hr mb-3"></div>
    <div class="d-flex flex-column">
      <span class="mx-3 mb-3 h6">Lọc Tài Khoản</span>
      <div class="d-flex mx-3">
        <div class="form-group w-100">
          <Select
            :title="`Khoảng thời gian`"
            :entryValue="`Khoảng thời gian`"
            :options="[
              { name: '1 tuần', value: '1 tuần' },
              { name: '1 tháng', value: '1 tháng' },
              { name: '1 năm', value: '1 năm' },
            ]"
          />
        </div>
        <div class="d-flex">
          <input
            style=""
            class="input px-2 form-group w-100 ml-3"
            type="date"
            name=""
            id=""
          />
        </div>
        

        <div class="form-group ml-3">
          <Select_Advanced_Account
            :options="data.items"
            style="width: 300px; height: 100%"
            @searchSelect="
              async (value) => (
                await refresh(),
                (data.items = data.items.filter((value1, index) => {
                  console.log(value1, value);
                  return value1.user_name.includes(value) || value.length == 0;
                })),
                console.log('searchSlect', value.length)
              )
            "
            @delete="(value) => console.log('delete', value)"
            @choosed="(value) => console.log('choosed', value)"
          />
        </div>
      </div>
    </div> -->
    <!-- Search -->
    <div class="border-hr mb-3"></div>
    <div class="d-flex justify-content-between mx-3 mb-3">
      <div class="d-flex justify-content-start">
        <Select
          class="d-flex justify-content-start"
          :options="[
            {
              name: 5,
              value: 5,
            },
            {
              name: 10,
              value: 10,
            },
            {
              name: 20,
              value: 20,
            },
            {
              name: 30,
              value: 30,
            },
            {
              name: 'All',
              value: 'All',
            },
          ]"
          @update:entryValue="(value) => (data.entryValue = value)"
          :entryValue="data.entryValue"
        />
        <Search
          class="ml-3"
          style="width: 300px"
          @update:searchText="(value) => (data.searchText = value)"
        />
      </div>
      <div class="d-flex align-items-start">
        <button
          type="button"
          class="btn btn-danger mr-3"
          data-toggle="modal"
          data-target="#model-delete-all"
        >
          <span id="delete-all" class="mx-2">Xóa</span>
        </button>
        <!-- <DeleteAll :items="data.items" /> -->
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#model-addaccount"
        >
          <span id="addaccount" class="mx-2">Thêm</span>
        </button>
        <AddAccount :item="data.itemAdd" :roles="data.roles" @create="create" />
      </div>
    </div>

    <Table
      :items="setPages"
      :fields="['Tên Tài Khoản']"
      :labels="['user_name']"
      @delete="(value) => deleteOne(value)"
      @edit="
        (value, value1) => (
          (data.editValue = value), (data.activeEdit = value1)
        )
      "
      @view="(value) => view(value)"
    />
    <!-- Pagination -->
    <Pagination
      :numberOfPages="data.numberOfPages"
      :totalRow="data.totalRow"
      :startRow="data.startRow"
      :endRow="data.endRow"
      :currentPage="data.currentPage"
      @update:currentPage="(value) => (data.currentPage = value)"
      class="mx-3"
    />
    <Edit
      :item="data.editValue"
      :roles="data.roles"
      :class="[data.activeEdit ? 'show-modal' : 'd-none']"
      @cancel="data.activeEdit = false"
      @edit="edit(data.editValue)"
    />
  </div>
</template>

<script>
import {
  Table,
  Pagination,
  Select,
  Search,
  // compositions
  reactive,
  computed,
  onBeforeMount,
  // router
  useRouter,
  // service
  Account,
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
} from "../common/import"
import DeleteAll from "../../components/form/dlt_all_account.vue";
import AddAccount from "./modal/AddAccount.vue";
import Edit from "./modal/EditAccount.vue";
export default {
  components: {
    Table,
    Pagination,
    // Dropdown,
    Select,
    Search,
    AddAccount,
    DeleteAll,
    Edit,
    // Select_Advanced_Account
  },
  setup(ctx) {
    const data = reactive({
      items: [
        {
          // _id: "1",
          // user_name: "meimey113",
          // password: "11032002",
          // roleId:"1",
          // EmployeeId: "1"
        },
      ],
      entryValue: 5,
      numberOfPages: 1,
      totalRow: 0,
      startRow: 0,
      endRow: 0,
      currentPage: 1,
      searchText: "",
      activeMenu: 1,
      itemAdd: {
        user_name: "",
        password: "",
        roleId: "",
        EmployeeId: "",
      },
      activeEdit: false,
      editValue: {},
      roles: [],
      // searchSelect: "",
      // optionSelect: [
      //   {
      //     _id: 1,
      //     name: "1",
      //   },
      //   {
      //     _id: 2,
      //     name: "2",
      //   },
      // ],
    });

    // computed
    const toString = computed(() => {
      console.log("Starting search");
      return data.items.map((value, index) => {
        return [value.user_name].join("").toLocaleLowerCase();
      });
    });
    const filter = computed(() => {
      return data.items.filter((value, index) => {
        return toString.value[index].includes(
          data.searchText.toLocaleLowerCase()
        );
      });
    });
    const filtered = computed(() => {
      if (!data.searchText) {
        data.totalRow = data.items.length;
        return data.items;
      } else {
        data.totalRow = filter.value.length;
        return filter.value;
      }
    });
    const setNumberOfPages = computed(() => {
      return Math.ceil(filtered.value.length / data.entryValue);
    });
    const setPages = computed(() => {
      if (setNumberOfPages.value == 0 || data.entryValue == "All") {
        data.entryValue = data.items.length;
        data.numberOfPages = 1;
      } else data.numberOfPages = setNumberOfPages.value;
      data.startRow = (data.currentPage - 1) * data.entryValue + 1;
      data.endRow = data.currentPage * data.entryValue;
      return filtered.value.filter((item, index) => {
        return (
          index + 1 > (data.currentPage - 1) * data.entryValue &&
          index + 1 <= data.currentPage * data.entryValue
        );
      });
    });

    const router = useRouter();

    const view = (_id) => {
      console.log("view", _id);
      router.push({ name: "AccountList.view", params: { id: _id } });
    };

    // methods
    const create = async () => {
      console.log(data.itemAdd);
      const result = await http_create(Account, data.itemAdd);
      console.log("result", result);
      if (!result.error) {
        alert_success(
          `Thêm tài khỏan`,
          `Tài khoản ${result.document.user_name} đã được tạo thành công.`
        );
        refresh();
      } else if (result.error) {
        alert_error(`Thêm tài khoản`, `${result.msg}`);
      }
    };
    const update = (item) => {
      console.log("updating", item);
    };
    const deleteOne = async (_id) => {
      const account = await http_getOne(Account, _id);
      console.log("deleting", account);
      const isConfirmed = await alert_delete(
        `Xoá tài khoản`,
        `Bạn có chắc chắn muốn xoá tài khoản ${account.user_name} không ?`
      );
      console.log(isConfirmed);
      if (isConfirmed == true) {
        const result = await http_deleteOne(Account, _id);
        alert_success(
          `Xoá tài khoản`,
          `Bạn đã xoá thành công tài khoản ${result.document.user_name}.`
        );
        refresh();
      }
    };
    const edit = async (editValue) => {
      console.log(editValue);
      const result = await http_update(Account, editValue._id, editValue);
      if (!result.error) {
        alert_success(`Sửa tài khoản`, `${result.msg}`);
        refresh();
      } else if (result.error) {
        alert_error(`Sửa tài khoản`, `${result.msg}`);
      }
    };
    const refresh = async () => {
      data.items = await http_getAll(Account);
      data.roles = await http_getAll(Role);
    };
    // Hàm callback được gọi trước khi component được mount (load)
    onBeforeMount(async () => {
      refresh();
      // console.log(data.items);
    });
    
    return {
      data,
      setPages,
      create,
      update,
      deleteOne,
      edit,
      view,
      refresh
    };
  },
};
</script>

<style scoped>
.border-box {
  border: 1px solid var(--gray);
  border-radius: 5px;
}
.menu {
  /* border: 1px solid var(--gray); */
  border-collapse: collapse;
}
.menu a {
  border: 1px solid var(--gray);
  border-collapse: collapse;
  padding: 8px 12px;
  font-size: 15px;
}
.active-menu {
  color: blue;
}
.none-active-menu {
  color: var(--dark);
}
.border-hr {
  border-top: 1px solid var(--gray);
}
#add,
#delete-all {
  font-size: 14px;
}
.show-modal {
  display: block;
  opacity: 1;
  background-color: var(--dark);
  /* pointer-events: auto; */
  z-index: 1;
}
.input {
  background-color: inherit;
  border: 1px solid var(--gray);
  border-radius: 5px;
}
</style>
