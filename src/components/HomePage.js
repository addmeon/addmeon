import {Badge, Button, Center, Group, Stack, Text} from "@mantine/core";
import styles from "@/styles/Userpath.module.css";
import Link from "next/link";
import {useState} from "react";

export default function HomePage() {
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    return (
        <>
            <Center h="92vh" inline={true} ml={20}>
                <Stack align="flex-start" spacing={0}>
                    <Text size="4vh">
                        <div>
                            Create your own <span className={styles.boujee}>addmeon</span> page in seconds
                        </div>
                    </Text>
                    <Link href="signup" prefetch={true}>
                        <Button color="dark" variant="outline"
                                loading={loading} loaderPosition="right" onClick={() => setLoading(true)}>
                            try it out
                        </Button>
                    </Link>
                    {localStorage.getItem("emailSet") && localStorage.getItem("deviceID") &&
                        <>
                            <Text size="3vh" pt="md">Looks like you're already logged in! Click the link below to visit your
                                profile.</Text>
                            <Link href="profile" prefetch={true}>
                                <Button color="dark" variant="outline"
                                        loading={loading2} loaderPosition="right" onClick={() => setLoading2(true)}>
                                    Profile
                                </Button>
                            </Link>
                        </>
                    }
                </Stack>
            </Center>
            <Group position="center" h="8vh" style={{borderTop: "1px solid", background: "D3D3D3"}}>
                <Button color="dark" variant="outline"
                        component="a" href="https://www.apple.com/app-store/" target="_blank">
                    get the app
                </Button>
            </Group>
        </>
    )
}
