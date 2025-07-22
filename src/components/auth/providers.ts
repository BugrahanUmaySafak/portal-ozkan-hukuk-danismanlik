import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

export const authProviders = [
  CredentialsProvider({
    id: "credentials",
    name: "Credentials",
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.username || !credentials?.password) {
        throw new Error("Kullanıcı adı ve şifre gereklidir");
      }

      const client = new MongoClient(process.env.MONGO!, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      try {
        await client.connect();
        const db = client.db("AuthDB");
        const user = await db.collection("users").findOne({
          username: credentials.username,
        });

        if (!user) {
          throw new Error("Kullanıcı bulunamadı");
        }

        // bcrypt ile şifre karşılaştırması
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Şifre yanlış");
        }

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.username,
        };
      } catch (error) {
        console.error("Auth error:", error);
        throw error;
      } finally {
        await client.close();
      }
    },
  }),
];
