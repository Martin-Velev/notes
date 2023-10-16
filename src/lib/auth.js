import { TOKEN_TIMEOUT } from '@/constants/constants'
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'

export async function saltAndHash(rawPassword) {
	const saltRounds = 12
	const salt = await bcrypt.genSalt(saltRounds)
	const hashed = await bcrypt.hash(rawPassword, salt)

	return hashed
}

export function encode(msg, encoding = 'base64url') {
	const buf = Buffer.from(msg)
	return buf.toString(encoding)
}
export function decode(msg, encoding = 'base64url') {
	const buf = Buffer.from(msg)
	return buf.toString(encoding)
}

export const DEFAULT_HEADER = {
	alg: 'HS256',
	typ: 'JWT',
}

export async function createToken({ id, username }, secret) {
	const header = DEFAULT_HEADER
	const payload = {
		sub: id,
		name: username,
		iat: Date.now(),
		exp: Date.now() + TOKEN_TIMEOUT
	}

	const encodedHeader = encode(JSON.stringify(header))
	const encodedPayload = encode(JSON.stringify(payload))

	const msg = encodedHeader + '.' + encodedPayload
	const signature = await signMsg(msg, secret)

	return msg + '.' + signature
}

export async function signMsg(msg, secret) {
	const hmac = await crypto.createHmac('sha256', secret)
	hmac.update(msg) // feed the message to the Hmac object
	return hmac.digest('base64url') // reed the signed message
}

export function exctractToken(headers) {
	const authHeader = headers.get('Authorization')
	if (authHeader && authHeader.startsWith('Bearer ')) {
		return authHeader.substring(7)
	}
	return null
}

export async function verifyToken(token, secret) {
	const jwtSegments = token.split('.')

	const msg = jwtSegments[0] + '.' + jwtSegments[1]
	const tokenSignature = jwtSegments[2]
	const trueSignature = await signMsg(msg, secret)

	return tokenSignature === trueSignature
}
