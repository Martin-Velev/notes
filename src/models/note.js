import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true],
	},
	body: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

// const User = mongoose.models.User || mongoose.model('User', userSchema)
export default mongoose.models.Note || mongoose.model('Note', noteSchema)
