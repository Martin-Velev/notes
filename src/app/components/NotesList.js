import Note from './Note'

export default function NotesList({notes, onSubmit}) {
	// render notes

	return (
		<ul>
			{notes.map((note) => (
				<li key={note._id}>
					<Note onSubmit={onSubmit} note={note} />
				</li>
			))}
		</ul>
	)
}
