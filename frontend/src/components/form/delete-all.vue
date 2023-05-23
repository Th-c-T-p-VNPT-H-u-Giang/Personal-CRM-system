<template>
    <div class="modal" id="model-delete-all">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" style="font-size: 15px;">Delete All</h4>
                    <button type="button" class="close" data-dismiss="modal">
                        &times;
                    </button>
                </div>

                <!-- Modal body -->
                <div class="modal-body" style="min-width: 500px;">
                    <div class="d-flex justify-content-between mb-3">
                        <div class="d-flex justify-content-start">
                            <Select :options="options" @update:entryValue="handleUpdateEntryValue"
                                :entryValue="data.entryValue" />

                            <search class="mx-3" style="width: 300px" @update:searchText="handleUpdateSearchText" />
                        </div>
                        <div class="d-flex align-items-start">
                            <button v-if="data.activeSelectAll == false" type="button" class="btn btn-light"
                                @click="setDeleteAll(true), data.activeSelectAll = true">
                                <span id="add" class="mx-2" style="font-size: 15px">Select All</span>
                            </button>
                            <button v-if="data.activeSelectAll == true" type="button" class="btn btn-light"
                                @click="setDeleteAll(false), data.activeSelectAll = false">
                                <span id="add" class="mx-2" style="font-size: 15px">Un Select All</span>
                            </button>
                        </div>
                    </div>
                    <table-phuc :items="setPages" :fields="['Name', 'Email', 'Address']"
                        :labels="['name', 'email', 'address']" :activeAction="`false`" :borderTableAll="`true`"
                        @update:delete="(value, index) => setPages[index].delete = value" />
                    <!-- <pagination-phuc :numberOfPages="data.numberOfPages" :totalRow="data.totalRow" :startRow="data.startRow"
                        :endRow="data.endRow" :currentPage="data.currentPage"
                        @update:currentPage="(value) => data.currentPage = value" /> -->
                    <pagination-phuc :numberOfPages="data.numberOfPages" :totalRow="data.totalRow" :startRow="data.startRow"
                        :endRow="data.endRow" :currentPage="data.currentPage"
                        @update:currentPage="(value) => data.currentPage = value" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger">Delete All</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import Select from './select.vue'
import Search from './search.vue'
import TablePhuc from '../table/table-delete-all.vue'
import PaginationPhuc from '../table/pagination-phuc.vue'
export default {
    components: { Select, Search, TablePhuc, PaginationPhuc },
    props: {
        items: {
            type: Array,
            default: [],
        },
    },
    setup(props) {
        console.log(`Props ${props.items[0]}`);
        const options = reactive([
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
        ])

        const data = reactive({
            customers: [
                {
                    id: 1,
                    name: "Dang Van Phuc",
                    birthdate: "07/12/2002",
                    address: "Dong Thap",
                    phone: "039977732",
                    email: "phuc@gmail.com",
                    type: "VIP",
                    avatar:
                        "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
                    wor_current_workplace: "CTU",
                    wor_work_history: [],
                    wor_current_position: "Student",
                    wor_work_temp: "",
                },
                {
                    id: 2,
                    name: "Pham Thanh Phong",
                    birthdate: "07/12/2002",
                    address: "Dong Thap",
                    phone: "039977732",
                    email: "phuc@gmail.com",
                    type: "VIP",
                    avatar:
                        "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
                    wor_current_workplace: "CTU",
                    wor_work_history: [],
                    wor_current_position: "Student",
                    wor_work_temp: "",
                },
                {
                    id: 3,
                    name: "Nguyen Anh Nam",
                    birthdate: "07/12/2002",
                    address: "Dong Thap",
                    phone: "039977732",
                    email: "phuc@gmail.com",
                    type: "VIP",
                    avatar:
                        "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
                    wor_current_workplace: "CTU",
                    wor_work_history: [],
                    wor_current_position: "Student",
                    wor_work_temp: "",
                },
                {
                    id: 4,
                    name: "Le Quoc Thinh",
                    birthdate: "07/12/2002",
                    address: "Dong Thap",
                    phone: "039977732",
                    email: "phuc@gmail.com",
                    type: "VIP",
                    avatar:
                        "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
                    wor_current_workplace: "CTU",
                    wor_work_history: [],
                    wor_current_position: "Student",
                    wor_work_temp: "",
                },
                {
                    id: 5,
                    name: "Vo Van Thach",
                    birthdate: "07/12/2002",
                    address: "Dong Thap",
                    phone: "039977732",
                    email: "phuc@gmail.com",
                    type: "VIP",
                    avatar:
                        "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
                    wor_current_workplace: "CTU",
                    wor_work_history: [],
                    wor_current_position: "Student",
                    wor_work_temp: "",
                },
                {
                    id: 6,
                    name: "Tran Minh Sang",
                    birthdate: "07/12/2002",
                    address: "Dong Thap",
                    phone: "039977732",
                    email: "phuc@gmail.com",
                    type: "VIP",
                    avatar:
                        "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
                    wor_current_workplace: "CTU",
                    wor_work_history: [],
                    wor_current_position: "Student",
                    wor_work_temp: "",
                },
                {
                    id: 7,
                    name: "Nguyen Hoang Trong Tien",
                    birthdate: "07/12/2002",
                    address: "Dong Thap",
                    phone: "039977732",
                    email: "phuc@gmail.com",
                    type: "VIP",
                    avatar:
                        "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
                    wor_current_workplace: "CTU",
                    wor_work_history: [],
                    wor_current_position: "Student",
                    wor_work_temp: "",
                },
            ],
            entryValue: 5,
            numberOfPages: 1,
            totalRow: 0,
            startRow: 0,
            endRow: 0,
            currentPage: 1,
            searchText: "",
            activeSelectAll: false,
        });

        const handleUpdateEntryValue = (value) => (data.entryValue = value)

        // handle update search text 
        const handleUpdateSearchText = (value) => (data.searchText = value)

        const toString = computed(() => {
            console.log("Starting search");
            return props.items.map((value, index) => {
                return [value.name].join("").toLocaleLowerCase();
            });
        });
        const filter = computed(() => {
            return props.items.filter((value, index) => {
                return toString.value[index].includes(
                    data.searchText.toLocaleLowerCase()
                );
            });
        });
        const filtered = computed(() => {
            if (!data.searchText) {
                data.totalRow = props.items.length;
                return props.items;
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
                data.entryValue = props.items.length;
                data.numberOfPages = 1;
            } else data.numberOfPages = setNumberOfPages.value;
            data.startRow = (data.currentPage - 1) * data.entryValue + 1;
            data.endRow = data.currentPage * data.entryValue;
            console.log(data);
            return filtered.value.filter((item, index) => {
                return (
                    index + 1 > (data.currentPage - 1) * data.entryValue &&
                    index + 1 <= data.currentPage * data.entryValue
                );
            });
        });

        const setDeleteAll = (selectAll = false) => {
            if (props.items.length > 0) {
                for (let value of props.items) {
                    if (selectAll == true) {
                        value.delete = true;
                    } else {
                        value.delete = false;
                    }
                }
            }
        };
        onMounted(() => {
            setDeleteAll();
        });
        return {
            options,
            data,
            setPages,
            setDeleteAll,
            handleUpdateEntryValue,
            handleUpdateSearchText

        }
    }

}
</script>

<style scoped>
.btn-light {
    border: 1px solid var(--gray);
    max-width: 124px;
}
</style>