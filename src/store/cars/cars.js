import axios from "axios";
import user from "../users/users.js";
export default {
  namespaced: true,

  state: {
    car: {
      cars: [],
      allcars: [],
    },
  },
  getters: {
    getCars(state) {
      return state.car.cars;
    },
    getAllCars(state) {
      return state.car.allcars;
    },
  },
  mutations: {
    SET_CARS(state, payload) {
      state.car.cars = payload;
    },
    SET_ALL_CARS(state, payload) {
          state.car.allcars = payload;
        },
  },
  actions: {
    async createCar(_, payload) {
      try {
        //  const getUser = JSON.parse(localStorage.getItem('lbUser'));
        const token = user.state.user.token.token; //this.state.user.token.token;
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
        const token = user.state.user.token.token;
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
        const token = user.state.user.token.token;
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
        const token = user.state.user.token.token;
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
      const token = user.state.user.token.token;
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
    async updateAvailaibilty({ commit }, { payload }) {
      const token = user.state.user.token.token;
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
  },
};
