<template>
  <div>
    <div class="">
      <TableSorted></TableSorted>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import TableSorted from "../components/TableSorted.vue";

export default {
  components: {
    TableSorted,
  },
  data() {
    return {};
  },
  beforeDestroy() {
    console.log("beforeDestroyy :: byMarks");
    const debouncedSpinner = _.debounce(() => {
      this.$store.commit("setSpinnerVisibility", false);
    }, 700);

    this.$store.commit("setSpinnerVisibility", true);

    debouncedSpinner();
  },
};
</script>
