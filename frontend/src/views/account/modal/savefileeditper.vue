<script>
import { reactive } from "vue";


export default {
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  setup(props, ctx) {
    const selectedPermissions = reactive([]);

    const permissions = [
      "View Customer Information",
      "Edit Customer Information",
      "View Purchase History",
      "Full Authority",
    ];
    const update = () => {
      if (
        props.item.fullname.length > 0 &&
        props.item.username.length > 0 &&
        props.item.email.length > 0 
      ){ 
        ctx.emit("update");
      }
    };
    return {
      update,
      selectedPermissions,
      permissions
    };
  },
};
</script>


<template>
  <!-- The Modal -->
  <div class="modal" id="model-editpermission">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px">Edit A Account</h4>
          <button
            @click="$emit('cancel')"
            type="button"
            class="close"
            data-dismiss="modal"
          >
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <form class="was-validated">
            <div class="form-group">
              <label for="name"
                >FullName(<span style="color: red">*</span>):</label
              >
              <input
                type="text"
                class="form-control"
                id="fullname"
                name="fullname"
                v-model="item.fullname"
                required
              />
            </div>
            <div class="form-group">
              <label for="name"
                >UserName(<span style="color: red">*</span>):</label
              >
              <input
                type="text"
                class="form-control"
                id="username"
                name="username"
                v-model="item.username"
                required
              />
            </div>
            <div class="form-group">
              <label for="name"
                >Email(<span style="color: red">*</span>):</label
              >
              <input
                type="text"
                class="form-control"
                id="email"
                name="email"
                v-model="item.email"
                required
              />
            </div>
            <div class="form-group">
              <label>Permission</label>
              <div
                class="form-check"
                v-for="(permission, index) in permissions"
                :key="index"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="'permission-' + index"
                  v-model="selectedPermissions"
                  :value="permission"
                  required
                />
                <label class="form-check-label" :for="'permission-' + index">{{
                  permission
                }}</label>
              </div>
            </div>
    
            <button
              type="button"
              class="btn btn-warning px-3 py-2"
              style="font-size: 14px"
              @click="create"
              id="edit"
            >
              <span>Edit</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.show-modal {
  display: block;
  opacity: 1;
  pointer-events: auto;
}
</style>
