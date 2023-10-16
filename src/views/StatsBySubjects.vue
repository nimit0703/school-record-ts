<template>
  <div>
    <span>By Subjects </span>
    <div class="my-2">19041010{{ userData.id }}</div>
    <div class="d-flex">
      <div class="left p-3 mr-3" style="width: 50vw; height: 0vh">
        <Table :alldata="alldata" :userData="userData"></Table>
      </div>
      <div class="right border p-3" style="width: 30vw">
        <Chart :items="items" class="mb-5" />
        <Chart2 :items="items" class="mt-5" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import stats from "../mixin/stats";
import Table from "../components/Table.vue";
import Chart from "../components/Chart.vue";
import Chart2 from "../components/Chart2.vue";
import _ from "lodash";
export default {
  mixins: [stats],
  data() {
    return {
      alldata: this.getAllDataReport() ,
      userData: this.$store.state.thisStudent,
      items: [] as any,
    };
  },
  components: {
    Table,
    Chart,
    Chart2,
  },
  created() {
    const thisMarks = this.userData.marks;

    const items = _.map(thisMarks, (my_marks, subject) => {
      const matchingObject = _.find(this.alldata, { name: subject });

      if (!matchingObject) {
        return null;
      }
      return {
        subject,
        my_marks,
        avg_marks: matchingObject.avg.toFixed(2),
        mean: matchingObject.mean.toFixed(2),
        max: matchingObject.max,
        min: matchingObject.min,
      };
    });

    this.items = _.compact(items); // Remove null values

    _.forEach(this.items, (values) => {
      console.log(values);
    });
  },
  beforeDestroy() {
    console.log("beforeDestroyy :: bySubjects");
    this.$store.state.showSpinner = true;

    setTimeout(() => {
      this.$store.state.showSpinner = false;
    }, 700);
  },
  methods: {
  }
}
</script>
