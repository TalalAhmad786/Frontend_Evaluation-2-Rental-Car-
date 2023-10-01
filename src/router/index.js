import { createRouter, createWebHashHistory } from "vue-router";
import CarCreate from "../components/Manager Panel/CarCreate";
import Loginview from "../views/Loginview.vue";
import HomeView from "../views/HomeView.vue";
import UsersList from "../components/Manager Panel/UsersList.vue";
import UserCreate from "../components/Manager Panel/CreateUser.vue";
import ChangePassword from "../components/Manager Panel/ChangePassword.vue";
import CarsList from "../components/Customer Panel/CustomerCarsList.vue";
import Reservations from "../components/Customer Panel/ReservationsList.vue";
import Customer from "../components/Customer Panel/Customer.vue";
import AdminRes from "../components/Manager Panel/AdminReservations.vue";
import Manager from "../components/Manager Panel/Manager.vue";
//import Test from "../components/Test.vue"
//import Modal from "../components/Modal.vue";
const routes = [
  {
    path: "/",
    name: "login",
    component: Loginview,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Manager,
    children: [
      {
        path: "",
        name: "Home",
        component: HomeView,
      },
      {
        path: "/admin/addCars",
        name: "Add Cars",
        component: CarCreate,
      },
      {
        path: "/admin/addUser",
        name: "Add User",
        component: UserCreate,
      },
      {
        path: "/admin/editUser",
        name: "Edit User",
        component: UsersList,
      },
      {
        path: "admin/editUser/cp/:userId",
        component: ChangePassword,
      },
      {
        path: "/admin/editUser",
        name: "Edit User",
        component: UsersList,
      },
      {
        path: "/admin/reservations",
        name: "Res",
        component: AdminRes,
      },
    ],
    meta: {
      requiresAuth: true,
      managerAuth: true,
      customerAuth: false,
    },
  },

  {
    path: "/customer",
    name: "List",
    component: Customer,
    children: [
      {
        path: "",
        name: "List of Cars",
        component: CarsList,
      },
      {
        path: "/customer/reservations",
        name: "Reservations",
        component: Reservations,
      },
    ],
    meta: {
      requiresAuth: true,
      managerAuth: false,
      customerAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem("lbUser"));
    console.log("AUthh user in nav guards--->>>", authUser.user.role);
    if (!authUser || !authUser.token) {
      next({ path: "/" });
    } else if (to.meta.managerAuth) {
      const authUser = JSON.parse(window.localStorage.getItem("lbUser"));
      if (authUser.user.role.toLowerCase() === "manager") {
        next();
      } else {
        next("/customer");
      }
    } else if (to.meta.customerAuth) {
      const authUser = JSON.parse(window.localStorage.getItem("lbUser"));
      if (authUser.user.role.toLowerCase() === "user") {
        next();
      } else {
        console.log("Im in admin");
        next("/admin");
      }
    }
  } else {
    next();
  }
});
export default router;
