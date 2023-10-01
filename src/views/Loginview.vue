<template>
  <div :style="{
      backgroundImage: `url(${require('../../public/Car-hero.jpg')})`,
  }" class="h-screen w-full flex justify-center items-center bg-no-repeat bg-center bg-cover">
      <div id="title" class="mb-5 text-black text-3xl font-mono font-display font-extrabold fixed top-20">
          <span id="text"></span>
          <span id="cursor" class="animate-blink">_</span>
      </div>
      <div>
          <div v-if="isLogin">
              <div
                  class="backdrop-blur-md h-[450px] w-[400px] border-2 border-[#625d5d] rounded-3xl bg-[rgb(255 255 255 / 0%)] flex flex-col justify-center items-center">

                  <h2 class="text-white text-[2rem] text-center font-display font-semibold fixed top-10">
                      Login Here
                  </h2>
                  <form @submit.prevent="login" class="space-y-4">
                      <div class="mt-5 w-full pl-10 pr-10">
                          <div class="relative mb-6 w-full">
                              <div class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                                  <font-awesome-icon icon="fa-regular fa-envelope" style="color: #ffffff" />
                              </div>

                              <div class="relative z-0">
                                  <input type="email" id="email"
                                  v-model="loginData.email"
                                      class="block pr-10 p-3 w-full h-12 text-base text-black bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-white dark:focus:white focus:outline-none focus:ring-0 focus:white peer"
                                      placeholder=" " />
                                  <label for="email"
                                      class="absolute text-base text-white dark:text-gray-400 duration-300 transform -translate-y-4 top-1 z-10 origin-[0] bg-transparent dark:bg-white px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:-translate-y-4 left-1">Email</label>
                              </div>
                          </div>
                      </div>
                      <div class="w-full pl-10 pr-10">
                          <div class="relative mb-6 w-full">
                              <div class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                                  <font-awesome-icon icon="fa-solid fa-lock" style="color: #ffffff" />
                              </div>
                              <div class="relative z-0">
                                  <input type="password" id="password"
                                  v-model="loginData.password"
                                      class="block pr-10 p-3 w-full h-1/2 text-base text-black bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-white dark:focus:white focus:outline-none focus:ring-0 focus:white peer"
                                      placeholder=" " />
                                  <label for="password"
                                      class="absolute text-base text-white dark:text-gray-400 duration-300 transform -translate-y-4 top-1 z-10 origin-[0] bg-transparent dark:bg-white px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:-translate-y-4 left-1">Password</label>
                              </div>
                          </div>
                      </div>

                      <div class="flex justify-between w-full pl-10 pr-10 items-center">
                          <div class="flex items-center">
                              <input id="disabled-checkbox" type="checkbox" value=""
                                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                              <label for="disabled-checkbox" class="ml-2 text-sm font-medium text-white">
                                  Remember me
                              </label>
                          </div>
                          <div>
                              <a class="text-white text-sm">Forgot Password</a>
                          </div>
                      </div>
                      <div class="flex justify-center w-full pl-10 pr-10 mt-3 items-center">
                          <button type="submit"
                              class="text-black h-10 w-full bg-[#e6e2e2] text-2xl font-bold focus:outline-none rounded-full px-5 text-center">
                              Log In
                          </button>
                      </div>
                  </form>
                  <div class="flex justify-center w-full pl-10 pr-10 mt-5 items-center">
                      <p class="text-sm text-white font-display">
                          Don't have an account?
                          <button @click="toggleForm"
                              class="inline-flex items-center text-sm ml-2 text-white font-display font-bold hover:underline">
                              Register
                          </button>
                      </p>
                  </div>
              </div>
          </div>
          <!--Signup Form-->


          <div v-else>
              <div
                  class="backdrop-blur-md h-[500px] w-[400px] border-2 border-[#625d5d] rounded-3xl bg-[rgb(255 255 255 / 0%)] flex flex-col justify-center items-center">
              <h2 class="text-white text-[2rem] text-center font-display font-semibold fixed top-10">
                  SignUp here
              </h2>
              <form @submit.prevent="signup" class="space-y-4">
              <div class="mt-5 w-full pl-10 pr-10">
                  <div class="relative mb-6 w-full">
                      <div class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                          <font-awesome-icon icon="fa-regular fa-envelope" style="color: #ffffff" />
                      </div>

                      <div class="relative z-0">
                          <input type="name" id="name"
                          v-model="signupData.name"
                              class="block pr-10 p-3 w-full h-12 text-base text-black bg-transparent border-0 border-b-2 border-white appearance-none dark:border-white dark:focus:white focus:outline-none focus:ring-0 focus:white peer"
                              placeholder=" " />
                          <label for="name"
                              class="absolute text-base text-white dark:text-white duration-300 transform -translate-y-4 top-1 z-10 origin-[0] bg-transparent dark:bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:-translate-y-4 left-1">Name</label>
                      </div>
                  </div>
              </div>
              <div class="mt-5 w-full pl-10 pr-10">
                  <div class="relative mb-6 w-full">
                      <div class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                          <font-awesome-icon icon="fa-regular fa-envelope" style="color: #ffffff" />
                      </div>
                      
                      <div class="relative z-0">
                          <input type="email" id="email"
                          v-model="signupData.email"
                              class="block pr-10 p-3 w-full h-12 text-base text-black bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-white dark:focus:white focus:outline-none focus:ring-0 focus:white peer"
                              placeholder=" " />
                          <label for="email"
                              class="absolute text-base text-white dark:text-gray-400 duration-300 transform -translate-y-4 top-1 z-10 origin-[0] bg-transparent dark:bg-white px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:-translate-y-4 left-1">Email</label>
                      </div>
                  </div>
              </div>
              <div class="w-full pl-10 pr-10">
                  <div class="relative mb-6 w-full">
                      <div class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                          <font-awesome-icon icon="fa-solid fa-lock" style="color: #ffffff" />
                      </div>
                      <div class="relative z-0">
                          <input type="password" id="password"
                          v-model="signupData.password"
                              class="block pr-10 p-3 w-full h-1/2 text-base text-black bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-white dark:focus:white focus:outline-none focus:ring-0 focus:white peer"
                              placeholder=" " />
                          <label for="password"
                              class="absolute text-base text-white dark:text-gray-400 duration-300 transform -translate-y-4 top-1 z-10 origin-[0] bg-transparent dark:bg-white px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:-translate-y-4 left-1">Password</label>
                      </div>
                  </div>
              </div>
              <div class="flex justify-between w-full pl-10 pr-10 items-center">
                  <div class="flex items-center">
                      <input id="disabled-checkbox" type="checkbox" value=""
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                      <label for="disabled-checkbox" class="ml-2 text-sm font-medium text-white">
                          Remember me
                      </label>
                  </div>
                  <div>
                      <a class="text-white text-sm">Forgot Password</a>
                  </div>
              </div>
              <div class="flex justify-center w-full pl-10 pr-10 mt-3 items-center">
                  <button type="submit"
                      class="text-black h-10 w-full bg-[#e6e2e2] text-2xl font-bold focus:outline-none rounded-full px-5 text-center">
                     SignUp
                  </button>
              </div>
          </form>
              <div class="flex justify-center w-full pl-10 pr-10 mt-5 items-center">
                  <p class="text-sm text-white font-display">
                      ALready have an account?
                      <button 
                          @click="toggleForm"
                          class="inline-flex items-center text-sm ml-2 text-white font-display font-bold hover:underline">
                          Login
                  </button>
                  </p>
              </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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
profilePhoto: ""
});

const store = useStore();
const router = useRouter();

const toggleForm = () => {
  isLogin.value = !isLogin.value;
};


onMounted(() => {
// Simulate typing animation
const titleText = "Welcome to Car Management System";
let index = 0;
const textElement = document.getElementById("text");
const cursor = document.getElementById("cursor");

function type() {
  if (index < titleText.length) {
    textElement.textContent += titleText[index];
    index++;
    setTimeout(type, 100); // Adjust typing speed here (in milliseconds)
  }
}

setTimeout(type, 1500); // Delay the typing animation by 1.5 seconds (adjust as needed)
});


const login = async () => {
console.log("Logging in with:", loginData.value);
const success = await store.dispatch("user/loginUser", loginData.value);
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
const success = store.dispatch("user/registerUser", signupData.value);
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
<style>
/* Blinking cursor animation */
@keyframes blink {

  0%,
  100% {
      opacity: 0;
  }

  50% {
      opacity: 1;
  }
}

.animate-blink {
  animation: blink 1s infinite;
}
</style>

