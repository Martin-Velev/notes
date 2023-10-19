import { saltAndHash } from '@/lib/auth'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true],
		unique: true,
	},
	password: {
		type: String,
		required: [true],
		min: 8,
		select: false, //dont send back password after request
	},
	notes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Note',
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

// ENCRYPTION
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}
	const hashedPassword = await saltAndHash(this.password)
	this.password = hashedPassword
	next()
})

userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
