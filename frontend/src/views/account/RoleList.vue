<template>
  <div class="border-box d-flex flex-column ml-2">
    <!-- Menu -->
    <div class="d-flex menu my-3 mx-3 justify-content-end">
      <a
        @click="Data.activeMenu = 1"
        :class="[Data.activeMenu == 1 ? 'active-menu' : 'none-active-menu']"
        href="./account"
        >Tài Khoản</a
      >
      <a
        @click="Data.activeMenu = 2"
        :class="[Data.activeMenu == 2 ? 'active-menu' : 'none-active-menu']"
        href="./rolelist"
        >Vai Trò</a
      >
      <a
        @click="Data.activeMenu = 3"
        :class="[Data.activeMenu == 3 ? 'active-menu' : 'none-active-menu']"
        href="./permissionlist"
        >Phân Quyền</a
      >
    </div>
    <!-- Filter -->

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
          @update:entryValue="(value) => (Data.entryValue = value)"
          :entryValue="Data.entryValue"
        />
        <Search
          class="ml-3"
          style="width: 300px"
          @update:searchText="(value) => (Data.searchText = value)"
        />
      </div>
      <div class="d-flex align-items-start">
        <button
          type="button"
          class="btn btn-danger mr-3"
          data-toggle="modal"
          data-target="#model-dlt-all-role"
        >
          <span id="delete-all" class="mx-2">Xóa</span>
        </button>
        <!-- <DeleteAllRole :items="Data.items" /> -->
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#modal-addrole"
        >
          <span id="addrole" class="mx-2">Thêm</span>
        </button>
        <AddRole :item="Data.itemAdd"  @create="create" />
      </div>
    </div>
    <!-- Table -->
    <Table
      :items="setPages"
      :fields="['Vai Trò', 'Quyền']"
      :labels="['name', 'permission']"
      @delete="(value) => deleteOne(value)"
      @edit="
        (value, value1) => (
          (Data.editValue = value), (Data.activeEdit = value1)
        )
      "
      @view="(value) => view(value)"
    />
    <!-- Pagination -->
    <Pagination
      :numberOfPages="Data.numberOfPages"
      :totalRow="Data.totalRow"
      :startRow="Data.startRow"
      :endRow="Data.endRow"
      :currentPage="Data.currentPage"
      @update:currentPage="(value) => (Data.currentPage = value)"
      class="mx-3"
    />
    <EditRole
      :item="Data.editValue"
      :permissions="Data.pers"
      :class="[Data.activeEdit ? 'show-modal' : 'd-none']"
      @cancel="Data.activeEdit = false"
      @edit="edit(Data.editValue)"
    />
  </div>
</template>

<script>
import {
  Table,
  Pagination,
  Search,
  Select,
  reactive, 
  computed, 
  onBeforeMount,
  useRouter,
  Role,
  Permission,
  http_getAll,
  http_create,
  http_getOne,
  http_deleteOne,
  http_update,
  alert_success,
  alert_error,
  alert_delete,
} from "../common/import.js"
import DeleteAllRole from "../../components/form/dlt_all_role.vue";
import AddRole from "./modal/AddRole.vue";
import EditRole from "./modal/EditRole.vue";

export default {
  components: {
    Table,
    Pagination,
    // Dropdown,
    Select,
    Search,
    AddRole,
    DeleteAllRole,
    EditRole,
  },
  setup(ctx) {
    const Data = reactive({
      items: [{}],
      entryValue: 5,
      numberOfPages: 1,
      totalRow: 0,
      startRow: 0,
      endRow: 0,
      currentPage: 1,
      searchText: "",
      activeMenu: 2,
      itemAdd: {
        name: "",
      },
      activeEdit: false,
      editValue: {},
      pers: []
    });
    // computed
    const toString = computed(() => {
      console.log("Starting search");
      return Data.items.map((value, index) => {
        return [value.name].join("").toLocaleLowerCase();
      });
    });
    const filter = computed(() => {
      return Data.items.filter((value, index) => {
        return toString.value[index].includes(
          Data.searchText.toLocaleLowerCase()
        );
      });
    });
    const filtered = computed(() => {
      if (!Data.searchText) {
        Data.totalRow = Data.items.length;
        return Data.items;
      } else {
        Data.totalRow = filter.value.length;
        return filter.value;
      }
    });
    const setNumberOfPages = computed(() => {
      return Math.ceil(filtered.value.length / Data.entryValue);
    });
    const setPages = computed(() => {
      if (setNumberOfPages.value == 0 || Data.entryValue == "All") {
        Data.entryValue = Data.items.length;
        Data.numberOfPages = 1;
      } else Data.numberOfPages = setNumberOfPages.value;
      Data.startRow = (Data.currentPage - 1) * Data.entryValue + 1;
      Data.endRow = Data.currentPage * Data.entryValue;
      // console.log(Data);
      return filtered.value.filter((item, index) => {
        return (
          index + 1 > (Data.currentPage - 1) * Data.entryValue &&
          index + 1 <= Data.currentPage * Data.entryValue
        );
      });
    });

    const router = useRouter();
    const view = (_id) => {
      console.log("view", _id);
      router.push({ name: "RoleList.view", params: { id: _id } });
    };
    // methods
    // const create = async (item, permissions) => {
    //   console.log(item);
    //   const result = await http_create(Role, item); // Tạo một vai trò mới
    //   if (!result.error) {
    //     const roleId = result.document._id; // Lấy _id của vai trò vừa được tạo

    //     // Tạo các bản ghi trong bảng role_permission
    //     const rolePermissionRecords = permissions.map((permissionId) => ({
    //       roleId: roleId,
    //       permissionId: permissionId,
    //     }));

    //     // Thực hiện tạo nhiều bản ghi trong bảng role_permission
    //     await http_create(Role_Permission, rolePermissionRecords);

    //     alert_success(
    //       `Thêm Vai Trò`,
    //       `Vai Trò ${result.document.name} đã được thêm thành công vào tài khoản ${result.document.user_name}.`
    //     );
    //     refresh();
    //   } else if (result.error) {
    //     alert_error(`Lỗi`, `Đã xảy ra lỗi khi thêm vai trò: ${result.error}`);
    //   }
    // };

    const update = (item) => {
      console.log("updating", item);
    };
    const deleteOne = async (_id) => {
      const role = await http_getOne(Role, _id);
      console.log("deleting", role);
      const isConfirmed = await alert_delete(
        `Xoá vai trò`,
        `Bạn có chắc chắn muốn xoá vai trò ${role.name} không ?`
      );
      console.log(isConfirmed);
      if (isConfirmed == true) {
        const result = await http_deleteOne(Role, _id);
        alert_success(
          `Xoá vai trò`,
          `Bạn đã xoá thành công vai trò ${result.document.name}.`
        );
        refresh();
      }
    };

    const edit = async (editValue) => {
      console.log(editValue);
      const result = await http_update(Role, editValue._id, editValue);
      if (!result.error) {
        alert_success(`Sửa Vai Trò`, `${result.msg}`);
        refresh();
      } else if (result.error) {
        alert_error(`Sửa Vai Trò`, `${result.msg}`);
      }
    };

    const refresh = async () => {
      Data.items = await http_getAll(Role);
      Data.pers = await http_getAll(Permission);
    };

    // Hàm callback được gọi trước khi component được mount (load)
    onBeforeMount(async () => {
      await refresh();
      console.log("Roles:",Data.items);
      console.log("Permissions:",Data.pers);
    });
    return {
      Data,
      setPages,
      // create,
      update,
      deleteOne,
      edit,
      view,
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
#addrole,
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
</style>
