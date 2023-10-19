import { API_ROOT } from '@/constants/constants'
import { useState } from 'react'

export default function NoteForm(props) {
	const [note, setNote] = useState(props.note)

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

	function handleSubmit(e) {
		e.preventDefault()
		const jwt = localStorage.getItem('jwt')
		console.log('note ID', note._id)
		fetch(`${API_ROOT}/notes/${note._id}`, {
			method: 'PUT',
			headers: {
				Authorization: 'JWT ' + jwt,
				'Access-Control-Allow-Origin': 'http://localhost:3000',
			},

			body: JSON.stringify(note),
		})
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					// value={query}
					onChange={handleTitleChange}
					onKeyDown={(e) => e.key == 'Enter' && handleSubmit(e)}
					placeholder="Title"
				/>

				<textarea
					// value={query}
					onChange={handleBodyChange}
					onKeyDown={(e) => e.key == 'Enter' && handleSubmit(e)}
					placeholder="Title"
				/>

				<button type="submit">Save</button>
			</form>
		</div>
	)
}
