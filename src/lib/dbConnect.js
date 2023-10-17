import mongoose from 'mongoose'
import { DB_URI } from '../constants/constants'

export default function dbConnect() {
	if (!mongoose.connections[0].db) {
		mongoose.connect(DB_URI, { maxPoolSize: 1 })
	}
}
