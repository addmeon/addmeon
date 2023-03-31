import jwt from "jsonwebtoken";
import {MongoClient, ServerApiVersion} from "mongodb";

export default async function handler(req, res) {
    const token = JSON.parse(req.body).token;
    if (!token) return res.status(400).json({error: "no token specified"});
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        const client = new MongoClient(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1
        });
        await client.connect()
            .catch(err => {
                client.close();
                console.error(err);
            });
        const collection = client
            .db(process.env.MONGODB_DATABASE_NAME)
            .collection("users");
        await collection.updateOne({email: decoded.email}, {$addToSet: {devices: decoded.deviceId}});
        return res.status(200).json({email: decoded.email});
    } catch (e) {
        console.error(e);
        return res.status(403).json({error: "couldn't verify token"});
    }
}
