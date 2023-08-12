import {useEffect, useState, useRef} from "react";
import {Center} from "@mantine/core";
import SetPath from "@/components/SetPath";
import ProfilePage from "@/components/ProfilePage";
import {MongoClient, ServerApiVersion} from "mongodb";
import {useRouter} from "next/router";

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
        .findOne({userPath: context.query.userPath});

    await client.close();

    if (databaseReturn === null) return {props: {addMeOns: {}}};

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
    const [hidden, setHidden] = useState(true);

    const router = useRouter();

    useEffect(() => {
        setTimeout(() => setHidden(false), 1000)
        const userHasPath = localStorage.getItem("userPath");
        const email = localStorage.getItem("emailSet");
        if (!email) return;
        setEmailSet(true);
        if (userHasPath!==null) return setUserPath(userHasPath);
        fetch('/api/haspath', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        }).then(res => res.json()).then(data => {
            console.log(data)
            if (data.path) {
                localStorage.setItem("userPath", data.path);
                setUserPath(data.path);
            }
        });
    }, []);


    if (!emailSet) return (
        <>
            <br/>
            <div hidden={hidden}>
            <Center>Please login to view your profile</Center>
            </div>
        </>
    );

    if (userPath === "") return <SetPath setUserPath={setUserPath}/>;

    if (router.query.userPath === userPath) return <ProfilePage addMeOns={props.addMeOns === null ? {} : props.addMeOns}/>;

    router.push('/profile?userPath=' + userPath, {}, );

    return <ProfilePage addMeOns={props.addMeOns === null ? {} : props.addMeOns}/>;


}
