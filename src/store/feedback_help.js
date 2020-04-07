export default class Feedback {
	constructor(
		text,
		mack,
		completed,
		editing,
		user = null,
		id = null) {
			this.text = text,
			this.mack = mack,
			this.completed = completed,
			this.editing = editing,
			this.user = user,
			this.id = id
	}
}