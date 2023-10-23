import { API_ROOT } from '@/constants/constants'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NoteForm(props) {
	const [note, setNote] = useState(props.note || { title: '', body: '' })
	const router = useRouter()

	function handleTitleChange(e) {
		setNote({
			...note,
			title: e.target.value,
		})
	}
	function handleBodyChange(e) {
		setNote({
			...note,
			body: e.target.value,
		})
	}

	function updateNote(note) {
		const jwt = localStorage.getItem('jwt')
		fetch(`${API_ROOT}/notes/${note._id}`, {
			method: 'PUT',
			headers: {
				Authorization: 'JWT ' + jwt,
				'Access-Control-Allow-Origin': 'http://localhost:3000',
			},

			body: JSON.stringify(note),
		}).then(() => {
			props.onSubmit()
		})
	}

	function createNote(note) {
		const jwt = localStorage.getItem('jwt')
		fetch(`${API_ROOT}/notes`, {
			method: 'POST',
			headers: {
				Authorization: 'JWT ' + jwt,
				'Access-Control-Allow-Origin': 'http://localhost:3000',
			},

			body: JSON.stringify(note),
		}).then(() => props.onSubmit())
	}

	function handleSubmit(e) {
		if (note._id) {
			updateNote(note)
		} else {
			createNote(note)
		}
		e.preventDefault()
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					value={note.title}
					onChange={handleTitleChange}
					onKeyDown={(e) => e.key == 'Enter' && handleSubmit(e)}
					placeholder="Title"
				/>

				<br />
				<textarea
					value={note.body}
					onChange={handleBodyChange}
					onKeyDown={(e) => e.key == 'Enter' && handleSubmit(e)}
					placeholder="Body"
				/>

				<br />
				<button type="submit">Save</button>
			</form>
		</div>
	)
}
