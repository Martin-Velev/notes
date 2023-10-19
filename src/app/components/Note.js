import { useState } from 'react'
import NoteForm from '@/app/components/NoteForm'

export default function Note({ note }) {
	const [editMode, setEditMode] = useState(false)

	console.log('note prop', note)

	const noteDisplay = (
		<div>
			<h3>{note.title}</h3>
			<p>{note.body}</p>
		</div>
	)

	const noteEdit = <NoteForm note={{ ...note }} />

	return (
		<>
			<div className="row">
				{editMode ? noteEdit : noteDisplay}

				<button onClick={() => setEditMode(!editMode)}>
					{editMode ? 'View' : 'Edit'}
				</button>
			</div>
		</>
	)
}
