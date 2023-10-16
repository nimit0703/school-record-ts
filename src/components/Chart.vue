<template>
  <div>
    <canvas id="marksChart" ref="marksChart"></canvas>
  </div>
</template>

<script lang="ts">
// Import Chart.js and register linear scale
import Chart from "chart.js/auto";

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
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: this.marksData.map((item:{subject:string}) => item.subject),
            datasets: [
              {
                label: "My Marks",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(78, 192, 192, 1)",
                borderWidth: 1,
                data: this.marksData.map((item:{my_marks:number}) => item.my_marks),
              },
              {
                label: "Average Marks",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
                data: this.marksData.map((item:{avg_marks:number}) => item.avg_marks),
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
