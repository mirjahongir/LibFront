<!-- =========================================================================================
    File Name: TodoAddNew.vue
    Description: Add new todo component
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="todo__filters-container">
    <!-- all -->

    <div class="px-6 py-4"   v-for="(item, j) in $store.state.projects"  :key="j">
      <div
      
        class="flex cursor-pointer"
        :class="{ 'text-primary': todoFilter == 'all' }"
       
      >
        <feather-icon
          icon="MailIcon"
          :svgClasses="[
            { 'text-primary stroke-current': todoFilter == 'all' },
            'h-6 w-6',
          ]"
        ></feather-icon>
        <span class="text-lg ml-3" @click="changeProject(item)">{{
          item.name
        }}</span>
      </div>
       <vs-divider></vs-divider>
    </div>

   
    {{ temp }}
    <!-- starred 
        <div class="px-6 py-4">
            <h5>Filters</h5>

            <template v-for="filter in todoFilters">
                <div class="flex mt-6 cursor-pointer" :class="{'text-primary': todoFilter == filter.filter}" @click="applyTodoFilter(filter.filter)" :key="filter.filter">
                    <feather-icon :icon="filter.icon" :svgClasses="[{'text-primary stroke-current': todoFilter == filter.filter}, 'h-6 w-6']"></feather-icon>
                    <span class="text-lg ml-3">{{ filter.filterName }}</span>
                </div>
            </template>

        </div>

       

        <div class="px-6 py-4">
            <h5>Labels</h5>
            <div class="todo__lables-list">
                <div class="todo__label flex items-center mt-6 cursor-pointer" v-for="(tag, index) in todoTags" :key="index" @click="applyTodoFilter(tag.value)">
                    <div class="h-4 w-4 rounded-full mr-4" :class="'bg-' + tag.color"></div>
                    <span class="text-lg" :class="{'text-primary': todoFilter == tag.value}">{{ tag.text }}</span>
                </div>
            </div>
        </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        id: "",
        name: "",
        pageNumber: 0,
        pageSize: 100,
      },
      temp: 0,
    };
  },
  computed: {
    todoTags() {
      return this.$store.state.todo.todoTags;
    },
    todoFilter() {
      return this.$store.state.todo.todoFilter;
    },
  },
  methods: {
    getProjects() {
      let query = new URLSearchParams(this.query);
      console.log(query);
      this.$api.get("/apimate/Project/Get?" + query).then(
        (response) => {
          console.log(response);
          this.temp++;
          this.$store.state.projects = response;
        },
        (err) => {
          this.$store.getters.errorParse(this, err);
        }
      );
    },
    changeProject(project) {
      this.$emit("changeProject", project);
      
    },
  },
  mounted() {
    this.getProjects();
  },
};
</script>
