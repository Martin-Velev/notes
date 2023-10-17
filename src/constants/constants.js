export const API_ROOT = 'http://localhost:3000/api'
export const SECRET = process.env.SECRET
export const TOKEN_TIMEOUT = 2 * 60 * 60 // in seconds
export const ERR_CODES = {
	DUPLICATE_KEY: 11000,
}
const {
	DB_ROOT_URI: rootUri,
	DB_COLLECTION: collection,
	DB_URI_PARAMS: params,
} = process.env

export const DB_URI = `${rootUri}/${collection}?${params}`
