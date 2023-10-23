// import dbConnect from '@/lib/dbConnect'
import { ERR_CODES, SECRET } from '@/constants/constants'
import { createToken } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/user'

export async function POST(request, params) {
	const { username, password } = await request.json()

	dbConnect()
	try {
		const user = await User.create({ username, password })
	} catch (err) {
		if (err.code === ERR_CODES.DUPLICATE_KEY) {
			return new Response(null, { status: 403, statusText: 'User Already exists' })
		}
		console.log('err', err)
		console.log(err)
	}
	// console.log('received', user)
	// TODO Handle duplicate name error

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
