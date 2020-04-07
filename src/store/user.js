import firebase from "firebase/app"
import User from './user_help'
export default {
	state: {
		user: null
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload
		}
	},
	actions: {
		async registerUser({
			commit
		}, {
			firstname,
			secondname,
			email,
			password
		}) {
			commit('clearError')
			commit('setLoading', true)
			try {
				//logic
				const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
				user.user.updateProfile({
					displayName: firstname + ' ' + secondname
				})
				console.log(user)
				commit('setUser', new User(user.user.uid))
				commit('setLoading', false)
			} catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}
		},
		async loginUser({
			commit
		}, {
			firstname,
			secondname,
			email,
			password
		}) {
			commit('clearError')
			commit('setLoading', true)
			try {
				//logic
				const user = await firebase.auth().signInWithEmailAndPassword(email, password)
				user.user.updateProfile({
					displayName: firstname + ' ' + secondname
				})
				commit('setUser', new User(user.user.uid))
				commit('setLoading', false)
			} catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}
		},
		loggedUser({
			commit
		}, payload) {
			commit('setUser', new User(payload.uid))
			console.log(payload.uid)
		},
		logoutUser({
			commit
		}) {
			firebase.auth().signOut()
			commit('setUser', null)
		}
	},
	getters: {
		user(state) {
			return state.user
		},
		checkUser(state) {
			return state.user !== null
		}
	}
}