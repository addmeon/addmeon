import {Button, Center, Group, Loader, Stack, Text, TextInput} from "@mantine/core";
import * as styles from "@/styles/Userpath.module.css";
import {IconArrowRight} from "@tabler/icons-react";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";


export default function EmailInput(props) {
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    useEffect(() => {
        setInterval(async () => {
            const res = await fetch('/api/verified', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: localStorage.getItem("emailSet").toString(),
                    deviceId: localStorage.getItem("deviceID").toString()
                })
            });
            const data = await res.json();
            console.log(data);
            if (data.verified == 'true') {
                console.log("true")
                await router.push('/profile');
            }
        }, 1000);
    }, []);


    const handleResend = async (e) => {
        e.preventDefault();
        setLoading(true)
        const res = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({
                email: localStorage.getItem("emailSet"),
                deviceId: localStorage.getItem("deviceID")
            })
        });
        if (res.status === 200) setLoading(false);
    }

    return (
        <>
            <Center h="100vh" inline={true} ml={20}>
                <Stack align="flex-start" spacing="sm">
                    <Text size="4vh">Thank you.</Text>
                    <Group spacing={3}>
                        <Text span>We've sent a confirmation link to </Text>
                        <Text className={styles.boujee}>{localStorage.getItem("emailSet")}.</Text>
                        <Text>
                            Please use it to confirm your email.
                        </Text>
                    </Group>
                    <Text size="xs" color="dimmed">
                        (This page will reload as soon as your email has been confirmed)
                    </Text>
                    <Button color="dark" variant="outline"
                            loading={loading} loaderPosition="right" onClick={handleResend}>
                        Resend email
                    </Button>
                </Stack>
            </Center>
        </>
    );
}
