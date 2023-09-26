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
            <p class="mt-2 text-sm text-center text-gray-600">
              Welcome to our car management system. Please sign in or create an
              account.
            </p>
          </div>
          <div class="mt-8">
            <div v-if="isLogin">
              <h2 class="text-2xl font-semibold mb-4">Login</h2>
              <form @submit.prevent="login" class="space-y-4">
                <div class="relative">
                  <input
                    v-model="loginData.email"
                    type="email"
                    id="email"
                    name="email"
                    required
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-purple-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    for="email"
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >Email</label
                  >
                </div>
                <div class="relative">
                  <input
                    v-model="loginData.password"
                    type="password"
                    id="password"
                    name="password"
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-purple-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    for="password"
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >Password</label
                  >
                </div>
                <div class="flex justify-end">
                  <button
                    type="submit"
                    class="inline-flex justify-center px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 border border-transparent rounded-md font-semibold focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    Sign In
                  </button>
                </div>
              </form>
              <p class="mt-4 text-sm text-center text-gray-600">
                Don't have an account?
                <button
                  @click="toggleForm"
                  class="text-blue-500 hover:text-blue-700"
                >
                  Sign Up
                </button>
              </p>
            </div>
            <div v-else>
              <h2 class="text-2xl font-semibold mb-4">Sign Up</h2>
              <form @submit.prevent="signup" class="space-y-4">
                <div class="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    v-model="signupData.name"
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-purple-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    for="name"
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >Name</label
                  >
                </div>
                <div class="relative">
                  <input
                    type="text"
                    id="email"
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-purple-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    v-model="signupData.email"
                    name="email"
                    placeholder=" "
                  />
                  <label
                    for="email"
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >Email</label
                  >
                </div>
                <div class="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    v-model="signupData.password"
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-purple-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    for="password"
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >Password</label
                  >
                </div>
                <div class="flex justify-end">
                  <button
                    type="submit"
                    class="inline-flex justify-center px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 border border-transparent rounded-md font-semibold focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <p class="mt-4 text-sm text-center text-gray-600">
                Already have an account?
                <button
                  @click="toggleForm"
                  class="text-blue-500 hover:text-blue-700"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

const toast = useToast();
const isLogin = ref(true);
const loginData = ref({
  email: "",
  password: "",
});
const signupData = ref({
  name: "",
  email: "",
  password: "",
});

const store = useStore();
const router = useRouter();

const toggleForm = () => {
  isLogin.value = !isLogin.value;
};

const login = async () => {
  console.log("Logging in with:", loginData.value);
  const success = await store.dispatch("loginUser", loginData.value);
  console.log(success);
  if (success) {
    window.alert("Login successful!");
    toast.success("Login Succesful", {
      position: "top-right",
      hideProgressBar: true,
      closeButton: "button",
      timeout: 3000,
    });
    router.push("/admin");
  } else {
    toast.error("Incorrect Credentials", {
      position: "top-right",
      hideProgressBar: true,
      closeButton: "button",
      timeout: 3000,
    });
    loginData.value.email = "";
    loginData.value.password = "";
  }
};

const signup = () => {
  console.log("Signing up with:", signupData.value);
  const success = store.dispatch("registerUser", signupData.value);
  if (success) {
    toast.success("Congratulations You are Signed Up!", {
      position: "top-right",
      hideProgressBar: true,
      closeButton: "button",
      timeout: 3000,
    });
    isLogin.value = true;
  } else {
    toast.error("Something Bad Happened", {
      position: "top-right",
      hideProgressBar: true,
      closeButton: "button",
      timeout: 3000,
    });
  }
};
</script>
