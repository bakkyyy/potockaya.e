import firebase from 'firebase/app'
import Feedback from './feedback_help'

export default {
  state: {
    feedbacks: [{
      'id': 1,
      'text': 'Очень круто',
      'mack': '5',

    }]
  },
  mutations: {
    newFeedback(state, payload) {
      state.feedbacks.push(payload)
    }
  },
  actions: {
    async newFeedback({
      commit, getters
    }, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const newFeedback = new Feedback(
          payload.text,
          payload.mack,
          payload.completed,
          payload.editing,
          getters.user.id
          )
          const feedback = await firebase.database().ref('feedbacks').push(newFeedback)
          console.log(feedback)
        //logic
        commit('newFeedback', payload)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    // Get All user feedbacks
    feedbacks(state, getters) {
      return state.feedbacks.filter(feedback => {
        return feedback.user === getters.user.id
      })
    },
    // Get user Completed feedbacks
    feedbackCompleted(state, getters) {
      return getters.feedbacks.filter(feedback => {
        return feedback.completed
      })
    },
    // Get user Active feedbacks
    feedbackNotCompleted(state, getters) {
      return getters.feedbacks.filter(feedback => {
        return feedback.completed === false
      })
    }
  }
}