import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = process.env.DB_STRING
export const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
})

async function run() {
	// Create a MongoClient with a MongoClientOptions object to set the Stable API version
	try {
		// Connect the client to the server	(optional starting in v4.7)
		console.log('LOG', uri)
		await client.connect()
		// Send a ping to confirm a successful connection
		await client.db('admin').command({ ping: 1 })
		console.log(
			'Pinged your deployment. You successfully connected to MongoDB!'
		)
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close()
	}
}

export function dbConnect() {
	run().catch(console.dir)
}
