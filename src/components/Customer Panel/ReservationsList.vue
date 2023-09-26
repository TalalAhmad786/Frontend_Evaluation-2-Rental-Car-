<template>
  <div
    class="min-h-screen bg-gradient-to-r from-blue-800 via-purple-500 to-pink-400 py-10 flex items-center justify-center"
  >
    <div
      class="flex flex-wrap justify-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      <div
        v-for="(reservation, index) in getReservations"
        :key="index"
        class="mb-4 mx-4"
      >
        <div
          class="container p-6 h-36 border border-gray-200 shadow bg-gray-800 border-gray-700 -mt-18 rounded-t-full border-b-0"
        >
          <div
            class="container p-6 pt-11 h-28 border border-gray-200 bg-gray-800 border-gray-700 -mt-18 rounded-t-full border-b-0 flex justify-center items-center"
          >
            <div
              class="relative w-28 h-28 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
            >
              <img
                class="absolute w-full h-full object-cover"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT9MHAFE2gz-sgWQGV-xl7iQfH2jwEt2BfJQ&usqp=CAU"
                alt="Rounded avatar"
              />
            </div>
          </div>
        </div>
        <div
          class="container max-w-[250px] p-6 border border-gray-200 shadow bg-gray-800 border-gray-700 border-t-[0px]"
        >
          <div class="mt-2">
            <div class="flex justify-between items-center">
              <a href="#">
                <h5
                  class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 text-white"
                >
                  {{ reservation.name }}
                </h5>
              </a>
              <a href="#">
                <p
                  class="mb-2 text-xs items-center flex justify-center font-semibold tracking-tight text-[#b5b1a8] shadow-2xl shadow-zinc-800"
                >
                  {{ reservation.time }}
                </p>
              </a>
            </div>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              {{ reservation.model }}
            </p>
            <a
              href="#"
              class="inline-flex items-center text-blue-600 hover:underline"
            >
              {{ reservation.color }}
            </a>
            <button
              type="button"
              class="text-gray-900 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-bold rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center focus:ring-gray-600 bg-red-600 border-purple-800 text-white hover:bg-purple-700 mr-2 mb-2"
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
              Cancel Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
const toast = useToast();
const store = useStore();

const userId = JSON.parse(localStorage.getItem("lbUser"));

const getReservations = computed(() => store.getters['reservation/getReservations']);

onMounted(async () => {
  console.log("User id in reser", userId.user._id);
   await store.dispatch("reservation/fetchReservations", { id: userId.user._id });
});

const cancelReservation = async (reservationId, carId) => {
  const deleteRes = { id: reservationId };
  const availaibility = { id: carId, availaibility: "availaible" };
  console.log("Cancelled reservation with ID:", reservationId);
  console.log(availaibility);
  await store.dispatch("reservation/deleteReservation", deleteRes);
  await store.dispatch("car/updateAvailaibilty", { payload: availaibility });

  toast.clear("Reservation Deleted", {
    position: "top-right",
    hideProgressBar: true,
    closeButton: "button",
    timeout: 3000,
  });
};
</script>
