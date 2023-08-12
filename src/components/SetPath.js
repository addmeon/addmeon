import {Button, Center, Group, Loader, Stack, Text, TextInput} from "@mantine/core";
import * as styles from "@/styles/Userpath.module.css";
import {IconArrowRight} from "@tabler/icons-react";
import {useEffect, useRef, useState} from "react";
import {getHotkeyHandler, randomId, useHotkeys} from "@mantine/hooks";
import {randomInt} from "next/dist/shared/lib/bloom-filter/utils";
import {useRouter} from "next/router";


export default function SetPath(props) {
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const ref = useRef(null);

    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        if(ref.current.value==="") return setError("Your path cannot be empty :/");
        setLoading(true);

        const checkPath = await fetch("/" + ref.current.value);
        if(checkPath.status!==404) {
            setLoading(false);
            return setError("Sorry, looks like that path is already taken. Try another one!");
        }


        const res = await fetch('/api/savepath', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: localStorage.getItem("emailSet").toString(),
                path: ref.current.value
            })
        });
        const data = await res.json();
        console.log(data)
        console.log(res)
        if(data.message) {
            localStorage.setItem("userPath", ref.current.value);
            await router.push('/profile?userPath=' + ref.current.value);
            props.setUserPath(ref.current.value);
        }
    }

    useHotkeys([
        ['Enter', (e) => handleSignup(e)],
    ]);


    return (
        <>
            <Center h="100vh" inline={true} ml={20}>
                <Stack align="flex-start" spacing="sm">
                    <Text size="4vh">
                        Looks like you don't have an
                        <span className={styles.boujee}> addmeon </span>
                        path yet!
                    </Text>
                    <Text>
                        Go ahead and configure one by typing your preferred path into the box below:
                    </Text>
                    <Group spacing={4}>
                        <Text size="3vh"><span className={styles.boujee}>addmeon.org/</span></Text>
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
                    {error !=="" && <Text size="sm">{error}</Text>}
                </Stack>
            </Center>
        </>
    );
}
