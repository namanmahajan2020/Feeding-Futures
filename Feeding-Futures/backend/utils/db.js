import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!process.env.MONGO_URI) {
		throw new Error("MONGO_URI is not set in environment variables");
	}

	if (!cached.promise) {
		cached.promise = mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}

	cached.conn = await cached.promise;
	return cached.conn;
}

export default connectToDatabase;


