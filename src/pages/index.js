import Head from 'next/head'
import styles from "@/styles/Userpath.module.css";
import {Center, Group, Text} from "@mantine/core";

export default function Home() {
    return (
        <>
            <Head>
                <title>AddMeOn</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <Center my={300}>
                    <div>
                        <Text size={50} weight={600} align="center">Welcome to </Text>
                        <Text weight={600} align="center" className={styles.boujee}>addmeon.org</Text>
                        <Text size={30} align="center">Great things coming soon!</Text>
                    </div>
                </Center>
            </main>
        </>
    )
}
