'use client'

import { API_ROOT } from '@/constants/constants'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const VARIANT_TABLE = {
	signup: {
		header: 'Register',
		submitBtn: 'Register',
		endpoint: API_ROOT + '/auth/signup',
	},
	signin: {
		header: 'Sign In',
		submitBtn: 'Sign In',
		endpoint: API_ROOT + '/auth/signin',
	},
}

export default function AuthForm({ variant = 'signup' }) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errMsg, setErrMsg] = useState(null)
	const router = useRouter()

	const variantData = VARIANT_TABLE[variant]

	async function onSubmit(e) {
		e.preventDefault()
		if (!username || !password) {
			setErrMsg('Username and password are required')
			return
		}
		const response = await fetch(variantData.endpoint, {
			method: 'POST',
			body: JSON.stringify({
				username,
				password,
			}),
		})
		if (response.status >= 400) {
			console.log('msg', response.statusText)
			setErrMsg(response.statusText)
			return
		}
		const body = await response.json()
		const { jwt } = body
		if (jwt) {
			localStorage.setItem('jwt', jwt)
			router.push('/notes')
		}
	}

	return (
		<>
			<h2>{variantData.header}</h2>
			<form
				onKeyDown={(e) => e.key == 'Enter' && onSubmit(e)}
				onSubmit={onSubmit}
			>
				<label htmlFor="username">Username:</label>
				<input
					style={{ color: 'black' }}
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					type="text"
				/>
				<br />
				<label htmlFor="password">Password:</label>
				<input
					style={{ color: 'black' }}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
				/>
				<br />
				<button type="submit">{variantData.submitBtn}</button>
			</form>

			{errMsg}
		</>
	)
}
