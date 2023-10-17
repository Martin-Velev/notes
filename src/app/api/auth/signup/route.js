// import dbConnect from '@/lib/dbConnect'
import { SECRET } from '@/constants/constants'
import { createToken } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/user'

export async function POST(request, params) {
	const { username, password } = await request.json()

	dbConnect()
	const user = await User.create({ username, password })

	const secret = SECRET
	const sanitizedUsr = {
		username: user.username,
		id: user.id,
		role: user.role,
		createdAt: user.createdAt,
	}
	const jwt = await createToken(sanitizedUsr, secret)

	const headers = new Headers()
	headers.append('Content-Type', 'application/json')
	return new Response(JSON.stringify({ user: sanitizedUsr, jwt }), {
		headers,
	})
}
