import {MongoClient, ServerApiVersion} from "mongodb";
import transporter from "@/service/emailTransporter";

import { SignUpEmail } from '@/email/SignUp';
import { render } from '@react-email/render';

import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if(!req.body.email) return res.status(400).json({error: "no email specified"});
    if(!req.body.deviceId) return res.status(400).json({error: "no deviceId specified"});

    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if(!emailRegex.test(req.body.email)) return res.status(400).json({error: "invalid email"});

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
        if(!await collection.findOne({email: req.body.email}))
            await collection.insertOne({email: req.body.email});
    } catch (e) {
        console.error(e);
        return res.status(503).end();
    }

    const date = new Date();
    const token = jwt.sign({email: req.body.email, deviceId: req.body.deviceId, expiration: date.setHours(date.getHours() + 0.25)},
        process.env.JWT_SECRET);

    const emailHtml = render(SignUpEmail({ url: "https://addmeon.org/account?token=" + token}));

    const options = {
        from: process.env.STRATO_MAIL_USER,
        to: req.body.email,
        subject: 'Confirm your Sign In',
        html: emailHtml,
    };

    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });


    await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(options, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });

    await client.close();

    return res.status(200).json({ok: true});
}
