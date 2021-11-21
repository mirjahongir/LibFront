<template>
  <div class="px-6 pb-2 pt-6">
    <vs-button
      @click="activePrompt = true"
      v-if="$store.state.selectProject"
      class="w-full"
      >Add Error Modal</vs-button
    >
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
          <!-- <div class="vx-row">
        <div class="vx-col">
        <vs-input
                name="title"
                class="w-full mb-4 mt-5"
                placeholder="Project Name"
                v-model="newProject.name"
              />
        </div>
          <div class="vx-col">
          <vs-input
                name="title"
                class="w-full mb-4 mt-5"
                placeholder="Project Name"
                v-model="newProject.name"
              />
          </div>
          </div>
          -->
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-input
                label="Code"
                class="w-full mb-4 mt-5"
                v-model="errorModal.code"
              ></vs-input>
              <vs-input
                class="w-full mb-4 mt-5"
                label="Http Status"
                v-model="errorModal.httpStatus"
              ></vs-input>
              <vs-input
                class="w-full mb-4 mt-5"
                placeholder="Message"
                v-model="errorModal.message"
              ></vs-input>
              <vs-input
                class="w-full mb-4 mt-5"
                placeholder="Uzb Text"
                v-model="errorModal.uzbText"
              ></vs-input>
              <vs-input
                class="w-full mb-4 mt-5"
                placeholder="Rus Text"
                v-model="errorModal.rusText"
              ></vs-input>
              <vs-input
                class="w-full mb-4 mt-5"
                placeholder="Eng Text"
                v-model="errorModal.engText"
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
      errorModal: {
        code: 0,
        httpStatus: 0,
        message: "",
        uzbText: "",
        rusText: "",
        engText: "",
      },
      activePrompt: false,
    };
  },
  computed: {},
  methods: {
    submitTodo() {
      this.errorModal.code= parseInt(this.errorModal.code);
      this.errorModal.httpStatus= parseInt(this.errorModal.httpStatus);
      this.$emit("addError", this.errorModal);
    },
  },
};
</script>
