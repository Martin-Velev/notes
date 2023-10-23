import { useState } from 'react'
import NoteForm from '@/app/components/NoteForm'
import { API_ROOT } from '@/constants/constants'

export default function Note({ note, onSubmit }) {
	const [editMode, setEditMode] = useState(false)

	const noteDisplay = (
		<div>
			<h3>{note.title}</h3>
			<p>{note.body}</p>
		</div>
	)

	const noteEdit = <NoteForm onSubmit={onSubmit} note={{ ...note }} />
	function deleteNote(note) {
		const jwt = localStorage.getItem('jwt')
		fetch(`${API_ROOT}/notes/${note._id}`, {
			method: 'DELETE',
			headers: {
				Authorization: 'JWT ' + jwt,
				'Access-Control-Allow-Origin': 'http://localhost:3000',
			},
		}).then(() => onSubmit())
	}

	return (
		<>
			<div className="row">
				{editMode ? noteEdit : noteDisplay}

				<button onClick={() => setEditMode(!editMode)}>
					{editMode ? 'View' : 'Edit'}
				</button>

				<button onClick={() => deleteNote(note)}>Delete</button>
			</div>
		</>
	)
}
