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
	role: {
		type: String,
		default: 'user',
		enum: {
			values: ['user', 'admin'],
		},
	},
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

export default mongoose.model('User', userSchema)
