import _ from "lodash";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const isLogin =
  JSON.parse(_.toString(localStorage.getItem("isLogin"))) || false;
const storedThisStudent =
  JSON.parse(_.toString(localStorage.getItem("thisStudent"))) || {};
const storedAllStudents =
  JSON.parse(_.toString(localStorage.getItem("allStudents"))) || [];

const defaultMarks = {
  Math: 0,
  Compiler: 0,
  EngineeringGraphics: 0,
  DBMS: 0,
  SoftwareEngineering: 0,
};

const store = new Vuex.Store({
  state: {
    showSpinner: false,
    timer: 0,
    time: 0,
    isLogin: isLogin,
    thisStudent: storedThisStudent,
    allStudents: storedAllStudents,
  },
  mutations: {
    logout(state) {
      state.isLogin = false;
      localStorage.setItem("isLogin", JSON.stringify(state.isLogin));
    },
    login(state) {
      state.isLogin = true;
      localStorage.setItem("isLogin", JSON.stringify(state.isLogin));
    },
    setMarks(state, { id, marks }) {
      state.thisStudent.id = id;
      state.thisStudent.marks = marks;
      localStorage.setItem("thisStudent", JSON.stringify(state.thisStudent));
    },
    setStudent(state, { id, marks }) {
      const existingStudent = state.allStudents.find(
        (student: { id: any }) => student.id === id
      );
      if (existingStudent) {
        existingStudent.marks = marks;
      } else {
        const newStudent = {
          id,
          name: `student ${id}`,
          marks,
        };
        state.allStudents.push(newStudent);
      }
      localStorage.setItem("allStudents", JSON.stringify(state.allStudents));
    },
    setThisStudent(state, [id, data]) {
      console.log("in", data);
      const existingStudent = state.allStudents.find(
        (student: any) => student.id === id
      );
      if (existingStudent) {
        state.thisStudent = existingStudent;
      } else {
        const marks = defaultMarks;
        state.thisStudent = {
          id,
          name: data.name,
          img: data.thumbnail,
          email: data.email,
          gender: data.gender,
          marks,
        };
        state.allStudents.push(state.thisStudent);
        localStorage.setItem("allStudents", JSON.stringify(state.allStudents));
      }
      localStorage.setItem("thisStudent", JSON.stringify(state.thisStudent));
    },
    updateTime(state) {
      state.time += 1;
    },
    setNewTimmer(state) {
      state.time = 0;
    },
    setSpinnerVisibility(state,show){
      state.showSpinner = show;
    },
  },
  getters: {
    getMarksById: (state) => (id:number) => {
      const student = state.allStudents.find((student:any) => student.id === id);

      if (student) {
        return student.marks;
      } else {
        return {
          Math: 0,
          Compiler: 0,
          EngineeringGraphics: 0,
          DBMS: 0,
          SoftwareEngineering: 0,
        };
      }
    },
    getAverageScore: (state) => (subject:string) => {
      const scores = state.allStudents.map((student:any) => student.marks[subject]);
      return scores.reduce((total:number, score:number) => total + score, 0) / scores.length;
    },

    // Calculate mean score for a subject
    getMeanScore: (state) => (subject:string) => {
      const scores = state.allStudents.map((student:any) => student.marks[subject]);
      return scores.reduce((total:number, score:number) => total + score, 0) / scores.length;
    },

    // Calculate maximum score for a subject
    getMaxScore: (state) => (subject:string) => {
      const scores = state.allStudents.map((student:any) => student.marks[subject]);
      return Math.max(...scores);
    },

    // Calculate minimum score for a subject
    getMinScore: (state) => (subject:string) => {
      const scores = state.allStudents.map((student:any) => student.marks[subject]);
      return Math.min(...scores);
    },
    
    // Calculate % score for a student
    getPercentageById: (state) => (id:number) => {
      const student = state.allStudents.find((student:any) => student.id === id);
    
      if (student) {
        const totalMarks = student.marks.Math + student.marks.Compiler + student.marks.EngineeringGraphics + student.marks.DBMS + student.marks.SoftwareEngineering;
        const percentage = (totalMarks / 500) * 100; // Assuming the total marks for all subjects is 500
        return percentage;
      } else {
        return 0; // You can return 0 or any other default value for students who are not found
      }
    },
  },
});

export default store;
