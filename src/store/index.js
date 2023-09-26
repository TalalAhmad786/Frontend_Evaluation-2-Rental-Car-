import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    user: {
      users: [],
      user: JSON.parse(localStorage.getItem("lbUser")),
      token: JSON.parse(localStorage.getItem("lbUser")),
      userId: null,
    },
    manager: {
      manager: null,
    },
    car: {
      cars: [],
      allcars: [],
    },
    reservation: {
      reservations: [],
      allReservations: [],
    },
  },
  getters: {
    getCars(state) {
      return state.car.cars;
    },
    getAllCars(state) {
      return state.car.allcars;
    },
    getUsers(state) {
      return state.user.users;
    },
    getUser(state) {
      return state.user.user;
    },
    getReservations(state) {
      return state.reservation.reservations;
    },
    getAllReservations(state) {
      return state.reservation.allReservations;
    },
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.user.token = payload;
    },
    SET_USER(state, payload) {
      state.user.user = payload;
    },
    SET_MANAGER(state, payload) {
      state.manager.manager = payload;
    },
    SET_CARS(state, payload) {
      state.car.cars = payload;
    },
    SET_USERS(state, payload) {
      state.user.users = payload;
    },
    SET_ALL_CARS(state, payload) {
      state.car.allcars = payload;
    },
    SET_RESERVATIONS(state, payload) {
      state.reservation.reservations = payload;
    },
    SET_ALL_RESERVATIONS(state, payload) {
      state.reservation.allReservations = payload;
    },
  },
  actions: {
    async registerUser(_, payload) {
      console.log(payload);
      try {
        const { data } = await axios.post(
          "http://localhost:3001/users/register",
          payload
        );
      } catch (e) {}
    },
    async loginUser({ commit }, payload) {
      try {
        const { data } = await axios.post(
          "http://localhost:3001/users/authenticate",
          payload
        );

        const token = data.data.token;
        console.log("Token in login", token);
        console.log(
          "User id in store in login action --->",
          this.state.user.userId
        );
        // commit('SET_USERS',data1)
        // console.log("User in stor",data.data.user.role);
        // if(data.data.user.role.tolowercase()==='manager'){
        //   commit("SET_MANAGER",data.data);
        // }else{
        commit("SET_USER", data.data);
        localStorage.setItem("lbUser", JSON.stringify(data.data));
        //commit('SET_USER', data.data.user)
        // }
        //  }
        //commit('SET_TOKEN', token)
        console.log(data);
        return true;
      } catch (error) {
        return false;
      }
    },
    async createCar(_, payload) {
      try {
        //  const getUser = JSON.parse(localStorage.getItem('lbUser'));
        const token = this.state.user.token.token;
        console.log(token);
        console.log("TOKEN IN THE STORE STATE--->", token);
        console.log(token);
        const config = {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          "http://localhost:3001/cars",
          payload,
          config
        );
        console.log("Car created:", data);
      } catch (error) {}
    },
    async fetchCars({ commit }, payload) {
      try {
        console.log("User Id in storep-->>", this.state.user.userId);
        const token = this.state.user.token.token;
        console.log(token);
        const config = {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(
          `http://localhost:3001/cars/${payload.id}`,
          config
        );
        localStorage.setItem("Cars", JSON.stringify(data.data));
        console.log("Fetch data ---->>>", data);
        commit("SET_CARS", data.data.cars);
      } catch (error) {}
    },
    async fetchAllCars({ commit }, payload) {
      try {
        console.log("User Id in storep-->>", this.state.user.token.token);
        // const getUser = JSON.parse(localStorage.getItem('lbUser'));
        const token = this.state.user.token.token;
        console.log("Token in fetch all", token);
        const config = {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(`http://localhost:3001/cars`, config);
        localStorage.setItem("Cars", JSON.stringify(data.data));
        console.log("Fetch data ---->>>", data);
        commit("SET_ALL_CARS", data.data.cars);
      } catch (error) {}
    },
    async updateCars({ commit }, { idx, updatedCar }) {
      try {
        const token = this.state.user.token.token;
        console.log("token---->in update", token);
        const config = {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        };

        const { data } = await axios.put(
          `http://localhost:3001/cars/${idx.id}`,
          updatedCar,
          config
        );
        console.log("Data in update--->>>> ", data.data.cars);
        commit("SET_CARS", data.data.cars);
        localStorage.setItem("Cars", JSON.stringify(data.data));
      } catch (error) {}
    },
    async deleteCars({ commit }, payload) {
      const token = this.state.user.token.token;
      console.log("token---->in delete", token);

      const config = {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.delete(
        `http://localhost:3001/cars/${payload.id}`,
        config
      );
      console.log("Delete ---->", data);
      commit("SET_CARS", data.data.cars);
    },
    async fetchUsers({ commit }) {
      try {
        const token = this.state.user.token.token;
        console.log(token);

        const { data } = await axios.get("http://localhost:3001/users");

        console.log("Users in dat ---->", data);
        commit("SET_USERS", data.data.users);
      } catch (error) {}
    },
    async updaterole({ commit }, payload) {
      try {
        console.log("payload in acton ChngePAss : ", payload);
        const { data } = await axios.put(
          `http://localhost:3001/users/${payload.id}/updaterole`,
          payload
        );
        console.log("Data in updateRole", data);
        //  commit('SET_USERS', data.data.users);
      } catch (error) {}
    },

    async updateUser({ commit }, { idx, updatedUser }) {
      try {
        console.log(idx, updatedUser);
        const { data } = await axios.put(
          `http://localhost:3001/users/${idx.id}/updateuser`,
          updatedUser
        );
        console.log("Update user in store--->>>", data);
        //console.log(this.state.user.users);
        commit("SET_USERS", data.data);
      } catch (error) {}
    },

    async deleteUser({ commit }, { payload, role }) {
      console.log(payload, role);
      const { data } = await axios.delete(
        `http://localhost:3001/users/${payload.id}/deleteuser`,
        { data: { role } }
      );
      console.log("DElete user in store---->>>>", data);
      commit("SET_USERS", data.data.users);
    },

    async updatePassword(_, payload) {
      const { data } = await axios.put(
        `http://localhost:3001/users/${payload.id}/updatepassword`,
        payload
      );
      console.log("Password in store---->", data);
    },
    async createReservation(_, { idx, payload }) {
      const { data } = await axios.post(
        `http://localhost:3001/reservations/${idx.id}`,
        payload
      );
      console.log("Reservation in store---->", data);
    },

    async updateAvailaibilty({ commit }, { payload }) {
      const token = this.state.user.token.token;
      console.log("Payload in avai--->>", payload);
      const config = {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `http://localhost:3001/cars/${payload.id}/updateavailability`,
        payload,
        config
      ); //http://localhost:3001/cars/${payload.id}`, config);
      console.log("Availability in store---->", data);
      commit("SET_ALL_CARS", data.data);
    },
    async fetchReservations({ commit }, payload) {
      try {
        const token = this.state.user.token.token;
        console.log(token);
        const config = {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(
          `http://localhost:3001/reservations/${payload.id}`,
          config
        );
        localStorage.setItem("Cars", JSON.stringify(data.data));
        console.log("Fetch data ---->>>", data);
        commit("SET_RESERVATIONS", data.data.reservation);
      } catch (error) {}
    },

    async deleteReservation({ commit }, payload) {
      const token = this.state.user.token.token;

      console.log("token---->in delete", token);

      const { data } = await axios.delete(
        `http://localhost:3001/reservations/${payload.id}`
      );
      console.log("Delete ---->", data);
      commit("SET_RESERVATIONS", data.data.reservation);
    },

    async fetchAllReservations({ commit }) {
      const token = this.state.user.token.token;
      console.log(token);
      const config = {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `http://localhost:3001/reservations`,
        config
      );
      console.log("Fetch data in all reservations ---->>>", data);
      commit("SET_ALL_RESERVATIONS", data.data.reservation);
    },
  },
  modules: {},
});
