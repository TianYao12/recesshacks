import NextAuth from "next-auth";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import GoogleProviders from "next-auth/providers/google";

const uri = process.env.DB_URL;

if(!uri) {
    throw new Error("Missing env variable: DB_URL");
}

const options = {};

let client;
let clientPromise;

if(process.env.NODE_ENV === "development") {
    if(!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
        console.log("MongoDB client connected");
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
    console.log("MongoDB client connected");
}

export default NextAuth({
    providers: [
        GoogleProviders({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    session: {
        jwt: true,
    },
    jwt: {
        secret: "fghweifhweohuew",
    },
    callbacks: {
        async session({session, token, user}) {
            if(user) {
                session.user.id = user.id;
            }
            return session;
        }
    }
})