<template>
  <div v-if="show" class="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-gray-900">
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
      <p>{{ message }}</p>
      <div class="flex justify-end mt-4">
        <button @click="confirmAction" class="mr-2 bg-red-600 text-neutral-100 rounded-full p-3 hover:bg-red-800">
          Confirm
        </button>
        <button @click="closeModal" class="bg-gray-300 text-gray-700 rounded-full p-3 hover:bg-gray-400">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    title: String,
    message: String,
    confirmCallback: Function,
    closeModal: Function,
  },
  methods: {
    confirmAction() {
      this.confirmCallback();
      this.closeModal();
    },
  },
};
</script>
