<template>
  <div>
    abc
    {{ params }}
  </div>
</template>
<script>
import { useRouter, useRoute } from "vue-router";

export default {
  setup(ctx) {
    const route = useRoute();
    const router = useRouter();
    const params = route.params.id;
    return { params };
  },
};
</script>
