import {Button, Center, Group, Loader, Stack, Text, TextInput} from "@mantine/core";
import * as styles from "@/styles/Userpath.module.css";
import {IconArrowRight} from "@tabler/icons-react";
import {useEffect, useRef, useState} from "react";
import {getHotkeyHandler, randomId, useHotkeys} from "@mantine/hooks";
import {randomInt} from "next/dist/shared/lib/bloom-filter/utils";


export default function EmailInput(props) {
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);

    const ref = useRef(null);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if(!emailRegex.test(ref.current.value)) {
            setError(true);
            setLoading(false);
            return;
        }
        const deviceId = ref.current.value + Date.now() +  randomInt(0, 99999);
        const res = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({
                email: ref.current.value,
                deviceId: deviceId
            })
        });

        if( res.status === 200){
            localStorage.setItem("deviceID", deviceId);
            localStorage.setItem("emailSet", ref.current.value);
            props.setEmailSet(true);
        }
    }

    useHotkeys([
        ['Enter', (e) => handleSignup(e)],
    ]);


    return(
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
                                   }}
                                   onKeyDown={getHotkeyHandler([
                                       ['Enter', handleSignup]
                                   ])}
                        />
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
