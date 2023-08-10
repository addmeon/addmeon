import {useEffect, useState, useRef} from "react";
import {Center} from "@mantine/core";
import SetPath from "@/components/SetPath";
import ProfilePage from "@/components/ProfilePage";
import {MongoClient, ServerApiVersion} from "mongodb";

export async function getServerSideProps(context) {
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
    let databaseReturn = await client
        .db(process.env.MONGODB_DATABASE_NAME)
        .collection("users")
        .findOne({userPath: context.query.userpath});

    await client.close();

    return {
        props: {
            // next props can only be null or json parsable
            profilePicture: databaseReturn.profilePicture === undefined ? null : databaseReturn.profilePicture,
            addMeOns: databaseReturn.addMeOns === undefined ? null : databaseReturn.addMeOns,
        }, // will be passed to the page component as props
    }
}

export default function Profile(props) {
    const [emailSet, setEmailSet] = useState(false);
    const [userPath, setUserPath] = useState("");

    useEffect(() => {
        const userHasPath = localStorage.getItem("userPath");
        const email = localStorage.getItem("emailSet");
        if (!email) return;
        setEmailSet(true);
        if (userHasPath) return setUserPath(userHasPath);
        const res = fetch('/api/haspath', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        }).then(res => res.json()).then(data => {
            if (data.path) {
                localStorage.setItem("userPath", data.path);
                setUserPath(data.path);
            }
        })
    }, []);


    if (!emailSet) return (
        <>
            <br/>
            <Center>Please login to view your profile</Center>
        </>
    );

    if (userPath === "") return <SetPath/>;

    return <ProfilePage addMeOns={props.addMeOns}/>;

}
