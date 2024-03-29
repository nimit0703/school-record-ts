<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Sort"
          label-for="sort-by-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-75"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>

            <b-form-select
              v-model="sortDesc"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
              class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Initial sort"
          label-for="initial-sort-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="initial-sort-select"
            v-model="sortDirection"
            :options="['asc', 'desc', 'last']"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
      <b-col sm="3" md="4" class="ml-5 my-2" style="opacity: 0.9">
        <b-button-group>
          <b-button variant="success" @click="showToppers">Topper</b-button>
          <b-button variant="danger" @click="showFail">fail</b-button>
          <b-button @click="items = $store.state.allStudents">Clear</b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <!-- Main table element -->
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
      :tbody-tr-class="rowClass"
      class="mt-4"
    >
      <template #cell(name)="row">
        {{ row.value }}
      </template>
      <template #cell(actions)="row">
        <b-button
          size="sm"
          @click="info(row.item, row.index, $event.target)"
          class="mr-1"
        >
          Info modal
        </b-button>
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? "Hide" : "Show" }} Details
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </b-card>
      </template>
      <template #cell(percentage)="row">
        {{ calculatePercentage(row.item).toFixed(2) }}%
      </template>
    </b-table>

    <!-- Info modal -->
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      ok-only
      @hide="resetInfoModal"
    >
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script lang="ts">
import _ from "lodash";

export default {
  data() {
    return {
      items: this.$store.state.allStudents,
      fields: [
        {
          key: "id",
          label: "id",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "name",
          label: "name",
          sortable: true,
          class: "desc",
        },
        {
          key: "marks.EngineeringGraphics",
          label: "EngineeringGraphics",
          sortable: true,
        },
        {
          key: "marks.Math",
          label: "Math",
          sortable: true,
        },
        {
          key: "marks.Compiler",
          label: "Compiler",
          sortable: true,
        },
        {
          key: "marks.DBMS",
          label: "DBMS",
          sortable: true,
        },
        {
          key: "marks.SoftwareEngineering",
          label: "SoftwareEngineering",
          sortable: true,
        },
        {
          key: "percentage",
          label: "per",
          sortable: false,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 2,
      pageOptions: [5, 10, 15, { value: 100, text: "100 rows" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: "",
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  beforeMount() {
    this.perPage = 5;
    this.sortBy = "id";
    this.sortDirection = "asc";
  },

  mounted() {
    /*
     * setting this values for correct pagination
     * paggination require two values
     * 1.)number of rows and
     * 2.) rows per page
     * to have correct paginations
     */
    this.totalRows = this.items.length;
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
    calculatePercentage() {
      return (item: { id: number }) => {
        return this.$store.getters.getPercentageById(item.id);
      };
    },
  },
  methods: {
    showToppers() {
      const minimumPercentage = 90; // Adjust this as needed.

      this.items = _.filter(this.$store.state.allStudents, (student) => {
        return (
          this.$store.getters.getPercentageById(student.id) >= minimumPercentage
        );
      });

      // Sort the items by percentage in descending order
      this.items = _.orderBy(
        this.items,
        [(student) => this.$store.getters.getPercentageById(student.id)],
        ["desc"]
      );

      // Update the total number of rows for pagination
      this.totalRows = this.items.length;
    },
    showFail() {
      const minimumPercentage = 35; // Adjust this as needed.

      this.items = _.filter(this.$store.state.allStudents, (student) => {
        return (
          this.$store.getters.getPercentageById(student.id) <= minimumPercentage
        );
      });
      // Update the total number of rows for pagination
      this.totalRows = this.items.length;
    },
    rowClass(item: { id: number }) {
      const per = this.$store.getters.getPercentageById(item.id);
      if (per < 35) {
        if (item.id === this.$store.state.thisStudent.id) {
          return "table-danger text-primary";
        }
        return "table-danger";
      }
      if (per >= 90) {
        if (item.id === this.$store.state.thisStudent.id) {
          return "table-success text-primary";
        }
        return "table-success";
      }
      if (item.id === this.$store.state.thisStudent.id) {
        return "table-primary";
      }
      return "";
    },
    info(item: { id: number }, index: number, button: any) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems: { length: number }) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
