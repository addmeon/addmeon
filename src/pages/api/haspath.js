import {MongoClient, ServerApiVersion} from "mongodb";

export default async function handler(req, res) {
    console.log(req.body);
    if (!req.body.email) res.status(400).json({error: "No Email Specified"});

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
        console.log(user);
        await client.close();
        res.status(200).json({path: user.userPath})
    } catch (e) {
        console.error(e);
        await client.close();
        res.status(400).json({error: "error saving to db"});
    }

}
