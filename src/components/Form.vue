<template>
  <div class="container mt-5">
    <h6>Enrollment no: {{ form.id }}</h6>
    <div>
      <b-alert
        :show="dismissCountDown"
        dismissible
        :variant="alertClass"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        {{ alertmsg }}
      </b-alert>
    </div>
    <b-form @submit="onSubmit" v-if="show">
      <b-row class="my-1" v-for="(subject, index) in subjects" :key="index">
        <b-col sm="5" class="mr-4">
          <label :for="`type-${subject}`">{{ subject }}:</label>
        </b-col>
        <b-col sm="6">
          <b-form-input
            :id="`type-${subject}`"
            v-model="form.marks[subject]"
            type="number"
            required
            :disabled="!isEditing"
          ></b-form-input>
          <b-form-invalid-feedback v-if="erroLogInvalidMark">
            Marks must be between 0 and 100.
          </b-form-invalid-feedback>
        </b-col>
      </b-row>

      <b-button type="button" variant="success" class="m-1" @click="autofill"
        >Autofill</b-button
      >
      <b-button
        type="submit"
        variant="primary"
        class="m-1"
        :disabled="hasInvalidMarks"
      >
        Submit
      </b-button>
      <b-button
        type="button"
        variant="danger"
        class="m-1"
        @click="toggleEditing"
        >Update</b-button
      >
    </b-form>
  </div>
</template>

<script lang="ts">
import _ from "lodash";

export default {
  data() {
    return {
      show: true,
      alertmsg: "",
      isEditing: false,
      dismissSecs: 3,
      alertClass: "success",
      dismissCountDown: 0,
      erroLogInvalidMark: false,
      subjects: [
        "Math",
        "Compiler",
        "EngineeringGraphics",
        "DBMS",
        "SoftwareEngineering",
      ],
      form: {
        id: this.$store.state.thisStudent.id,
        marks: {} as { [key: string]: number }, // Provide a type for form.marks
      },
    };
  },
  created() {
    const marks = this.$store.getters.getMarksById(this.form.id);
    _.assign(this.form.marks, marks);
    console.log(this.form.id, marks);
  },
  beforeUpdate() {
    const formMarksKeys = _.keys(this.form.marks);
    _.forEach(formMarksKeys, (subject) => {
      if (!this.isMarksValid(subject)) {
        console.warn(
          `Invalid data for ${subject}: ${this.form.marks[subject]}`
        );
        this.erroLogInvalidMark = true;
        const ele = document.getElementById(`type-${subject}`);
        if (ele) {
          ele.classList.add("shake-animation");
          ele.classList.add("text-danger");
          ele.classList.add("border-danger");
          setTimeout(() => {
            ele.classList.remove("shake-animation");
          }, 2000);
        }
        this.alertClass = "danger";
        this.alertmsg = "Invalid marks";
        this.showAlert();
      }
    });
  },
  updated() {
    const formMarksKeys = _.keys(this.form.marks);
    _.forEach(formMarksKeys, (subject) => {
      if (this.isMarksValid(subject)) {
        this.erroLogInvalidMark = true;
        const ele = document.getElementById(`type-${subject}`)!;
        ele.classList.remove("text-danger");
        ele.classList.remove("border-danger");
        ele.classList.add("border-success");
        setTimeout(() => {
          ele.classList.remove("border-success");
          ele.classList.remove("shake-animation");
        }, 500);
      }
    });
  },
  computed: {
    hasInvalidMarks() {
      for (const subject in this.form.marks) {
        if (!this.isMarksValid(subject)) {
          return true; // Disable the "Submit" button if there are invalid marks
        }
      }
      return false; // Enable the "Submit" button if all marks are valid
    },
  },
  methods: {
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
    onSubmit(event: any) {
      if (this.hasInvalidMarks) {
        return; // Prevent form submission if there are invalid marks
      }
      event.preventDefault();
      const marksAsNumbers = _.mapValues(this.form.marks, (value) =>
        _.toNumber(value)
      );
      this.$store.commit("setMarks", {
        id: this.form.id,
        marks: marksAsNumbers,
      });
      this.$store.commit("setStudent", {
        id: this.form.id,
        marks: marksAsNumbers,
      });
      console.log("", this.$store.state.thisStudent);
      this.alertClass = "success";
      this.alertmsg = "Your data saved successfully";
      this.showAlert();
      this.isEditing = !this.isEditing;
    },
    isMarksValid(subject: any) {
      const marks = this.form.marks[subject];
      return _.inRange(marks, 0, 101); // Check if marks are in the range [0, 100]
    },
    autofill() {
      if (!this.isEditing) return;
      _.forEach(this.subjects, (sub) => {
        this.form.marks[sub] = _.random(1,101);
      });
    },
    countDownChanged(dismissCountDown: number) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>
<style scoped>
.shake-animation {
  animation: shake 0.5s;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
