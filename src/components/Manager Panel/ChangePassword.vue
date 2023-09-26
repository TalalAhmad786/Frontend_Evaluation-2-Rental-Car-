<template>
  <div
    class="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 flex items-center justify-center"
  >
    <div class="bg-indigo-400 w-96 p-8 rounded-lg shadow-lg">
      <h2 class="text-3xl font-semibold text-gray-800 mb-6">Change Password</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="newPassword" class="text-sm text-gray-600"
            >New Password</label
          >
          <input
            type="password"
            id="newPassword"
            v-model="formData.newPassword"
            required
            class="block w-full px-4 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm text-sm"
          />
        </div>
        <div>
          <label for="confirmPassword" class="text-sm text-gray-600"
            >Confirm Password</label
          >
          <input
            type="password"
            id="confirmPassword"
            v-model="formData.confirmPassword"
            required
            class="block w-full px-4 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm text-sm"
          />
        </div>

        <div>
          <button
            type="submit"
            class="shadow block w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();

const formData = ref({
  newPassword: null,
  confirmPassword: null,
});

const userId = route.params.userId;

const submitForm = async () => {
  if (
    formData.value.newPassword !== "" &&
    formData.value.confirmPassword !== ""
  ) {
    if (formData.value.newPassword !== formData.value.confirmPassword) {
      alert("Passwords Don't Match!");
    } else {
      const obj = {
        id: userId,
        password: formData.value.confirmPassword,
      };
      console.log(obj);
      const success = await store.dispatch("updatePassword", obj);
      if (success === true) {
        alert("Password Updated Successfully!");
      }
      console.log("Form submitted with data:", formData);
    }
  } else {
    alert("Please Enter both fields");
  }
};
</script>
