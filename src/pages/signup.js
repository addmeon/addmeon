import {Button, Center, Group, Loader, Stack, Text, TextInput} from "@mantine/core";
import * as styles from "@/styles/Userpath.module.css";
import {IconArrowRight} from "@tabler/icons-react";
import {useEffect, useState, useRef} from "react";
import EmailInput from "@/components/EmailInput";
import ConfirmEmail from "@/components/ConfirmEmail";

export default function Signup(props) {
    const [emailSet, setEmailSet] = useState(false);
    const [emailConfirmed, setEmailConfirmed] = useState(false);

    useEffect(() => {
        setEmailSet(Boolean(localStorage.getItem("emailSet")));
    }, [])

    if (!emailSet) return <EmailInput setEmailSet={setEmailSet}/>;
    if (!emailConfirmed) return <ConfirmEmail
        emailConfirmed={emailConfirmed} setEmailConfirmed={setEmailConfirmed}/>;

}
