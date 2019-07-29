const state = {}

const mutations = {}

const actions = {
	login({ commit }, userInfo) {
		const { username, password } = userInfo
		console.log(username, password)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
