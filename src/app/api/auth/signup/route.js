// import dbConnect from '@/lib/dbConnect'
import { ERR_CODES, SECRET } from '@/constants/constants'
import { createToken, saltAndHash } from '@/lib/auth'
import { client } from '@/lib/dbConnect'

export async function POST(request, params) {
	const { username, password } = await request.json()

	const database = client.db(process.env.DB_NAME)

	const userCollection = database.collection('users')
	const hashedPassword = await saltAndHash(password)

	const userData = {
		username,
		password: hashedPassword,
		createdAt: Date.now,
	}

	const response = await userCollection.insertOne(userData).catch((e) => {
		console.log(e)
		if (e.code === ERR_CODES.DUPLICATE_KEY) {
			// Username already exists
			console.log('User already exists')
		}
	})
	console.log('RES', response)

	const sanitizedUsr = {
		username,
		id: response.insertedId,
	}
	const jwt = await createToken(sanitizedUsr, SECRET)

	const headers = new Headers()
	headers.append('Content-Type', 'application/json')
	return new Response(JSON.stringify({ user: sanitizedUsr, jwt }), {
		headers,
	})
}
