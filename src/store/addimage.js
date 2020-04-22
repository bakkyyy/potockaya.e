import firebase from 'firebase/app'


export default {
	state: {
		loadedImages: []

	},
	data() {
		return {
			imageStatus: ''
		}
	},
	mutations: {
		setLoadedImages(state, payload) {
			state.loadedImages = payload
		},
		createImage(state, payload) {
			state.loadedImages.push(payload)
		}
	},
	actions: {
		loadImages({
			commit
		}) {
			commit('setLoading', true)
			firebase.database().ref('images').once('value')
				.then((data) => {
					const images = []
					const obj = data.val()
					for (let key in obj) {
						images.push({
							id: key,
							category: obj[key].category,
							imagename: obj[key].imagename,
							imageUrl: obj[key].imageUrl,
							date: obj[key].date
						})
					}
					commit('setLoadedImages', images)
					commit('setLoading', false)
				})
				.catch(
					(error) => {
						console.log(error)
						commit('setLoading', false)
					}
				)
		},
		createImage({
			commit
		}, payload) {
			const image = {
				imagename: payload.imagename,
				category: payload.category,
				imageUrl: payload.imageUrl,
				date: payload.date,
			}
			let imageUrl
			let key
			commit('setLoading', true)
			firebase.database().ref('images').push(image)
				.then((data) => {
					key = data.key
					return key
				})
				.then(key => {
					const filename = payload.image.name
					const ext = filename.slice(filename.lastIndexOf('.'))
					return firebase.storage().ref('images/' + key + '.' + ext).put(payload.image)
				})
				.then(fileData => {
					return fileData.ref.getDownloadURL().then(imageURL => {
						return firebase.database().ref('images').child(key).update({
							imageUrl: imageURL
						})
					})
				}).then(() => {
					commit('createImage', {
						...image,
						imageUrl: imageUrl,
						id: key
					})
					console.log('PHOTO ADDED')
					commit('setLoading', false)
				})
				.catch((error) => {
					console.log(error)
				})
		}
	},
	getters: {
		loadedImages(state) {
			return state.loadedImages.sort((imageA, imageB) => {
				return imageA.date - imageB.date
			})
		},
		featuredImages(state, getters) {
			return getters.loadedImages.slice(0, 5)
		},
		loadedImage(state) {
			return (imageId) => {
				return state.loadedImages.find((image) => {
					return image.id === imageId
				})
			}
		}
	}
}