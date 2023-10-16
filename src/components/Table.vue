<template>
  <div>
    <b-table
      :items="items"
      :fields="fields"
      :tbody-tr-class="rowClass"
    ></b-table>
  </div>
</template>

<script lang="ts">
import _ from "lodash"; // Import lodash

export default {
  data() {
    return {
      fields: ["subject", "my_marks", "avg_marks", "mean", "max", "min"],
      items: [] as any,
    };
  },
  created() {
    const thisMarks = this.userData.marks;

    // Use lodash's map function to simplify the loop
    this.items = _.map(thisMarks, (my_marks, sub) => {
      const matchingObject = _.find(this.alldata, { name: sub });

      if (matchingObject) {
        const transformedObject = _.mapValues(matchingObject, (value) => {
          if (typeof value === "number") {
            return value.toFixed(2);
          }
          return value;
        });

        return {
          subject: sub,
          my_marks,
          ...transformedObject,
        };
      }

      return null; // Return null for items without a matchingObject
    });
  },
  props: {
    alldata: Array as any,
    userData: Object as any,
  },
  methods: {
    rowClass(item: any, type: string) {
      if (!item || type !== "row") return;
      return {
        "table-danger": item.my_marks < 30,
      };
    },
  },
};
</script>
