import {useRouter} from "next/router";
import {MongoClient, ServerApiVersion} from "mongodb";
import {
    Avatar,
    BackgroundImage,
    Badge,
    Button, Card,
    Center, Container,
    Group,
    Paper,
    ScrollArea,
    Stack,
    Text,
    Title
} from "@mantine/core";
import {
    IconBrandDiscord, IconBrandFacebook,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandPaypal, IconBrandSnapchat, IconBrandTiktok, IconBrandTwitter,
    IconPhone
} from "@tabler/icons-react";
import styles from '@/styles/Userpath.module.css';
import AddMeOnButton from "@/components/AddMeOnButton";


export async function getServerSideProps(context) {
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
    });
    await client.connect()
        .catch(err => {
            client.close();
            console.error(err);
        });
    let databaseReturn = await client
        .db(process.env.MONGODB_DATABASE_NAME)
        .collection("users")
        .findOne({userPath: context.query.userpath});

    await client.close();
    if (databaseReturn === null) return {
        notFound: true
    };

    return {
        props: {
            // next props can only be null or json parsable
            profilePicture: databaseReturn.profilePicture === undefined ? null : databaseReturn.profilePicture,
            addMeOns: databaseReturn.addMeOns === undefined ? null : databaseReturn.addMeOns,
        }, // will be passed to the page component as props
    }
}


export default function UserPage(props) {
    const router = useRouter();
    const {userpath} = router.query;


    const addMeOnHandler = (addMeOn) => {
        if (addMeOn.native) window.location = addMeOn.native;
        window.open(addMeOn.link, "_blank");
    }

    return (
        <>
            <Paper style={{padding: "2vh", height: "96vh"}} shadow="xl" radius="xl">
                <BackgroundImage
                    src="star_background.jpg"
                    radius="xl"
                    p="md"
                    style={{height: "96vh"}}
                >
                    <Stack align="center" spacing="md">
                        <Avatar
                            src={props.profilePicture}
                            radius={0.1 * props.userAgentHeight}
                            size={0.2 * props.userAgentHeight}
                            style={{zIndex: "3", top: "2vh"}}
                        />
                        <Text weight={450} className={styles.boujee}>{"/" + userpath}</Text>
                    </Stack>
                    {
                        props.addMeOns ?
                            <>
                                <Title align="center" color="white" style={{paddingBottom: "1vh"}}>Add me on:</Title>

                                <ScrollArea h={0.51 * props.userAgentHeight} type="never">

                                    <Stack align="center" spacing="lg">

                                        {
                                            props.addMeOns.mobile &&
                                            <AddMeOnButton
                                                handler={() => addMeOnHandler(props.addMeOns.mobile)}
                                                gradientFrom={'#ffffff'} gradientTo={'#ffffff'}
                                                icon={<IconPhone color="black" style={{width: "10vw"}}/>}
                                                name="Mobile"
                                                textColor={"black"}
                                            />
                                        }

                                        {
                                            props.addMeOns.instagram &&
                                            <AddMeOnButton
                                                handler={() => addMeOnHandler(props.addMeOns.instagram)}
                                                gradientFrom={'purple'} gradientTo={'orange'}
                                                icon={<IconBrandInstagram style={{width: "10vw"}}/>}
                                                name="Instagram"
                                            />
                                        }

                                        {
                                            props.addMeOns.snapchat &&
                                            <AddMeOnButton
                                                handler={() => addMeOnHandler(props.addMeOns.snapchat)}
                                                gradientFrom={'#FFFC00'} gradientTo={'#FFFC00'}
                                                icon={<IconBrandSnapchat color="black"
                                                                         style={{width: "10vw", fill: "white"}}/>}
                                                name="Snapchat"
                                                textColor="black"
                                            />
                                        }

                                        {
                                            props.addMeOns.linkedin &&
                                            <AddMeOnButton
                                                handler={() => addMeOnHandler(props.addMeOns.linkedin)}
                                                gradientFrom={'blue'} gradientTo={'blue'}
                                                icon={<IconBrandLinkedin style={{width: "10vw"}}/>}
                                                name="LinkedIn"
                                            />
                                        }

                                        {
                                            props.addMeOns.bereal &&
                                            <Button
                                                onClick={() => addMeOnHandler(props.addMeOns.bereal)}
                                                variant="gradient" gradient={{from: '#000000', to: '#000000'}}
                                                radius="xl" style={{width: "50vw"}}>
                                                <Group>
                                                    <Text>BeReal.</Text>
                                                </Group>
                                            </Button>
                                        }

                                        {
                                            props.addMeOns.paypal &&
                                            <AddMeOnButton
                                                handler={() => addMeOnHandler(props.addMeOns.paypal)}
                                                gradientFrom={'#1E477A'} gradientTo={'#1E477A'}
                                                icon={<IconBrandPaypal style={{width: "10vw"}}/>}
                                                name="PayPal"
                                            />
                                        }

                                        {
                                            props.addMeOns.tiktok &&
                                            <AddMeOnButton
                                                handler={() => addMeOnHandler(props.addMeOns.tiktok)}
                                                gradientFrom={'#000000'} gradientTo={'#000000'}
                                                icon={<IconBrandTiktok style={{width: "10vw"}}/>}
                                                name="TikTok"
                                            />
                                        }

                                        {
                                            props.addMeOns.discord &&
                                            <AddMeOnButton
                                                handler={() => addMeOnHandler(props.addMeOns.discord)}
                                                gradientFrom={'#7289da'} gradientTo={'#7289da'}
                                                icon={<IconBrandDiscord style={{width: "10vw"}}/>}
                                                name="Discord"
                                            />
                                        }

                                        {
                                            props.addMeOns.facebook &&
                                            <AddMeOnButton
                                                handler={() => addMeOnHandler(props.addMeOns.facebook)}
                                                gradientFrom={'#4267B2'} gradientTo={'#4267B2'}
                                                icon={<IconBrandFacebook style={{width: "10vw"}}/>}
                                                name="facebook"
                                            />
                                        }

                                        {
                                            props.addMeOns.twitter &&
                                            <AddMeOnButton
                                                handler={() => addMeOnHandler(props.addMeOns.twitter)}
                                                gradientFrom={'#1DA1F2'} gradientTo={'#1DA1F2'}
                                                icon={<IconBrandTwitter style={{width: "10vw"}}/>}
                                                name="twitter"
                                            />
                                        }
                                    </Stack>

                                </ScrollArea>
                            </>
                            :
                            <>
                                <Container>
                                    <Card style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}} radius="xl">
                                        <Stack align="center">
                                            <Title color="white" style={{padding: "1vh"}} align="center">
                                                Welcome to your Add Me On Page!
                                            </Title>
                                            <Text color="white" align="center">
                                                {
                                                    //TODO open app store if not phone
                                                }
                                                Edit your page in the
                                                <a style={{color: "white"}} href="AddMeOn://">app</a>
                                                to see your changes
                                                here
                                            </Text>
                                        </Stack>
                                    </Card>
                                </Container>
                            </>
                    }
                </BackgroundImage>
            </Paper>
        </>
    )
        ;
}
