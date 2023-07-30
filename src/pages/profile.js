import {useEffect, useState, useRef} from "react";
import {Center} from "@mantine/core";
import SetPath from "@/components/SetPath";
import ProfilePage from "@/components/ProfilePage";

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

    return <ProfilePage/>;

}
