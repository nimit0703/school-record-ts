<template>
  <div>
    <Form></Form>
  </div>
</template>

<script lang="ts">
import _ from "lodash"; // Import lodash
import Form from "../components/Form.vue";

export default {
  components: {
    Form,
  },
  beforeDestroy() {
    console.log("beforeDestroyy :: AddData");

    const debouncedSpinner = _.debounce(() => {
      this.$store.commit("setSpinnerVisibility", false);
    }, 700);

    this.$store.commit("setSpinnerVisibility", true);

    debouncedSpinner();
  },
};
</script>
