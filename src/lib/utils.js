export function extractJWT(headers) {
	const headerAuth = headers.get('Authorization')

	if (!headerAuth) {
		return null
	}

	const jwt = headerAuth.split('JWT ')[1]

	return jwt
}

export function decodeJWT(jwt) {
	let base64Url = jwt.split('.')[1]
	let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
	let jsonPayload = decodeURIComponent(
		atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
			})
			.join('')
	)

	const payload = JSON.parse(jsonPayload)
	return payload
}
