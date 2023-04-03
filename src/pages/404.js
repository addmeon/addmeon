import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function Custom404() {
    // TODO: make prettier
    const [path, setPath] = useState("");
    const router = useRouter();


    useEffect(() => {
        setPath(router.asPath);
    }, []);

    return <h1>User {path} doesn't exist yet</h1>
}
