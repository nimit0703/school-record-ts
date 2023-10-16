<template>
  <div>logout</div>
</template>

<script lang="ts">
import _ from "lodash"; // Import lodash

export default {
  mounted() {
    console.log("logout mounted");
    this.$store.state.showSpinner = true;

    // Use lodash's debounce to delay setting showSpinner to false
    const debouncedLogout = _.debounce(() => {
      console.log("spinningggg");
      this.$store.state.showSpinner = false;
      this.$store.commit("logout");
      this.$router.push("/login");
    }, 700);

    debouncedLogout();
  },
  beforeDestroy() {
    console.log("beforeDestroy :: Logout");
  },
  destroyed() {
    console.log("logout destroyed");
    clearInterval(this.$store.state.timer);
    const debouncedSetNewTimer = _.debounce(() => {
      this.$store.commit("setNewTimer");
    });

    debouncedSetNewTimer();
  },
};
</script>
