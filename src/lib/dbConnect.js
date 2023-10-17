import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = process.env.DB_STRING
export const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
})
const db = client.db

async function run() {
	// Create a MongoClient with a MongoClientOptions object to set the Stable API version
	try {
		// Send a ping to confirm a successful connection
		await db('admin').command({ ping: 1 })
		console.log(
			'Pinged your deployment. You successfully connected to MongoDB!'
		)
	} finally {
		await client.close()
	}
}

async function enforceSchemaRules() {
	const database = client.db(process.env.DB_NAME)
	const userCollection = database.collection('users')
	await userCollection.createIndex({ name: 1 }, { unique: true })
}

export function dbConnect() {
	run().catch(console.dir)
}
