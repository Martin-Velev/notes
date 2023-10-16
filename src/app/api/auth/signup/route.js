// import dbConnect from '@/lib/dbConnect'
import { SECRET } from '@/constants/constants'
import { createToken, saltAndHash } from '@/lib/auth'
import { client } from '@/lib/dbConnect'

export async function POST(request, params) {
	const { username, password } = await request.json()

	// dbConnect()
	const database = client.db(process.env.DB_NAME)

	const userCollection = database.collection('users')
	const hashedPassword = await saltAndHash(password)

	const userData = {
		username,
		password: hashedPassword,
		createdAt: Date.now,
	}

	const response = await userCollection.insertOne(userData)

	const secret = SECRET
	const sanitizedUsr = {
		username,
		id: response.insertedId,
	}
	const jwt = await createToken(sanitizedUsr, secret)

	console.log('RES', response)

	const headers = new Headers()
	headers.append('Content-Type', 'application/json')
	return new Response(JSON.stringify({ user: sanitizedUsr, jwt }), {
		headers,
	})
}
