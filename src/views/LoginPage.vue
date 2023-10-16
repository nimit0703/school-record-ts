<template>
  <div>
    <Login></Login>
  </div>
</template>
<script lang="ts">
import _ from "lodash";
import Login from "../components/Login.vue";
export default {
  components: {
    Login,
  },
  beforeDestroy() {
    console.log("beforeDestroyy :: LoginPage");
    const debouncedSpinner = _.debounce(() => {
      this.$store.commit("setSpinnerVisibility", false);
    }, 700);

    this.$store.commit("setSpinnerVisibility", true);

    debouncedSpinner();
  },
};
</script>
