import axios from "axios";

export default {
  namespaced: true,

  state: {
    user: {
      users: [],
      user: JSON.parse(localStorage.getItem("lbUser")),
      token: JSON.parse(localStorage.getItem("lbUser")),
      userId: null,
    },
  },
  getters: {
    getUsers(state) {
      return state.user.users;
    },
    getUser(state) {
      return state.user.user;
    },
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.user.token = payload;
    },
    SET_USER(state, payload) {
      state.user.user = payload;
    },
    SET_USERS(state, payload) {
      state.user.users = payload;
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
    async fetchUsers({ commit }) {
        console.log("dhgdshhgd")
      try {
       

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
   
  },
};
