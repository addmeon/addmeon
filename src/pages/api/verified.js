import {MongoClient, ServerApiVersion} from "mongodb";


export default async function handler(req, res) {
    console.log(req.body);
    if(!req.body.email) res.status(400).json({error: "no email specified"});
    if(!req.body.deviceId) res.status(400).json({error: "no deviceId specified"});

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

    const user = await collection.findOne({email: req.body.email});
    await client.close();

    console.log(req.body);
    console.log(user.devices);
    if(user) if(user.devices.some((item) => JSON.stringify(item) === JSON.stringify(req.body.deviceId)))
        return res.status(200).json({verified: "true"});
    return res.status(400).json({verified: "false"});
}
