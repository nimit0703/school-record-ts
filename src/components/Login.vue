<template>
  <div>
    <b-button v-b-modal.modal-1>Login</b-button>

    <b-modal id="modal-1" title="Login" @hidden="submitForm">
      <label for="inputNumber" class="mr-4"> Enter your Number</label>
      <input type="number" id="inputNumber" v-model.number="id" />
      <p v-if="id === ''" class="text-danger">Please enter a number.</p>
    </b-modal>
  </div>
</template>

<script lang="ts">
import axios from "axios"; // Import Axios at the top
import _ from "lodash";

export default {
  data() {
    return {
      id: "",
      data: {},
    };
  },
  methods: {
    async fetchData() {
      const API = "https://randomuser.me/api";
      return axios
        .get(API)
        .then((response) => {
          const userData = response.data.results[0];
          const { email, gender } = _.pick(userData, ["email", "gender"]);
          const name = `${userData.name.first} ${userData.name.last}`;
          const thumbnail = userData.picture.thumbnail;

          // Return the object
          return {
            name,
            thumbnail,
            email,
            gender,
          };
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    submitForm() {
      if (this.id === "") {
        alert("Please enter a number.");
      } else {
        this.fetchData().then((randomData) => {
          this.data = {
            name: (randomData as { name: string }).name,
            email: (randomData as { email: string }).email,
            gender: (randomData as { gender: string }).gender,
            thumbnail: (randomData as { thumbnail: string }).thumbnail,
          };
          console.log(this.data);
          this.$store.commit("setThisStudent", [this.id, this.data]);
          this.$store.commit("login");
          this.$router.push("/");
          this.$store.commit("updateTime");
        });
      }
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
