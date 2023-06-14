<script>
import { reactive } from "vue";
export default {
  props: {
    items: {
      type: Array,
      default: [],
    },
    fields: {
      type: Array,
      default: ["Name", "Age", "Payment"],
    },
    labels: {
      type: Array,
      default: [],
    },
    actionList: {
      type: Array,
      default: [],
    },
    activeAction: {
      type: Boolean,
      default: true,
    },
    borderTableAll: {
      type: Boolean,
      default: false,
    },
    showActionList: {
      type: Array,
      default: [true, true, true],
    },
  },
  setup(props, ntx) {


    const handleTooltip = () => {
      var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    }

    return {
      handleTooltip
    }
  },
};
</script>

<template>
  <div>
    <table
      class="my-table mb-2"
      :class="[borderTableAll ? 'border-table-all' : '']"
    >
      <thead>
        <tr>
          <th></th>
          <th>Stt</th>
          <th v-for="(value, index) in fields" :key="index">{{ value }}</th>
          <th v-if="activeAction == true">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>
            <input type="checkbox" v-model="item.checked" name="" id="" />
          </td>
          <td>{{ index + 1 }}</td>
          <td v-for="(label, index1) in labels" :key="index1">
            {{ item[label] }}
          </td>
          <td>
            <div class="popup" @click="handleTooltip">
              Xem quyền
              <span class="popuptext" id="myPopup">
                <span v-for="(value, index) in item.permision" :key="index">
                    {{ value.name }}
                </span>
              </span>
            </div>

          </td>
          <td v-if="activeAction == true">
            <button
              v-if="showActionList[0] == true"
              type="button"
              class=""
              data-toggle="modal"
              data-target="#model-view"
            >
              <span
                id="view"
                class="material-symbols-outlined d-flex align-items-center"
              >
                visibility
              </span>
            </button>
            <button
              v-if="showActionList[1] == true"
              type="button"
              class="mx-2"
              data-toggle="modal"
              data-target="#model-edit"
            >
              <span
                id="edit"
                class="material-symbols-outlined d-flex align-items-center justify-content-center"
                @click="$emit('edit', item, true)"
              >
                edit
              </span>
            </button>
            <span
              v-if="showActionList[2] == true"
              id="delete"
              class="material-symbols-outlined"
              @click="$emit('delete', item._id, item)"
            >
              delete
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="items.length == 0" class="text-center mt-2">
      Không tồn tại bản ghi.
    </p>
  </div>
</template>

<style scoped>
.my-table {
  width: 100%;
  border-collapse: collapse;
}

.border-table-all {
  border: 1px solid var(--gray);
}

.my-table th,
.my-table td {
  border: 1px solid var(--gray);
  border-left: 0;
  border-right: 0;
  padding: 8px;
}

.my-table th {
  font-weight: 900;
  font-size: 14px;
}

.my-table tbody tr:nth-child(even) {
  font-size: 13px;
}

#view,
#edit,
#delete {
  font-size: 18px;
  cursor: pointer;
  border: 1px solid var(--gray);
  border-radius: 4px;
  padding: 1px;
}

#view:hover {
  color: var(--blue);
}

#edit:hover {
  color: var(--yellow);
}

#delete:hover {
  color: var(--red);
}


.popup {
  position: relative;
  display: inline-block;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* The actual popup */
.popup .popuptext {
  visibility: hidden;
  width: 160px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -80px;
}

/* Popup arrow */
.popup .popuptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Toggle this class - hide and show the popup */
.popup .show {
  visibility: visible;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;
}

/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
  from {opacity: 0;} 
  to {opacity: 1;}
}

@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity:1 ;}
}
</style>
