// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {MongoClient, ServerApiVersion} from "mongodb";

// TODO check username is applicable to route, check user has authenticated email or phone
// TODO modify addmeons/add new addmeons

export default async function handler(req, res) {
    console.log(req.body);

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

    const user = await collection.findOne({
        email: req.body.email
    });

    if (!user) {
        await client.close();
        return res.status(400).json({error: "user doesnt exist"});
    }

    try {
        // TODO: validation of req.body
        await client.close();
        return res.status(200).json({addMeOns: user.addMeOns});
    } catch (err) {
        return res.status(503).json({error: err});
    }
}
