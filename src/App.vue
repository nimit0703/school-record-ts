<template>
  <!-- Your template code -->
  <div>
    <template v-if="$store.state.isLogin">
      <div class="d-flex align-items-stretch">
        <Nav class="border-right p-3 m-2"></Nav>
        <router-view class="p-3 flex-grow-1"></router-view>
        <Spinner v-show="showSpin"></Spinner>
      </div>
    </template>
    <template v-else>
      <div
        class="container d-flex align-items-center justify-content-center hi-100"
      >
        <LoginPage></LoginPage>
      </div>
    </template>



  </div>
</template>

<script lang="ts">
import Nav from "./components/Nav.vue";
import Spinner from "./components/Spinner.vue";
import LoginPage from "./views/LoginPage.vue";
import _ from "lodash";

export default {

  data() {
    return {
      
    }
  },
  created() {
    const arr = _.shuffle([1, 2, 3, 4]);
    console.log(arr);
  },
  computed: {
    count() {
      return this.$store.state.isLogin;
    },
    showSpin(){
      return this.$store.state.showSpinner;
      
    }
  },
  components: {
    Nav,
    LoginPage,
    Spinner,
  },
};
</script>

<style scoped>
.hi-100 {
  height: 100vh;
  /* width: 20%; */
}
</style>
