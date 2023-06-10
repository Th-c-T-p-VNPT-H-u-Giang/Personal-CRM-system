<template>
  <div>
    <div
      class="modal fade"
      id="modal-addrole"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modal-addrole-label"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-addrole-label">Thêm Vai Trò</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="role_name">Vai Trò</label>
              <input
                type="text"
                class="form-control"
                id="role_name"
                v-model="newRoleName"
                placeholder="Nhập Vai Trò"
              />
            </div>
            <div class="form-group">
              <label for="permission">Quyền</label>
              <div class="checkbox-group">
                <label v-for="permission in permissions" :key="permission._id">
                  <input
                    type="checkbox"
                    v-model="selectedPermissionIds"
                    :value="permission._id"
                  />
                  {{ permission.name }}
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="submit">
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, Permission, Role, alert_success, alert_error } from "../../common/import.js"

export default {
  setup() {
    const newRoleName = ref("");
    const selectedPermissionIds = ref([]);
    const permissions = ref([]);

    const fetchPermissions = async () => {
      permissions.value = await Permission.getAll();
    };
    // lấy đc id nhưng chưa biết gửi lên bảng role_permisison.
    const submit = async () => {
      try {
        // Tạo vai trò mới
        const newRole = await Role.create({ name: newRoleName.value });
        console.log("NewRole:", newRole)
        // Lấy _id của vai trò mới
        const roleId = newRole.document._id;
        console.log("ID của role:",roleId)
        // Lấy danh sách _id của quyền được chọn
        const permissionIds = selectedPermissionIds.value;
        console.log("ID của permission:",permissionIds)
        // Thêm quyền cho vai trò mới
        // const role = await Role.findByPk(roleId);
        // await Role.addPermissions(roleId, permissionIds);
        await roleId.addPermissions(permissionIds);
        resetForm();
        alert_success("Thêm vai trò thành công!");
      } catch (error) {
        console.error(error);
        alert_error("Đã xảy ra lỗi khi thêm vai trò!");
      }
    };

    const resetForm = () => {
      newRoleName.value = "";
      selectedPermissionIds.value = [];
    };

    onMounted(async () => {
      await fetchPermissions();
    });

    return {
      newRoleName,
      selectedPermissionIds,
      permissions,
      submit,
      resetForm,
    };
  },
};
</script>
