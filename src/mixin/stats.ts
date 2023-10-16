import Vue from "vue";
import _ from "lodash"; // Import Lodash at the top

export default Vue.extend({
  methods: {
    getReport() {
      const scores = this.$store.state.thisStudent.marks;
      const report: { [key: string]: number | string } = {};

      // Initialize variables for total marks and best/worst scores
      const totalMarks = _.sum(_.values(scores));
      const [bestSubject, bestScore] = _.maxBy(
        _.toPairs(scores),
        ([subject, score]) => score
      );
      const [worstSubject, worstScore] = _.minBy(
        _.toPairs(scores),
        ([subject, score]) => score
      );

      // Loop through the subject sc

      const numSubjects = _.size(scores);
      const averageMarks = _.divide(totalMarks, numSubjects).toFixed(2);
      const percentage = _.multiply(
        _.divide(totalMarks, _.multiply(numSubjects, 100)),
        100
      ).toFixed(2);

      console.log(averageMarks, percentage);

      // Populate the report object
      _.assign(report, {
        "Average Marks": averageMarks,
        "Total Marks": totalMarks,
        Percentage: percentage,
        "Best Subject": `${bestSubject} (${bestScore})`,
        "Worst Subject": `${worstSubject} (${worstScore})`,
      });

      return report;
    },
    getAllDataReport() {
      const thisMarks = this.$store.state.thisStudent.marks;
      const allData = _.map(thisMarks, (my_marks, name) => {
        const avg = this.$store.getters.getAverageScore(name);
        const mean = this.$store.getters.getMeanScore(name);
        const max = this.$store.getters.getMaxScore(name);
        const min = this.$store.getters.getMinScore(name);

        return {
          name,
          avg,
          mean,
          max,
          min,
        };
      });
      // console.log(allData);
      return allData;
    },
  },
});
