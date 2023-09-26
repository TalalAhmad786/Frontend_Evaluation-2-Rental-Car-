import axios from "axios";
import user from "../users/users";

export default {
    namespaced: true,
  state: {
    reservation: {
      reservations: [],
      allReservations: [],
    },
  },
  getters: {
    getReservations(state) {
      return state.reservation.reservations;
    },
    getAllReservations(state) {
      return state.reservation.allReservations;
    },
  },
  mutations: {
    SET_RESERVATIONS(state, payload) {
      state.reservation.reservations = payload;
    },
    SET_ALL_RESERVATIONS(state, payload) {
      state.reservation.allReservations = payload;
    },
  },
  actions: {
    async createReservation(_, { idx, payload }) {
        const { data } = await axios.post(
          `http://localhost:3001/reservations/${idx.id}`,
          payload
        );
        console.log("Reservation in store---->", data);
      },
    async fetchReservations({ commit }, payload) {
      try {
        console.log("payload in action is ==?", payload);
        const token = user.state.user.token.token;
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
      const token = user.state.user.token.token;

      console.log("token---->in delete", token);

      const { data } = await axios.delete(
        `http://localhost:3001/reservations/${payload.id}`
      );
      console.log("Delete ---->", data);
      commit("SET_RESERVATIONS", data.data.reservation);
    },

    async fetchAllReservations({ commit }) {
      const token = user.state.user.token.token;
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
};
