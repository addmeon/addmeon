import {MongoClient, ServerApiVersion} from "mongodb";

export default async function handler(req, res) {
    console.log(req.body);
    if (!req.body.email) res.status(400).json({error: "No Email Specified"});
    if (!req.body.path) res.status(400).json({error: "No Path Specified"});

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

    try {
        const user = await collection.findOne({email: req.body.email});
        if (user.path) res.status(400).json({error: "user already has a path"});
        await collection.updateOne({email: req.body.email}, {$set: {userPath: req.body.path}});
        res.status(200).json({message: "path successfully saved"})
    } catch (e) {
        console.error(e);
        res.status(400).json({error: "error saving to db"});
    }

}
