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
// import stats from "../mixin/stats";
import Table from "../components/Table.vue";
import Chart from "../components/Chart.vue";
import Chart2 from "../components/Chart2.vue";
export default {
  // mixins: [stats],
  data() {
    return {
      alldata: this.getAllDataReport(),
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
    let i = -1;
    for (let sub in thisMarks) {
      i++;
      const my_marks = thisMarks[sub];
      const matchingObject = this.alldata.find(
        (obj: { name: string }) => obj.name === sub
      );

      const avg_marks = matchingObject.avg.toFixed(2);
      const mean = matchingObject.mean.toFixed(2);
      const max = matchingObject.max;
      const min = matchingObject.min;
      const values = {
        subject: sub,
        my_marks,
        avg_marks,
        mean,
        max,
        min,
      };
      this.items.push(values);
      console.log(values);
    }
  },
  beforeDestroy() {
    console.log("beforeDestroyy :: bySubjects");
    this.$store.state.showSpinner = true;

    setTimeout(() => {
      this.$store.state.showSpinner = false;
    }, 700);
  },
  methods: {
    getAllDataReport() {
      const thisMarks = this.$store.state.thisStudent.marks;
      const allData = [];
      for (let sub in thisMarks) {
        const name = sub;
        const avg = this.$store.getters.getAverageScore(name);
        const mean = this.$store.getters.getMeanScore(name);
        const max = this.$store.getters.getMaxScore(name);
        const min = this.$store.getters.getMinScore(name);
        const subData = {
          name: name,
          avg: avg,
          mean: mean,
          max: max,
          min: min,
        };
        allData.push(subData);
      }
      // console.log(allData);
      return allData;
    },
  },
};
</script>
