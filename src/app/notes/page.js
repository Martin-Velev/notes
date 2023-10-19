'use client'
import { API_ROOT } from '@/constants/constants'
import { decodeJWT } from '@/lib/utils'
import { redirect } from 'next/dist/server/api-utils'
import Link from 'next/link'
import NotesList from '@/app/components/NotesList'
import { useEffect, useState } from 'react'

export default function Notes() {
	const [notes, setNotes] = useState(null)
	const [isLoading, setLoading] = useState(true)
	const [currentUser, setCurrentUser] = useState(null)

	useEffect(() => {
		const jwt = localStorage.getItem('jwt')
		if (!jwt) {
			setCurrentUser(null)
			setLoading(false)
			return
		}
		console.log('local JWT', jwt)
		const { id, name } = decodeJWT(jwt)
		setCurrentUser({ id, name })
		fetch(`${API_ROOT}/notes`, {
			method: 'GET',
			headers: {
				Authorization: 'JWT ' + jwt,
				'Access-Control-Allow-Origin': 'http://localhost:3000',
			},
		})
			.then((res) => res.json())
			.then((notes) => {
				console.log('notes result', notes)
				setNotes(notes)
				setLoading(false)
			})
	}, [])

	const loadingScreen = 'Loading...'
	if (isLoading) {
		return loadingScreen
	}

	const signinPrompt = (
		<>
			<p>You need to log in to make notes</p>
			<Link href="/signup">Register here</Link>
			<br />
			<Link href="/signin">Or log in if you already have an account</Link>
		</>
	)
	if (!currentUser) {
		return signinPrompt
	}

	function handleCreateNote() {
		const jwt = localStorage.getItem('jwt')
		fetch(`${API_ROOT}/notes`, {
			method: 'POST',
			headers: {
				Authorization: 'JWT ' + jwt,
				'Access-Control-Allow-Origin': 'http://localhost:3000',
			},

			body: JSON.stringify({ title: 'test', body: 'test' }),
		})
	}

	return (
		<>
			<h1>Notes</h1>

			<NotesList notes={notes} />
			<br />
			<div>
				<button onClick={handleCreateNote}>Create Note</button>
			</div>
		</>
	)
}
