export default class Feedback {
	constructor(
		feedbackname,
		text,
		mack,
		completed,
		editing,
		data,
		user = null,
		id = null) {
		this.feedbackname = feedbackname,
			this.text = text,
			this.mack = mack,
			this.completed = completed,
			this.editing = editing,
			this.data = data,
			this.user = user,
			this.id = id
	}
}