<template>
  <div>
    <canvas id="marksChart" ref="marksChart"></canvas>
  </div>
</template>

<script lang="ts">
// Import Chart.js and register linear scale
import Chart from "chart.js/auto";
import _ from "lodash";

export default {
  props: {
    items: Array,
  },
  data() {
    return {
      marksData: this.items as any,
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const canvas = this.$refs.marksChart as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      if (ctx && this.marksData) {
        const labels = _.map(this.marksData, "subject");
        const myMarks = _.map(this.marksData, "my_marks");
        const avgMarks = _.map(this.marksData, "avg_marks");

        new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "My Marks",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(78, 192, 192, 1)",
                borderWidth: 1,
                data: myMarks,
              },
              {
                label: "Average Marks",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
                data: avgMarks,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    },
  },
};
</script>
