<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white w-96 p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Add User</h2>
      <form @submit.prevent="addUser" class="space-y-4">
        <div>
          <label for="name" class="text-sm font-medium text-gray-600"
            >Name</label
          >
          <input
            type="text"
            id="name"
            v-model="user.name"
            required
            class="block w-full px-4 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm text-sm"
          />
        </div>
        <div>
          <label for="email" class="text-sm font-medium text-gray-600"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="user.email"
            required
            class="block w-full px-4 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm text-sm"
          />
        </div>
        <div>
          <label for="password" class="text-sm font-medium text-gray-600"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="user.password"
            required
            class="block w-full px-4 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm text-sm"
          />
        </div>
        <div>
          <label for="role" class="text-sm font-medium text-gray-600"
            >Role</label
          >
          <select
            id="role"
            v-model="user.role"
            required
            class="block w-full px-4 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm text-sm"
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            class="block w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
const toast = useToast();
const store = useStore();

const user = ref({
  name: "",
  email: "",
  password: "",
  role: "user",
});

const addUser = async () => {
  const success = await store.dispatch("user/registerUser", user.value);
 
    
    alert("User Added");
    if(user.value.role=== 'user'){
    toast.success("User Added", {
      position: "top-right",
      hideProgressBar: true,
      closeButton: "button",
      timeout: 3000,
    });
  }
  else{
    toast.success("Manager Added", {
      position: "top-right",
      hideProgressBar: true,
      closeButton: "button",
      timeout: 3000,
    });
  }
  
};
</script>
