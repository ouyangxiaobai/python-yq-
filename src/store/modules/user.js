import { getToken, setToken, removeToken } from "@/utils/auth";
import { login, logout, getInfo } from "@/api/user";
import { Message, Loading } from 'element-ui'
// 村赤用户令牌和角色信息
const state = {
    token: getToken(),
    roles: [], //角色
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    },
};

const actions = {
    // 用户登录
    login({ commit }, userInfo) {
        const { username,password } = userInfo;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                var datas = { username: username,password: password };
                login(datas)
                    .then((response) => {
                        // debugger;
                        console.log("这个是请求参数", response);
                        if (response.res == 1) {
                            Message({
                                message: "登录成功",
                                type: 'success'
                              })  
                        } else {
                            Message({
                                message: response.res,
                                type: 'warning'
                              })                           
                            return false
                        }
                        commit("SET_TOKEN", username);
                        setToken(username);
                        resolve();
                    })
            });
        });
    },
    // 获取用户角色信息
    getInfo({ commit, state }) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const roles = state.token === "admin" ? ["admin"] : ["jerry"];
                commit("SET_ROLES", roles);
                resolve({ roles });
            }, 1000);
        });
    },
    // 重置令牌
    resetToken({ commit }) {
        return new Promise((resolve) => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            removeToken();
            resolve();
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};