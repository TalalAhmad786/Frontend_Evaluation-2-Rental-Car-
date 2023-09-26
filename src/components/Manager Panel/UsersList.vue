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
              <div v-for="(user, index) in getUsers" :key="index">
                <div class="bg-gray-200 rounded-lg overflow-hidden shadow-md">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT9MHAFE2gz-sgWQGV-xl7iQfH2jwEt2BfJQ&usqp=CAU"
                    alt="Car Image"
                    class="w-full h-40 object-cover object-center"
                  />

                  <div class="p-4">
                    <p class="text-lg font-semibold">{{ user.name }}</p>
                    <p class="text-lg font-semibold">{{ user.email }}</p>
                    <p class="text-sm text-gray-600">{{ user.role }}</p>
                  </div>
                  <div class="p-4 flex justify-end">
                    <button
                      @click="inPopup(user.id, index)"
                      class="px-4 py-2 text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      @click="removeUser(user.id, user.role)"
                      class="px-4 py-2 text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                    <button
                      @click="changePassword(user.id)"
                      class="px-4 py-2 text-red-600 hover:text-red-800"
                    >
                      Change Password
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
                      >User Name</label
                    >
                    <input
                      v-model="updatedUser.name"
                      class="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div class="mb-4">
                    <label class="block mb-1 font-extrabold text-gray-600"
                      >User Email</label
                    >
                    <input
                      v-model="updatedUser.email"
                      class="w-full px-4 py-2 border rounded-md"
                    />
                  </div>

                  <div class="flex justify-end">
                    <button
                      class="mr-2 flex bg-red bg-red-600 text-neutral-100 rounded-full p-3 hover:bg-red-800"
                      @click="editUser"
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
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const authUser = JSON.parse(window.localStorage.getItem("lbUser"));
const store = useStore();
const router = useRouter();
const showUpdate = ref(false);
const updatedUser = ref({
  name: "",
  email: "",
});
const obj = ref(null);

onMounted(() => {
  store.dispatch("fetchUsers");
});

const getUsers = computed(() => store.getters.getUsers);

const inPopup = (id, index) => {
  obj.value = { id, index };
  updatedUser.value.name = getUsers.value[index].name;
  updatedUser.value.email = getUsers.value[index].email;
  showUpdate.value = true;
};

const editUser = async () => {
  await store.dispatch("updateUser", {
    idx: obj.value,
    updatedUser: updatedUser.value,
  });
  showUpdate.value = false;
};

const removeUser = async (userId, role) => {
  const delObj = { id: userId };
  const userRole = { role: role };
  console.log(authUser.user.role);

  await store.dispatch("deleteUser", { payload: delObj, role: userRole });
  if (authUser.user.role === "manager") {
    localStorage.removeItem("lbUser");
    router.push("/");
  }
};

const changePassword = (userId) => {
  console.log(userId);

  router.push(`admin/editUser/cp/${userId}`);
};
</script>
