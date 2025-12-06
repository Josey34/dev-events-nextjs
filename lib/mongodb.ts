import mongoose from "mongoose";

// Define the MongoDB connection URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Extend the global type to include our mongoose cache
declare global {
    var mongoose: MongooseCache | undefined;
}

// Initialize the cache object
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
    global.mongoose = cached;
}

/**
 * Establishes a connection to the MongoDB database.
 * Uses a cached connection if available to prevent multiple connections.
 *
 * @returns Promise<typeof mongoose> - The mongoose instance
 */
async function connectToDatabase(): Promise<typeof mongoose> {
    // Validate environment variable at runtime
    if (!MONGODB_URI) {
        throw new Error(
            "Please define the MONGODB_URI environment variable inside .env"
        );
    }

    // Return the cached connection if it exists
    if (cached.conn) {
        return cached.conn;
    }

    // If there's no existing promise, create a new connection
    if (!cached.promise) {
        const options = {
            bufferCommands: false, // Disable mongoose buffering
        };

        cached.promise = mongoose
            .connect(MONGODB_URI, options)
            .then((mongooseInstance) => {
                console.log(" MongoDB connected successfully");
                return mongooseInstance;
            })
            .catch((error) => {
                console.error("L MongoDB connection error:", error);
                // Reset the promise on error so it can retry
                cached.promise = null;
                throw error;
            });
    }

    try {
        // Wait for the connection promise to resolve
        cached.conn = await cached.promise;
    } catch (error) {
        // Reset both promise and connection on failure
        cached.promise = null;
        cached.conn = null;
        throw error;
    }

    return cached.conn;
}

export default connectToDatabase;
