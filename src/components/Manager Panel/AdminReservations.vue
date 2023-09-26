<template>
  <div
    class="min-h-screen bg-gradient-to-r from-blue-800 via-purple-500 to-pink-400 py-10 flex items-center justify-center"
  >
    <div
      class="flex flex-wrap justify-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      <div
        v-for="(userReservations, userId) in groupedReservations"
        :key="userId"
        class="mb-4 mx-4 container"
      >
        <div class="bg-white rounded-lg p-4 shadow-lg">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ userReservations[0].user_name }}
          </h2>

          <div
            v-for="(reservation, index) in userReservations"
            :key="index"
            class="mt-4"
          >
            <div class="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 class="text-lg font-semibold text-gray-800">
                {{ reservation.name }}
              </h3>
              <p class="text-sm text-gray-600">{{ reservation.model }}</p>
              <div class="flex justify-between items-center mt-2">
                <span class="text-xs text-gray-400">{{
                  reservation.time
                }}</span>
                <a href="#" class="text-blue-600 hover:underline">Details</a>
              </div>
              <button
                type="button"
                class="w-full text-gray-900 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-bold rounded-lg text-sm px-2 py-2.5 text-center flex justify-center items-center focus:ring-gray-600 bg-red-600 border-purple-800 text-white hover:bg-purple-700 mr-2 mb-2 mt-4"
                @click="cancelReservation(reservation.id, reservation.carId)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  class="mr-2"
                  width="20"
                  height="20"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="M 12 8 L 8 12 L 24.666016 32 L 8 52 L 12 56 L 32 39.333984 L 52 56 L 56 52 L 39.333984 32 L 56 12 L 52 8 L 32 24.666016 L 12 8 z"
                  ></path>
                </svg>
                <span class="inline-block">Cancel Reservation</span>
              </button>
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
const userId = ref(store.state.user.user.user._id);
const allReservations = computed(() => store.getters.getAllReservations);

const groupedReservations = computed(() => {
  const grouped = {};
  for (const reservation of allReservations.value) {
    const userId = reservation.userId;
    if (!grouped[userId]) {
      grouped[userId] = [];
    }
    grouped[userId].push(reservation);
  }
  return grouped;
});

const fetchReservations = () => {
  store.dispatch("fetchAllReservations");
};

const cancelReservation = async (reservationId, carId) => {
  const deleteRes = { id: reservationId };
  const availaibility = { id: carId, availaibility: "availaible" };
  console.log("Cancelled reservation with ID:", reservationId);
  console.log(availaibility);
  await store.dispatch("deleteReservation", deleteRes);
  await store.dispatch("updateAvailaibilty", { payload: availaibility });
};

onMounted(() => {
  fetchReservations();
});
</script>
