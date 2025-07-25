import { type Collection, MongoClient, type Db } from "mongodb";

if (!process.env.MONGO) {
  throw new Error("MONGO environment variable is not defined");
}

const uri = process.env.MONGO;
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  w: "majority" as const,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export async function getIletisimMessagesCollection(): Promise<Collection> {
  try {
    const client = await clientPromise;
    const db = client.db("iletisim");
    return db.collection("messages");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
}

export async function getVideosDatabase(): Promise<Collection> {
  try {
    const client = await clientPromise;
    const db = client.db("videolarimiz");
    return db.collection("media");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
}
