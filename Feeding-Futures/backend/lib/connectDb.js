import mongoose from "mongoose";

const globalForMongoose = globalThis;

const cached = globalForMongoose.__feedingFuturesMongoose ?? {
  connection: null,
  promise: null,
};

globalForMongoose.__feedingFuturesMongoose = cached;

export default async function connectDb() {
  if (cached.connection && mongoose.connection.readyState === 1) {
    return cached.connection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not configured");
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI)
      .then((mongooseInstance) => {
        console.log("MongoDB connected");
        return mongooseInstance;
      })
      .catch((error) => {
        cached.promise = null;
        throw error;
      });
  }

  cached.connection = await cached.promise;
  return cached.connection;
}
