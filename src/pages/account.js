import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {Center, Text, Loader, Stack} from "@mantine/core";


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
                router.push('/profile');
            });
    }, [router.query]);

    return (
        <>
                <>
                    <Center maw={400} h={"100vh"} mx="auto">
                        <Stack align="center">
                            <Loader color="dark"/>
                            <Text>We're verifying your Email</Text>
                        </Stack>
                    </Center>
                </>
        </>
    );
}
