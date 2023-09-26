<template>
  <div
    class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
  >
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
      ></div>
      <div
        class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
      >
        <div class="max-w-md mx-auto">
          <div>
            <h2 class="text-3xl font-extrabold text-center text-gray-900">
              Car Management System
            </h2>
          </div>
          <div class="divide-y divide-gray-200">
            <div class="mt-8">
              <h2 class="text-2xl font-semibold mb-4">Create a New Car</h2>
              <form @submit.prevent="create" class="space-y-4">
                <div class="space-y-2">
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-700"
                    >Name</label
                  >
                  <input
                    v-model="cars.name"
                    type="text"
                    id="name"
                    name="name"
                    required
                    class="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                  />
                </div>
                <div class="space-y-2">
                  <label
                    for="model"
                    class="block text-sm font-medium text-gray-700"
                    >Model</label
                  >
                  <input
                    v-model="cars.model"
                    type="text"
                    id="model"
                    name="model"
                    required
                    class="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                  />
                </div>
                <div class="space-y-2">
                  <label
                    for="color"
                    class="block text-sm font-medium text-gray-700"
                    >Color</label
                  >
                  <input
                    v-model="cars.color"
                    type="text"
                    id="color"
                    name="color"
                    required
                    class="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                  />
                </div>
                <div class="space-y-2">
                  <label
                    for="year"
                    class="block text-sm font-medium text-gray-700"
                    >Year</label
                  >
                  <select v-model="cars.year">
                    <option value="" disabled selected>Select a year</option>
                    <option
                      v-for="year in yearList"
                      :key="year.id"
                      :value="year"
                    >
                      {{ year }}
                    </option>
                  </select>
                  <input
                    v-model="cars.year"
                    type=""
                    id="year"
                    name="year"
                    required
                    disabled
                    class="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                  />
                </div>
                <div class="flex justify-end">
                  <button
                    type="submit"
                    class="inline-flex justify-center px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 border border-transparent rounded-md font-semibold focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    Create Car
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const selectedYear = ref("");
const startYear = ref(1990);
const endYear = ref(new Date().getFullYear());
const cars = ref({
  userId: store.state.user.user.user.user._id,
  name: "",
  model: "",
  color: "",
  year: "",
});

const yearList = computed(() => {
  const years = [];
  for (let i = endYear.value; i >= startYear.value; i--) {
    years.push(i);
  }
  return years;
});
const create = () => {
  console.log(cars.value.userId);
  console.log(store.dispatch("car/createCar", cars.value));
};
</script>
