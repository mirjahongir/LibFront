<!-- =========================================================================================
    File Name: TodoAddNew.vue
    Description: Add new todo component
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="px-6 pb-2 pt-6">
    <vs-button @click="activePrompt = true" class="w-full">Add Task</vs-button>
    <vs-prompt
      vs-title="Add Project"
      vs-button-cancel="border"
      @vs-cancel="clearFields"
      @vs-accept="submitTodo"
      @vs-close="clearFields"
      :vs-active.sync="activePrompt"
    >
      <div>
        <form>
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-input
                name="title"
                class="w-full mb-4 mt-5"
                placeholder="Project Name"
                v-model="newProject.name"
              />
              <vs-input
                name="login"
                class="w-full mb-4 mt-5"
                placeholder="Project Login"
                v-model="newProject.loginName"
              ></vs-input>
              <vs-input
                name="login"
                class="w-full mb-4 mt-5"
                placeholder="Project Password"
                v-model="newProject.password"
              ></vs-input>
            </div>
          </div>
        </form>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newProject: {
        name: "",
        loginName: "",
        password: "",
      },
      activePrompt: false,
    };
  },
  computed: {
    todoTags() {
      return this.$store.state.todo.todoTags;
    },
    validateForm() {
      return !this.errors.any() && this.title != "";
    },
  },
  methods: {
    addTodo() {},
    clearFields() {},
    submitTodo() {
      if (
        this.newProject.name &&
        this.newProject.password &&
        this.newProject.loginName
      )
        this.$api.post("/apimate/Project/Post", this.newProject).then(
          (response) => {
            console.log(response);
            this.$store.state.projects.push(response.project);
          },
          (err) => {
            this.$store.getters.errorParse(this, err);
          }
        );
    },
  },
};
</script>
