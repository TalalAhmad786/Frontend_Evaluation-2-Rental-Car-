<template>
  <div
    class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
  >
    <div class="grid place-items-center">
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-6">
          <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-6">
            Car Management System
          </h2>

          <div>
            <h2 class="text-2xl font-semibold mb-4">Car List</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div v-for="(car, index) in getCars" :key="index">
                <div class="bg-gray-200 rounded-lg overflow-hidden shadow-md">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT9MHAFE2gz-sgWQGV-xl7iQfH2jwEt2BfJQ&usqp=CAU"
                    alt="Car Image"
                    class="w-full h-40 object-cover object-center"
                  />

                  <div class="p-4">
                    <p class="text-lg font-semibold">{{ car.name }}</p>
                    <p class="text-lg font-semibold">{{ car.model }}</p>
                    <p class="text-sm text-gray-600">{{ car.year }}</p>
                  </div>
                  <div class="p-4 flex justify-end">
                    <button
                      @click="inPopup(car.id, index)"
                      class="px-4 py-2 text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteCar(car.id)"
                      class="px-4 py-2 text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div
                v-if="showUpdate"
                class="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-gray-900"
              >
                <div class="bg-white p-6 rounded-lg shadow-md">
                  <h2 class="text-xl font-semibold mb-4">Popup</h2>
                  <div class="mb-4">
                    <label class="block mb-1 font-extrabold text-gray-600"
                      >Car Name</label
                    >
                    <input
                      v-model="updatedCarList.name"
                      class="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div class="mb-4">
                    <label class="block mb-1 font-extrabold text-gray-600"
                      >Car Model</label
                    >
                    <input
                      v-model="updatedCarList.model"
                      class="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div class="mb-4">
                    <label class="block mb-1 font-extrabold text-gray-600"
                      >Car Color</label
                    >
                    <input
                      v-model="updatedCarList.color"
                      class="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div class="mb-4">
                    <label class="block mb-1 font-extrabold text-gray-600"
                      >Car Year</label
                    >
                    <input
                      v-model="updatedCarList.year"
                      class="w-full px-4 py-2 border rounded-md"
                    />
                  </div>

                  <div class="flex justify-end">
                    <button
                      class="mr-2 flex bg-red bg-red-600 text-neutral-100 rounded-full p-3 hover:bg-red-800"
                      @click="editCar"
                    >
                      Update
                    </button>
                    <button
                      class="flex bg-red bg-red-600 text-neutral-100 rounded-full p-3 hover:bg-red-800"
                      @click="showUpdate = false"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

const showUpdate = ref(false);
const updatedCarList = ref({
  name: "",
  model: "",
  color: "",
  year: "",
});
const obj = ref(null);
const userId = store.state.user.user.user._id;

onMounted(async () => {
  console.log(userId);
  await store.dispatch("fetchCars", { id: userId });
});

const getCars = computed(() => store.getters.getCars);

const inPopup = (id, index) => {
  console.log("car id in popup", id);
  obj.value = { id, index };
  updatedCarList.value.name = getCars.value[index].name;
  updatedCarList.value.model = getCars.value[index].model;
  updatedCarList.value.color = getCars.value[index].color;
  updatedCarList.value.year = getCars.value[index].year;
  showUpdate.value = true;
};

const editCar = () => {
  store.dispatch("updateCars", {
    idx: obj.value,
    updatedCar: updatedCarList.value,
  });
  showUpdate.value = false;
};

const deleteCar = (carId) => {
  const obj = { id: carId };
  console.log(obj);
  store.dispatch("deleteCars", obj);
};
</script>
