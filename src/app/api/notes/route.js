import dbConnect from '@/lib/dbConnect'
import Note from '@/models/note'
import User from '@/models/user'
import { decodeJWT, extractJWT } from '@/lib/utils'
import { verifyToken } from '@/lib/auth'
import { SECRET } from '@/constants/constants'

async function fetchUserByID(id) {
	const user = await User.findById(id)
	return user
}

export async function GET(req, params) {
	dbConnect()

	const jwt = extractJWT(req.headers)
	const istokenvalid = await verifyToken(jwt, SECRET)
	if (!istokenvalid) {
		const res = new response()
		res.statuscode = 401 // unauthorized status code
		res.headers.append('content-type', 'text/plain')
		return res
	}

	const payload = decodeJWT(jwt)
	const userid = payload.id

	// fetch user by id
	const user = await fetchUserByID(userid)
	const noteIDs = user.notes

	if (!noteIDs || noteIDs.length < 1) {
		const headers = new Headers()
		headers.append('Content-Type', 'application/json')
		return new Response(JSON.stringify([]), { headers })
	}
	const notes = await Note.find({
		_id: {
			$in: noteIDs,
		},
	})

	const headers = new Headers()
	headers.append('Content-Type', 'application/json')
	return new Response(JSON.stringify(notes), { headers })
}

export async function POST(req, params) {
	const newNote = await req.json()
	dbConnect()

	const note = await Note.create(newNote)

	// Add to currentUserNotes

	const jwt = extractJWT(req.headers)
	const istokenvalid = await verifyToken(jwt, SECRET)
	if (!istokenvalid) {
		const res = new response()
		res.statuscode = 401 // unauthorized status code
		res.headers.append('content-type', 'text/plain')
		return res
	}

	const payload = decodeJWT(jwt)
	const userid = payload.id

	// fetch user by id
	const user = await fetchUserByID(userid)


	const oldNotes = user.notes
	user.notes = [...oldNotes, note]
	user.save()

	const headers = new Headers()
	headers.append('Content-Type', 'application/json')
	return new Response(JSON.stringify({ note }))
}
