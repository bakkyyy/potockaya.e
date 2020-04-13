import firebase from 'firebase/app'
import Feedback from './feedback_help'

export default {
  state: {
    feedbacks: []
  },
  mutations: {
    loadFeedbacks(state, payload) {
      state.feedbacks = payload
    },
    newFeedback(state, payload) {
      state.feedbacks.push(payload)
    }
  },
  actions: {
    async loadFeedbacks({
      commit
    }, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const feedback = await firebase.database().ref('feedbacks').once('value')
        const feedbacks = feedback.val()
        const feedbacksArray = []
        Object.keys(feedbacks).forEach(key => {
          const f = feedbacks[key]
          feedbacksArray.push(
            new Feedback(
              f.feedbackname,
              f.text,
              f.mack,
              f.completed,
              f.editing,
              f.data,
              f.user,
              key
            )
          )
        })
        commit('loadFeedbacks', feedbacksArray)

        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async newFeedback({
      commit,
      getters
    }, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const newFeedback = new Feedback(
          payload.feedbackname,
          payload.feedbackText,
          payload.mack,
          payload.completed,
          payload.editing,
          payload.data,
          getters.user.id
        )
        const feedback = await firebase.database().ref('feedbacks').push(newFeedback)
        // console.log(feedback)
        //logic
        commit('newFeedback', {
          ...newFeedback,
          id: feedback.key
        })
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
    feedbacks(state) {
      return state.feedbacks
    },
    // Get user Completed feedbacks
    feedbackCompleted(state) {
      return state.feedbacks.filter(feedback => {
        return feedback.completed
      })
    },
    // Get user Active feedbacks
    feedbackNotCompleted(state) {
      return state.feedbacks.filter(feedback => {
        return feedback.completed === false
      })
    }
  }
}