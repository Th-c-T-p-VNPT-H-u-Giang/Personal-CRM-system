<template>
    <div class="container">
        <h3 class="font-weight-bold">{{ title }}</h3>
        <form class="">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter Name Customer Type">
            </div>
            <button type="submit" class="btn btn-primary">{{ btnName }}</button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        },
        btnName: {
            type: String
        }
    }
}
</script>

<style>

</style>