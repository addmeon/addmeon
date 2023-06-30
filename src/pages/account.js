import {useRouter} from "next/router";
import {useEffect, useState} from "react";


export default function AccountPage(props) {
    const router = useRouter();
    const [email, setEmail] = useState(null);
//TODO: test with new email

    useEffect(() => {
        if (!router.query.token) return;
        fetch("/api/token", {
            method: 'POST',
            body: JSON.stringify({
                token: router.query.token
            })
        })
            .then(res => res.json())
            .then(data => {
                setEmail(data.email);
            });
    }, [router.query]);

    return (
        <>
            {email ?
                <div>Thank you for confirming your email address at {email}</div>
                :
                <div>account</div>
            }
        </>
    );
}
