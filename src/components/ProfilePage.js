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
    Badge, SimpleGrid, Grid, Drawer, Input, Overlay
} from "@mantine/core";
import * as styles from "@/styles/Userpath.module.css";
import {
    IconAbc,
    IconArrowRight,
    IconBrandDiscord,
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandPaypal,
    IconBrandSnapchat,
    IconBrandTiktok,
    IconBrandTwitter, IconDeviceFloppy,
    IconEdit,
    IconLayoutGridAdd,
    IconLink,
    IconPhone,
    IconPlus, IconSearch, IconUser
} from "@tabler/icons-react";
import {useDisclosure, useFocusTrap} from "@mantine/hooks";
import AddMeOnBanner from "@/components/AddMeOnBanner";
import {useRef, useState} from "react";


export default function ProfilePage(props) {
    const [opened, {open, close}] = useDisclosure(false);
    const [opened2, handlers] = useDisclosure(false);

    const [addMeOnPicked, setAddMeOnPicked] = useState("");
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const valueRef = useRef();

    const handleBannerClick = (addMeOn) => {
        setAddMeOnPicked(addMeOn);
        handlers.open();
        setVisible(true)
    }

    const handleSaveAddMeOn = async () => {
        setLoading(true);
        const res = await fetch('/api/users/addmeons/edit', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: localStorage.getItem("emailSet"),
                key: addMeOnPicked,
                value: valueRef.current.value
            })
        });
        const data = await res.json();
        console.log(data);

        setLoading(false);
        handlers.close();
    }


    return (
        <>

            <Modal centered={true} opened={opened} onClose={() => {
                close();
                handlers.close();
            }} title=" " size="lg">
                {visible && <Overlay zIndex={1000000} color="#000" opacity={0.85} />}
                <Text py="sm">What kind of link would you like to add?</Text>

                <Group position="apart">
                    <Button color="dark" variant="outline" size="xs" rightIcon={<IconSearch/>}>
                        <Text>Search </Text>
                    </Button>
                    <Button color="dark" variant="outline" size="xs" rightIcon={<IconEdit/>}
                            onClick={() => handleBannerClick("Custom")}>
                        <Text>Custom </Text>
                    </Button>
                </Group>

                <>
                    <ScrollArea type="never">
                        <SimpleGrid py="sm" spacing="sm" cols={2}>
                            {
                                !props.addMeOns.mobile &&
                                <AddMeOnBanner
                                    handler={() => handleBannerClick("mobile")}
                                    gradientFrom={'#ffffff'} gradientTo={'#ffffff'}
                                    icon={<IconPhone color="black"/>}
                                    name="Mobile"
                                    textColor={"black"}
                                />

                            }

                            {
                                !props.addMeOns.instagram &&
                                <AddMeOnBanner
                                    handler={() => handleBannerClick("instagram")}
                                    gradientFrom={'purple'} gradientTo={'orange'}
                                    icon={<IconBrandInstagram/>}
                                    name="Instagram"
                                />
                            }

                            {
                                !props.addMeOns.snapchat &&
                                <AddMeOnBanner
                                    handler={() => handleBannerClick("snapchat")}
                                    gradientFrom={'#FFFC00'} gradientTo={'#FFFC00'}
                                    icon={<IconBrandSnapchat color="black"
                                                             style={{fill: "white"}}/>}
                                    name="Snapchat"
                                    textColor="black"
                                />
                            }

                            {
                                !props.addMeOns.linkedin &&
                                <AddMeOnBanner
                                    handler={() => handleBannerClick("linkedin")}
                                    gradientFrom={'blue'} gradientTo={'blue'}
                                    icon={<IconBrandLinkedin/>}
                                    name="LinkedIn"
                                />
                            }

                            {
                                !props.addMeOns.bereal &&
                                <Button
                                    onClick={() => handleBannerClick("bereal")}
                                    variant="gradient" gradient={{from: '#000000', to: '#000000'}}
                                    radius="xl">
                                    <Group>
                                        <Text>BeReal.</Text>
                                    </Group>
                                </Button>
                            }

                            {
                                !props.addMeOns.paypal &&
                                <AddMeOnBanner
                                    handler={() => handleBannerClick("paypal")}
                                    gradientFrom={'#1E477A'} gradientTo={'#1E477A'}
                                    icon={<IconBrandPaypal/>}
                                    name="PayPal"
                                />
                            }

                            {
                                !props.addMeOns.tiktok &&
                                <AddMeOnBanner
                                    handler={() => handleBannerClick("tiktok")}
                                    gradientFrom={'#000000'} gradientTo={'#000000'}
                                    icon={<IconBrandTiktok/>}
                                    name="TikTok"
                                />
                            }

                            {
                                !props.addMeOns.discord &&
                                <AddMeOnBanner
                                    handler={() => handleBannerClick("discord")}
                                    gradientFrom={'#7289da'} gradientTo={'#7289da'}
                                    icon={<IconBrandDiscord/>}
                                    name="Discord"
                                />
                            }

                            {
                                !props.addMeOns.facebook &&
                                <AddMeOnBanner
                                    handler={() => handleBannerClick("facebook")}
                                    gradientFrom={'#4267B2'} gradientTo={'#4267B2'}
                                    icon={<IconBrandFacebook/>}
                                    name="facebook"
                                />
                            }

                            {
                                !props.addMeOns.twitter &&
                                <AddMeOnBanner
                                    handler={() => handleBannerClick("twitter")}
                                    gradientFrom={'#1DA1F2'} gradientTo={'#1DA1F2'}
                                    icon={<IconBrandTwitter/>}
                                    name="twitter"
                                />
                            }
                        </SimpleGrid>
                    </ScrollArea>
                </>
            </Modal>


            <Modal centered={true} opened={opened2} onClose={() => {setVisible(false);handlers.close();}}
                   title={"Add your " + addMeOnPicked + (addMeOnPicked === "mobile" ? " number" :" link")}
                   style={{zIndex: 100000000000000000000000000}}>
                {addMeOnPicked === "Custom" &&
                    <TextInput
                        icon={<IconAbc/>}
                        data-autofocus
                        placeholder={"Button Display Name"}
                    />
                }
                {addMeOnPicked === "mobile" &&
                    <TextInput
                        icon={<IconUser/>}
                        data-autofocus
                        placeholder={"Name displayed on contact card"}
                    />
                }
                <TextInput
                    ref={valueRef}
                    color="dark"
                    icon={addMeOnPicked === "mobile" ? <IconPhone/> : <IconLink/>}
                    py="sm" data-autofocus={addMeOnPicked !== "mobile"}
                    placeholder={addMeOnPicked === "mobile" ?
                        "Enter Your Mobile Number"
                        : "Enter your link including 'https://'"}
                />
                <Group position="right">
                    <Button color="dark" variant="outline"
                            loading={loading}
                            onClick={handleSaveAddMeOn}
                            leftIcon={<IconDeviceFloppy/>}>
                        Save
                    </Button>
                </Group>
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

                        <>
                            {
                                Object.entries(props.addMeOns).length > 0 ?
                                    <Text>
                                        Click the button below to add more links, or edit your existing links below.
                                    </Text> :
                                    <Text>Looks like you don't have any links configured yet, press the button below to
                                        add some!</Text>
                            }
                            <Button color="dark" variant="outline" onClick={open}
                                    rightIcon={<IconLink/>}>
                                Add a link
                            </Button>

                        </>

                        <>
                            <ScrollArea h={0.51 * props.userAgentHeight} type="never">

                                <SimpleGrid cols={2} align="center">
                                    {
                                        props.addMeOns.mobile &&
                                        <AddMeOnBanner
                                            edit
                                            handler={() => handleBannerClick("mobile")}
                                            gradientFrom={'#ffffff'} gradientTo={'#ffffff'}
                                            icon={<IconPhone color="black"/>}
                                            name="Mobile"
                                            textColor={"black"}
                                        />
                                    }

                                    {
                                        props.addMeOns.instagram &&
                                        <AddMeOnBanner
                                            edit
                                            handler={() => handleBannerClick("instagram")}
                                            gradientFrom={'purple'} gradientTo={'orange'}
                                            icon={<IconBrandInstagram/>}
                                            name="Instagram"
                                        />
                                    }

                                    {
                                        props.addMeOns.snapchat &&
                                        <AddMeOnBanner
                                            edit
                                            handler={() => handleBannerClick("snapchat")}
                                            gradientFrom={'#FFFC00'} gradientTo={'#FFFC00'}
                                            icon={<IconBrandSnapchat color="black"
                                                                     style={{fill: "white"}}/>}
                                            name="Snapchat"
                                            textColor="black"
                                        />
                                    }

                                    {
                                        props.addMeOns.linkedin &&
                                        <AddMeOnBanner
                                            edit
                                            handler={() => handleBannerClick("linkedin")}
                                            gradientFrom={'blue'} gradientTo={'blue'}
                                            icon={<IconBrandLinkedin/>}
                                            name="LinkedIn"
                                        />
                                    }

                                    {
                                        props.addMeOns.bereal &&
                                        <Button
                                            edit
                                            handler={() => handleBannerClick("bereal")}
                                            variant="gradient" gradient={{from: '#000000', to: '#000000'}}
                                            radius="xl">
                                            <Group>
                                                <Text>BeReal.</Text>
                                            </Group>
                                        </Button>
                                    }

                                    {
                                        props.addMeOns.paypal &&
                                        <AddMeOnBanner
                                            edit
                                            handler={() => handleBannerClick("paypal")}
                                            gradientFrom={'#1E477A'} gradientTo={'#1E477A'}
                                            icon={<IconBrandPaypal/>}
                                            name="PayPal"
                                        />
                                    }

                                    {
                                        props.addMeOns.tiktok &&
                                        <AddMeOnBanner
                                            edit
                                            handler={() => handleBannerClick("tiktok")}
                                            gradientFrom={'#000000'} gradientTo={'#000000'}
                                            icon={<IconBrandTiktok/>}
                                            name="TikTok"
                                        />
                                    }

                                    {
                                        props.addMeOns.discord &&
                                        <AddMeOnBanner
                                            edit
                                            handler={() => handleBannerClick("discord")}
                                            gradientFrom={'#7289da'} gradientTo={'#7289da'}
                                            icon={<IconBrandDiscord/>}
                                            name="Discord"
                                        />
                                    }

                                    {
                                        props.addMeOns.facebook &&
                                        <AddMeOnBanner
                                            edit
                                            handler={() => handleBannerClick("facebook")}
                                            gradientFrom={'#4267B2'} gradientTo={'#4267B2'}
                                            icon={<IconBrandFacebook/>}
                                            name="facebook"
                                        />
                                    }

                                    {
                                        props.addMeOns.twitter &&
                                        <AddMeOnBanner
                                            edit
                                            handler={() => handleBannerClick("twitter")}
                                            gradientFrom={'#1DA1F2'} gradientTo={'#1DA1F2'}
                                            icon={<IconBrandTwitter/>}
                                            name="twitter"
                                        />
                                    }
                                </SimpleGrid>

                            </ScrollArea>
                        </>

                    </Stack>
                </Stack>
            </Center>
        </>
    )
}
