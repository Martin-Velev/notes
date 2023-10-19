import Note from '@/models/note'
import dbConnect from '@/lib/dbConnect'

export async function GET(req, params) {
	const payload = await req.json()
	console.log('GET req', payload._id)
	const id = params.params.id
	if (!id) {
		return new Response(null, {
			status: 400,
			statusText: 'Bad Request',
		})
	}
	dbConnect()

	const note = await Note.findById(id)
	if (!note) {
		return new Response(null, {
			status: 404,
			statusText: 'Note Not Found',
		})
	}

	const headers = new Headers()
	headers.append('Content-Type', 'application/json')
	return new Response(JSON.stringify(note), { headers })
}

export async function PUT(req, { params }) {
	const { id } = params
	const { title, body } = await req.json()
	console.log('PUT', title, body)

	await Note.findOneAndUpdate({ _id: id }, { title, body })
	const updatedNote = await Note.find({ _id: id })
	console.log('updated', updatedNote)

	const headers = new Headers()
	headers.append('Content-Type', 'application/json')
	return new Response(JSON.stringify(updatedNote), { headers })
}
