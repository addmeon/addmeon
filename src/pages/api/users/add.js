// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {MongoClient, ServerApiVersion} from "mongodb";

// TODO check username is applicable to route

export default async function handler(req, res) {

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

    if (await collection.findOne({userPath: req.body.userPath}))
        return res.status(400).json({error: "user already exists"});

    try {
        // TODO: validation of req.body
        await collection.insertOne(req.body);
        return res.status(200).json({message: "user successfully saved"});
    } catch (err) {
        return res.status(503).json({error: err});
    }


}
