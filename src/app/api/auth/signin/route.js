import { SECRET } from '@/constants/constants'
import { createToken } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/user'
import { headers } from '../../../../../next.config'

export async function POST(request, params) {
	const { username, password } = await request.json()
	dbConnect()

	let user = await User.findOne({ username }).select('+password')

	if (!user) {
		return new Response(null, { status: 404, statusText: 'User Not Found' })
	}

	// Use the comparePassword method we defined in our user.js Model file to authenticate
	const pwValid = await user.comparePassword(password)

	if (!pwValid) {
		return new Response(null, { status: 401, statusText: 'Invalid Password' })
	} else {
		const sanitizedUsr = {
			username: user.username,
			id: user.id,
			role: user.role,
			createdAt: user.createdAt,
		}
		const jwt = await createToken(sanitizedUsr, SECRET)

		const headers = new Headers()
		headers.append('Content-Type', 'application/json')
		return new Response(JSON.stringify({ user: sanitizedUsr, jwt }), {
			headers,
		})
	}
}
