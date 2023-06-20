<script>
import { reactive, ref } from "vue";
import { stringifyQuery, useRouter } from "vue-router";
export default {
  components: {},
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
    name_id: { type: String },
    take_care: { type: Boolean },
    assign: { type: Boolean },
    isassign: { type: Boolean },
  },
  setup(props, ntx) {
    const router = useRouter();

    return {};
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
          <th>STT</th>
          <th
            v-for="(value, index) in fields"
            :key="index"
            :class="{ none: value == 'Lịch hẹn' && take_care }"
          >
            {{ value }}
          </th>
          <th v-if="activeAction == true">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td><input type="checkbox" name="" id="" /></td>
          <td>{{ index + 1 }}</td>
          <td
            v-for="(label, index1) in labels"
            :key="index1"
            style="overflow-wrap;: break-word;"
            :class="{ none: label == 'app_day' && take_care }"
          >
            {{ item[label] }}
          </td>
          <td v-if="activeAction == true" class="bet">
            <span id="mail" class="material-symbols-outlined mx-2"> mail </span>
            <!-- <span id="phone" class="material-symbols-outlined">
              phone_in_talk
            </span> -->
            <span
              v-if="isassign && !assign"
              id="assign"
              class="material-symbols-outlined mx-2"
              >assignment_add</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
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

#appointment,
#mail,
#phone,
#assign {
  font-size: 22px;
  cursor: pointer;
  border: 1px solid var(--gray);
  border-radius: 4px;
  padding: 1px;
}
#appointment:hover {
  color: var(--blue);
}
#mail:hover {
  color: var(--yellow);
}
#phone:hover {
  color: var(--green);
}
#assign:hover {
  color: red;
}
.none {
  display: none;
}
@media screen and (max-width: 739px) {
  #mail {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  #mail,
  #appointment {
    margin: 2px auto;
    text-align: center;
  }
  .bet {
    text-align: center;
  }
}
</style>