<template>
    <div class="card">
        <div class="card-header">
            <router-link to="/customer-types/add" class="btn btn-primary float-right mb-3">Add Customer Type</router-link>
            <nav class="navbar navbar-light">
                <form class="form-inline">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>
        </div>
        <div class="card-body">
            <table-phuc :items="customerTypes" :labels="['name']" :nameRoute="'customer-types'"/>
        </div>
        <div class="card-footer">
            <button class="btn btn-danger" @click="handleDeleteSelected">
                Delete Selected
            </button>
            <pagination-phuc/>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
import Swal from "sweetalert2";
import tablePhuc from '../../../components/table/table-phuc.vue';
import PaginationPhuc from '../../../components/table/pagination-phuc.vue';

export default {
    components: { tablePhuc, PaginationPhuc },
    setup() {
        const customerTypes = reactive([
            {
                id: 1,
                name: "Normal"
            },
            {
                id: 2,
                name: "VIP"
            },
        ])

        const handleDelete = (typeId) => {
            console.log(typeId);
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
        }

        const handleDeleteSelected = () => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
        }

        return {
            customerTypes,
            handleDelete,
            handleDeleteSelected
        }
    }
}
</script>

<style scoped>
.material-symbols-outlined {
    font-size: 18px;
}
</style>