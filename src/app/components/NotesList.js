import Note from './Note'

export default function NotesList({notes}) {
	// render notes

	console.log('notes', notes)

	return (
		<ul>
			{notes.map((note) => (
				<li key={note._id}>
					<Note note={note} />
				</li>
			))}
		</ul>
	)
}
