const notice = {
    namespaced: true,
    state: {},
    mutations: {
        // this.$store.commit("notice/addState", {
        //      key: "numberOfNews",
        //      val: this.numberOfNews
        //  });
        addState(state, item) { // 增加
            state[item.key] = item.val;
        },
        delState(state, id) { //删除
            for (let key in state) {
                if (key === id) {
                    delete state[key];
                }
            }
        },
        delStateAll(state) { // 清空
            for (let key in state) {
                delete state[key];
            }
        },
    },
    actions: {
        addState(state, item) { // 增加
            state.commit('addState', item);
        },
        delState(state, id) { //删除
            state.commit('delState', id);
        },
        delStateAll(state) { // 清空
            state.commit('delStateAll');
        },
    }
}
export default notice;