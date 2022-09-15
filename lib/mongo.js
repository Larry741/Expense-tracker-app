const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  // throw new Error(
  //   "Please define the MONGO_URL environment variable inside .env.local"
  // );
  console.log("Please define the MONGO_URL environment variable inside .env.local")
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */


let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

mongoose.connection.on("open", () => {
  console.log("db connected");
});

mongoose.connection.on("error", () => {
  console.log("error connecting to db");
});

async function dbConnect() {
  if (process.env.NODE_ENV === "development") {
    if (cached.conn) {
      return cached.conn;
    }
    
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };
  
      cached.promise = mongoose.connect(MONGO_URL, opts).then((mongoose) => {
        return mongoose;
      });
    }
    cached.conn = await cached.promise;
    return cached.conn;
  } else if (process.env.NODE_ENV === "production") {
    return mongoose.connect(MONGO_URL).then((mongoose) => {
      return mongoose;
    });
  }
}

export default dbConnect;