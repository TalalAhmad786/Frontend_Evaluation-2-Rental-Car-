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

          <div class="mt-4">
            <label class="block mb-2 text-lg font-medium">Search Cars:</label>
            <input
              v-model="searchQuery"
            
              class="w-full px-4 py-2 border rounded-md"
              placeholder="Search by car name or model"
            />
          </div>
          <div>
            <h2 class="text-2xl font-semibold mb-4">Car List</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div v-for="(car, index) in filteredCars" :key="index">
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
                    <p class="text-sm text-gray-600">{{ car.color }}</p>
                    <h1 class="text-lg font-bold text-gray-600">
                      {{ car.availaibility }}
                    </h1>
                  </div>
                  <div class="p-4 flex justify-end">
                    <button
                      @click="inPopup(car.id, index)"
                      class="px-4 py-2 text-blue-600 hover:text-blue-800"
                      v-if="car.availaibility == 'availaible'"
                    >
                      Book Now
                    </button>
                    <!-- <button
                      @click="deleteCar(car.id)"
                      class="px-4 py-2 text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button> -->
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
                    <label class="block mb-1 font-extrabold text-gray-600">Car Name: </label>
                    <input
                      v-model="CarList.name"
                      class="w-full px-4 py-2 border rounded-md"
                      disabled
                    />
                  </div>
                  <div class="mb-4">
                    <label class="block mb-1 font-extrabold text-gray-600">Car Model</label>
                    <input
                      v-model="CarList.model"
                      class="w-full px-4 py-2 border rounded-md"
                      disabled
                    />
                  </div>
                  <div class="mb-4">
                    <label class="block mb-1 font-extrabold text-gray-600">Car Color</label>
                    <input
                      v-model="CarList.color"
                      class="w-full px-4 py-2 border rounded-md"
                      disabled
                    />
                  </div>
                  <div class="mb-4">
                    <label class="block mb-1 font-extrabold text-gray-600">Car Year</label>
                    <input
                      v-model="CarList.year"
                      class="w-full px-4 py-2 border rounded-md"
                      disabled
                    />
                  </div>
                  <div class="mb-4">
                    <label class="block mb-1 font-extrabold text-gray-600">For How much time you want?</label>
                    <input
                    type="date"
                      v-model="reservationDetails.time"
                      class="w-full px-4 py-2 border rounded-md"
                      required
                    />
                  </div>

                  <div class="flex justify-end">
                    <button
                      class="mr-2 flex bg-red bg-red-600 text-neutral-100 rounded-full p-3 hover:bg-red-800"
                      @click="bookCar"
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
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useToast } from "vue-toastification";
const store = useStore();
const toast = useToast();
const name = ref('');
const model = ref('');
const showUpdate = ref(false);
const CarList = ref({
  name: '',
  model: '',
  color: '',
  year: '',
});
const getAllCars = computed(() => store.getters.getAllCars);

const reservationDetails = ref({
  time: '',
  userId: JSON.parse(localStorage.getItem('lbUser')),
});
const searchQuery = ref('');
const objid = ref(null);
const obj = ref(null);

onMounted(() => {
//  console.log("userid",reservationDetails.value.userId.user._id);
  store.dispatch('fetchAllCars');
});

const inPopup = (carid, index) => {
  
  obj.value = { id: carid, index: index };
  objid.value = carid;
  CarList.value.name = getAllCars.value[index].name;
  CarList.value.model = getAllCars.value[index].model;
  CarList.value.color = getAllCars.value[index].color;
  CarList.value.year = getAllCars.value[index].year;
  showUpdate.value = true;
};

const bookCar = async () => {
  const details = {
    time: reservationDetails.value.time,
    userId: reservationDetails.value.userId.user._id,
    user_name: reservationDetails.value.userId.user.name,
  };
  const avaialaibility = { id: objid.value, availaibility: 'unavailable' };
  await store.dispatch( 'createReservation',{ idx: obj.value, payload: details });
  await store.dispatch('updateAvailaibilty',{ payload: avaialaibility });

  
    toast.info("Reservation Added",{
      position: 'top-right',
      hideProgressBar: true,
      closeButton: "button",
      timeout: 3000, 
    });
  

  showUpdate.value = false;
};

const filteredCars = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) {
    return getAllCars.value;
  } else {
    return getAllCars.value.filter((car) => {
      return (
        car.name.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        car.color.toLowerCase().includes(query)
      );
    });
  }
});


</script>


