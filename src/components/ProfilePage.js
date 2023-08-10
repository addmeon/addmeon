import {
    Button,
    Center,
    FocusTrap,
    Group,
    TextInput,
    Loader,
    Modal,
    ScrollArea,
    Stack,
    Text,
    Badge, SimpleGrid, Grid
} from "@mantine/core";
import * as styles from "@/styles/Userpath.module.css";
import {
    IconArrowRight,
    IconBrandDiscord,
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandPaypal,
    IconBrandSnapchat,
    IconBrandTiktok,
    IconBrandTwitter,
    IconEdit,
    IconLayoutGridAdd,
    IconLink,
    IconPhone,
    IconPlus, IconSearch
} from "@tabler/icons-react";
import {useDisclosure, useFocusTrap} from "@mantine/hooks";
import AddMeOnBanner from "@/components/AddMeOnBanner";


export default function ProfilePage(props) {
    const [opened, {open, close}] = useDisclosure(false);


    return (
        <>
            <Modal opened={opened} onClose={close} title=" " size="lg">
                <Text py="sm">What kind of link would you like to add?</Text>
                <Group position="apart">
                    <Button color="dark" variant="outline" size="xs" rightIcon={<IconSearch/>}>
                        <Text>Search </Text>
                    </Button>
                    <Button color="dark" variant="outline" size="xs" rightIcon={<IconEdit/>}>
                        <Text>Custom </Text>
                    </Button>
                </Group>
                <>
                    <ScrollArea type="never">
                        <SimpleGrid grow py="sm" spacing="sm" cols={2}>
                            {
                                <AddMeOnBanner
                                    handler={() => addMeOnHandler(props.addMeOns.mobile)}
                                    gradientFrom={'#ffffff'} gradientTo={'#ffffff'}
                                    icon={<IconPhone color="black"/>}
                                    name="Mobile"
                                    textColor={"black"}
                                />
                            }

                            {
                                <AddMeOnBanner
                                    handler={() => addMeOnHandler(props.addMeOns.instagram)}
                                    gradientFrom={'purple'} gradientTo={'orange'}
                                    icon={<IconBrandInstagram/>}
                                    name="Instagram"
                                />
                            }

                            {
                                <AddMeOnBanner
                                    handler={() => addMeOnHandler(props.addMeOns.snapchat)}
                                    gradientFrom={'#FFFC00'} gradientTo={'#FFFC00'}
                                    icon={<IconBrandSnapchat color="black"
                                                             style={{ fill: "white"}}/>}
                                    name="Snapchat"
                                    textColor="black"
                                />
                            }

                            {
                                <AddMeOnBanner
                                    handler={() => addMeOnHandler(props.addMeOns.linkedin)}
                                    gradientFrom={'blue'} gradientTo={'blue'}
                                    icon={<IconBrandLinkedin />}
                                    name="LinkedIn"
                                />
                            }

                            {
                                <Button
                                    onClick={() => addMeOnHandler(props.addMeOns.bereal)}
                                    variant="gradient" gradient={{from: '#000000', to: '#000000'}}
                                    radius="xl">
                                    <Group>
                                        <Text>BeReal.</Text>
                                    </Group>
                                </Button>
                            }

                            {
                                <AddMeOnBanner
                                    handler={() => addMeOnHandler(props.addMeOns.paypal)}
                                    gradientFrom={'#1E477A'} gradientTo={'#1E477A'}
                                    icon={<IconBrandPaypal />}
                                    name="PayPal"
                                />
                            }

                            {
                                <AddMeOnBanner
                                    handler={() => addMeOnHandler(props.addMeOns.tiktok)}
                                    gradientFrom={'#000000'} gradientTo={'#000000'}
                                    icon={<IconBrandTiktok />}
                                    name="TikTok"
                                />
                            }

                            {
                                <AddMeOnBanner
                                    handler={() => addMeOnHandler(props.addMeOns.discord)}
                                    gradientFrom={'#7289da'} gradientTo={'#7289da'}
                                    icon={<IconBrandDiscord />}
                                    name="Discord"
                                />
                            }

                            {
                                <AddMeOnBanner
                                    handler={() => addMeOnHandler(props.addMeOns.facebook)}
                                    gradientFrom={'#4267B2'} gradientTo={'#4267B2'}
                                    icon={<IconBrandFacebook />}
                                    name="facebook"
                                />
                            }

                            {
                                <AddMeOnBanner
                                    handler={() => addMeOnHandler(props.addMeOns.twitter)}
                                    gradientFrom={'#1DA1F2'} gradientTo={'#1DA1F2'}
                                    icon={<IconBrandTwitter />}
                                    name="twitter"
                                />
                            }
                        </SimpleGrid>
                    </ScrollArea>
                </>
            </Modal>

            <Center p="md">
                <Stack align="center">
                    <Text size="3vh">Welcome to your AddMeOn Page:</Text>
                    <Text size="3vh" component="a" target="_blank"
                          href={"https://addmeon.org/" + localStorage.getItem("userPath")}>
                        addmeon.org/
                        <span className={styles.boujee}>{localStorage.getItem("userPath")}</span>
                    </Text>
                    <Stack py="xl">
                        {
                            props.addMeOns ?
                                <>
                                    <ScrollArea h={0.51 * props.userAgentHeight} type="never">

                                        <Stack align="center" spacing="lg">

                                            {
                                                props.addMeOns.mobile &&
                                                <AddMeOnBanner
                                                    handler={() => addMeOnHandler(props.addMeOns.mobile)}
                                                    gradientFrom={'#ffffff'} gradientTo={'#ffffff'}
                                                    icon={<IconPhone color="black" style={{width: "10vw"}}/>}
                                                    name="Mobile"
                                                    textColor={"black"}
                                                />
                                            }

                                            {
                                                props.addMeOns.instagram &&
                                                <AddMeOnBanner
                                                    handler={() => addMeOnHandler(props.addMeOns.instagram)}
                                                    gradientFrom={'purple'} gradientTo={'orange'}
                                                    icon={<IconBrandInstagram style={{width: "10vw"}}/>}
                                                    name="Instagram"
                                                />
                                            }

                                            {
                                                props.addMeOns.snapchat &&
                                                <AddMeOnBanner
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
                                                <AddMeOnBanner
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
                                                <AddMeOnBanner
                                                    handler={() => addMeOnHandler(props.addMeOns.paypal)}
                                                    gradientFrom={'#1E477A'} gradientTo={'#1E477A'}
                                                    icon={<IconBrandPaypal style={{width: "10vw"}}/>}
                                                    name="PayPal"
                                                />
                                            }

                                            {
                                                props.addMeOns.tiktok &&
                                                <AddMeOnBanner
                                                    handler={() => addMeOnHandler(props.addMeOns.tiktok)}
                                                    gradientFrom={'#000000'} gradientTo={'#000000'}
                                                    icon={<IconBrandTiktok style={{width: "10vw"}}/>}
                                                    name="TikTok"
                                                />
                                            }

                                            {
                                                props.addMeOns.discord &&
                                                <AddMeOnBanner
                                                    handler={() => addMeOnHandler(props.addMeOns.discord)}
                                                    gradientFrom={'#7289da'} gradientTo={'#7289da'}
                                                    icon={<IconBrandDiscord style={{width: "10vw"}}/>}
                                                    name="Discord"
                                                />
                                            }

                                            {
                                                props.addMeOns.facebook &&
                                                <AddMeOnBanner
                                                    handler={() => addMeOnHandler(props.addMeOns.facebook)}
                                                    gradientFrom={'#4267B2'} gradientTo={'#4267B2'}
                                                    icon={<IconBrandFacebook style={{width: "10vw"}}/>}
                                                    name="facebook"
                                                />
                                            }

                                            {
                                                props.addMeOns.twitter &&
                                                <AddMeOnBanner
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
                                    <Text>
                                        Looks like you don't have any links configured yet, press the button below to
                                        add some!
                                    </Text>
                                    <Button color="dark" variant="outline" onClick={open}
                                            rightIcon={<IconLink/>}>
                                        Add a link
                                    </Button>
                                </>
                        }
                    </Stack>
                </Stack>
            </Center>
        </>
    )
}
