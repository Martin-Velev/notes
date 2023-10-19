import Note from './Note'

export default function NotesList({notes}) {
	// render notes

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
