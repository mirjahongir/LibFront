<template>
  <div
    id="todo-app"
    class="
      border border-solid
      d-theme-border-grey-light
      rounded
      relative
      overflow-hidden
    "
  >
    <vs-sidebar
      class="items-no-padding"
      parent="#todo-app"
      :click-not-close="clickNotClose"
      :hidden-background="clickNotClose"
      v-model="isSidebarActive"
    >
      <todo-add-new></todo-add-new>
      <VuePerfectScrollbar class="todo-scroll-area" :settings="settings">
        <todo-filters
          @changeProject="changeProject"
          @closeSidebar="toggleTodoSidebar"
        ></todo-filters>
      </VuePerfectScrollbar>
    </vs-sidebar>

    <div
      :class="{ 'sidebar-spacer': clickNotClose }"
      class="
        app-fixed-height
        border border-r-0 border-b-0 border-t-0 border-solid
        d-theme-border-grey-light
        app-fixed-height
      "
    >
      <div
        class="
          flex
          items-center
          app-search-container
          border border-l-0 border-r-0 border-t-0 border-solid
          d-theme-border-grey-light
        "
      >
        <feather-icon
          class="md:inline-flex lg:hidden ml-4 mr-4 cursor-pointer"
          icon="MenuIcon"
        ></feather-icon>
        <todo-error-modal @addError="addErrorModal"></todo-error-modal>
      </div>
      <!--   <div
        class="
          flex
          items-center
          app-search-container
          border border-l-0 border-r-0 border-t-0 border-solid
          d-theme-border-grey-light
        "
      >
        TOGGLE SIDEBAR BUTTON 
        <feather-icon
          class="md:inline-flex lg:hidden ml-4 mr-4 cursor-pointer"
          icon="MenuIcon"
          @click.stop="toggleTodoSidebar(true)"
        ></feather-icon>

         SEARCH BAR
        <vs-input
          size="large"
          icon-pack="feather"
          icon="icon-search"
          placeholder="Search..."
          v-model="searchQuery"
          class="
            vs-input-no-border vs-input-no-shdow-focus
            no-icon-border
            w-full
          "
        />
      </div>-->

      <!-- TODO LIST -->
      <VuePerfectScrollbar
        class="todo-content-scroll-area"
        :settings="settings"
        ref="todoListPS"
      >
        <transition-group
          class="todo-list"
          name="list-enter-up"
          tag="ul"
          appear
        >
        
          <li
            class="cursor-pointer todo_todo-item"
            v-for="(todoItem, index) in errorData"
            :key="String(todoFilter) + String(todoItem.id)"
            :style="[{ transitionDelay: index * 0.1 + 's' }]"
          >
          {{todoItem}}
            <todo-item 
              @errorData="todoItem"
              
            ></todo-item>
          </li>
        </transition-group>
      </VuePerfectScrollbar>
      <!-- /TODO LIST -->
    </div>

    <!-- EDIT TODO DIALOG -->
    <todo-edit
      :displayPrompt="displayPrompt"
      :todoItemId="todoIdToEdit"
      @hideDisplayPrompt="hidePrompt"
      v-if="displayPrompt"
    ></todo-edit>
  </div>
</template>

<script>
import TodoAddNew from "./TodoAddNew.vue";
import TodoItem from "./TodoItem.vue";
import TodoFilters from "./TodoFilters.vue";
import TodoEdit from "./TodoEdit.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import TodoErrorModal from "./TodoErrorModal.vue";
export default {
  data() {
    return {
      clickNotClose: true,
      displayPrompt: false,
      todoIdToEdit: 0,
      isSidebarActive: true,
      windowWidth: window.innerWidth,

      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      query: {
        id: "",
        name: "",
        pageNumber: 0,
        pageSize: 100,
      },
    };
  },
  watch: {
    todoFilter() {
      this.$refs.todoListPS.$el.scrollTop = 0;
    },
  },
  computed: {
    todo() {
      return this.$store.state.todo.todoArray;
    },
    todoFilter() {
      return this.$store.state.todo.todoFilter;
    },
    todoList() {
      return this.$store.getters["todo/todoList"];
    },
    searchQuery: {
      get() {
        return this.$store.state.todo.todoSearchQuery;
      },
      set(val) {
        this.$store.dispatch("todo/setTodoSearchQuery", val);
      },
    },
  },
  methods: {
    addErrorModal(errorModal) {
      let obj = {
        projectId: this.$store.state.selectProject.id,
        errorModel: errorModal,
      };
      this.$api.post("/apimate/ProjectError/Post", obj).then(
        (response) => {
          console.log(response);
        this.errorData.push(response.result.projectError);  
          
        },
        (err) => {
          this.$store.getters.errorParse(this, err);
        }
      );
      console.log(errorModal);
    },
    changeProject(project) {
      console.log(project);
      this.$store.state.selectProject = project;
      this.pageNumber = 0;
      this.getProjectErrors(project.id);
    },
    getProjectErrors(id) {
      this.query.id = id;

      let query = new URLSearchParams(this.query);

      this.$api.get("/apimate/ProjectError/Get?" + query).then(
        (response) => {
          this.errorData = response.result;
          console.log(this.errorData)
        },
        (err) => {
          this.$store.getters.errorParse(this, err);
        }
      );
    },

    // showDisplayPrompt(itemId) {
    //   this.todoIdToEdit = itemId;
    //   this.displayPrompt = true;
    // },
    // hidePrompt() {
    //   this.displayPrompt = false;
    // },
    // handleWindowResize(event) {
    //   this.windowWidth = event.currentTarget.innerWidth;
    //   this.setSidebarWidth();
    // },
    // setSidebarWidth() {
    //   if (this.windowWidth < 992) {
    //     this.isSidebarActive = this.clickNotClose = false;
    //   } else {
    //     this.isSidebarActive = this.clickNotClose = true;
    //   }
    // },
    // toggleTodoSidebar(value = false) {
    //   if (!value && this.clickNotClose) return;
    //   this.isSidebarActive = value;
    // },
  },
  components: {
    TodoAddNew,
    TodoItem,
    TodoFilters,
    TodoEdit,
    VuePerfectScrollbar,
    TodoErrorModal,
  },
  created() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.handleWindowResize);
    });
    this.setSidebarWidth();
  },
  beforeDestroy: function () {
    window.removeEventListener("resize", this.handleWindowResize);
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/apps/todo.scss";
</style>
