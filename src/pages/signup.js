import {Button, Center, Group, Loader, Stack, Text, TextInput} from "@mantine/core";
import * as styles from "@/styles/Userpath.module.css";
import {IconArrowRight} from "@tabler/icons-react";
import {useEffect, useState, useRef} from "react";

export default function Signup(props) {
    const [loading, setLoading] = useState(false);
    const [emailConfirmation, setEmailConfirmation] = useState(false);
    const [error, setError] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        setEmailConfirmation(Boolean(localStorage.getItem("emailConfirmation")));
    }, [])

    const handleSignup = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if(!emailRegex.test(ref.current.value)) {
            setError(true);
            setLoading(false);
            return;
        }
        //localStorage.setItem("emailConfirmation", "true");

    }

    if (emailConfirmation) return (
        <>

        </>
    )

    return (
        <>
            <Center h="100vh" inline={true} ml={20}>
                <Stack align="flex-start" spacing="sm">
                    <Text size="4vh">Please use your email to sign up or sign in to your
                        <span className={styles.boujee}> addmeon </span>
                        account</Text>
                    <Group spacing={4}>
                        <TextInput ref={ref}
                                   variant="unstyled"
                                   width={250} height={36}
                                   style={{
                                       border: "1px solid", borderRadius: "0.5vh", height: 36, width: 250,
                                       paddingLeft: 4
                                   }}/>
                        <Button color="dark" variant="outline" onClick={(e) => handleSignup(e)}>
                            {loading ? <Loader color="dark" size="xs"/> : <IconArrowRight/>}
                        </Button>
                    </Group>
                    {error && <Text size="sm">Please enter a valid email</Text>}
                </Stack>
            </Center>
        </>
    );

}
