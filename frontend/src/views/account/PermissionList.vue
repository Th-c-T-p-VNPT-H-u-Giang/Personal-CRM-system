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
    <div class="border-hr mb-3"></div>
    <div class="d-flex flex-column">
      <span class="mx-3 mb-3 h6">Lọc Quyền</span>
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
          <Select_Advanced
            :options="Data.items"
            style="width: 300px; height: 100%"
            @searchSelect="
              async (value) => (
                await refresh(),
                (Data.items = Data.items.filter((value1, index) => {
                  console.log(value1, value);
                  return value1.name.includes(value) || value.length == 0;
                })),
                console.log('searchSlect', value.length)
              )
            "
            @delete="(value) => console.log('delete', value)"
            @choosed="(value) => console.log('choosed', value)"
          />
        </div>
      </div>
    </div>
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
          data-target="#model-dlt-all-permission"
        >
          <span id="delete-all" class="mx-2">Xóa</span>
        </button>
        <!-- <DeleteAllPermission :items="Data.items" /> -->
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#modal-addpermission"
        >
          <span id="addpermission" class="mx-2">Thêm</span>
        </button>
        <AddPermission :item="Data.itemAdd" @create="create" />
      </div>
    </div>
    <!-- Table -->
    <!-- {{ Data.itemAdd }} -->
    <Table
      :items="setPages"
      :fields="['Quyền']"
      :labels="['name']"
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
    <EditPermission
      :item="Data.editValue"
      :class="[Data.activeEdit ? 'show-modal' : 'd-none']"
      @cancel="Data.activeEdit = false"
      @edit="edit(Data.editValue)"
    />
  </div>
</template>

<script>
import 
{ Table,
  Pagination,
  Select,
  Search,
  reactive,
  computed,
  onBeforeMount,
  useRouter,
  http_getAll,
  http_create,
  http_getOne,
  http_deleteOne,
  http_update,
  alert_success,
  alert_error,
  alert_delete,
  Permission
} from "../common/import.js"
import DeleteAllPermission from "../../components/form/dlt_all_permission.vue";
import AddPermission from "./modal/AddPermission.vue";
import EditPermission from "./modal/EditPermission.vue";

export default {
  components: {
    Table,
    Pagination,
    // Dropdown,
    Select,
    Search,
    AddPermission,
    DeleteAllPermission,
    EditPermission,
  },
  setup(ctx) {
    const Data = reactive({
      items: [
        {
          _id: "1",
          name: "Full Authority",
        },
      ],
      entryValue: 5,
      numberOfPages: 1,
      totalRow: 0,
      startRow: 0,
      endRow: 0,
      currentPage: 1,
      searchText: "",
      activeMenu: 3,
      itemAdd: {
        name: "",
      },
      activeEdit: false,
      editValue: {},
      searchSelect: "",
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
      console.log(Data);
      return filtered.value.filter((item, index) => {
        return (
          index + 1 > (Data.currentPage - 1) * Data.entryValue &&
          index + 1 <= Data.currentPage * Data.entryValue
        );
      });
    });
    // methods
    const create = async () => {
      console.log(Data.itemAdd);
      const result = await http_create(Permission, Data.itemAdd);
      console.log("result", result);
      if (!result.error) {
        alert_success(
          `Thêm Quyền`,
          `Thêm thành công quyền ${result.document.name}.`
        );
        refresh();
      } else if (result.error) {
        alert_error(`Thêm Quyền`, `${result.msg}`);
      }
    };
    const update = (item) => {
      console.log("updating", item);
    };
    const deleteOne = async (_id) => {
      const permission = await http_getOne(Permission, _id);
      console.log("deleting", permission);
      const isConfirmed = await alert_delete(
        `Xoá Quyền`,
        `Bạn có chắc chắn muốn xoá quyền ${permission.name} không ?`
      );
      console.log(isConfirmed);
      if (isConfirmed == true) {
        const result = await http_deleteOne(Permission, _id);
        alert_success(
          `Xoá quyền`,
          `Bạn đã xoá thành công quyền ${result.document.name}.`
        );
        refresh();
      }
    };
    const edit = async (editValue) => {
      console.log(editValue);
      const result = await http_update(Permission, editValue._id, editValue);
      if (!result.error) {
        alert_success(`Sửa tài khoản`, `${result.msg}`);
        refresh();
      } else if (result.error) {
        alert_error(`Sửa tài khoản`, `${result.msg}`);
      }
    };
    const refresh = async () => {
      Data.items = await http_getAll(Permission);
    };
    // Hàm callback được gọi trước khi component được mount (load)
    onBeforeMount(async () => {
      refresh();
      console.log(Data.items);
    });

    const router = useRouter();

    const view = (_id) => {
      console.log("view", _id);
      router.push({ name: "PermissionList.view", params: { id: _id } });
    };
    return {
      Data,
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
#addpermission,
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
