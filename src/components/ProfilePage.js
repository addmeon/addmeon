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
    IconPlus, IconSearch, IconTrash, IconUser
} from "@tabler/icons-react";
import {useDisclosure, useFocusTrap} from "@mantine/hooks";
import AddMeOnBanner from "@/components/AddMeOnBanner";
import {useEffect, useRef, useState} from "react";
import addMeOnsDef from "@/data/AddMeOns";


export default function ProfilePage(props) {
    const [opened, {open, close}] = useDisclosure(false);
    const [opened2, handlers] = useDisclosure(false);

    const [addMeOnPicked, setAddMeOnPicked] = useState("");
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [addMeOns, setAddMeOns] = useState({...props.addMeOns});
    const [editMode, setEditMode] = useState(false);
    const [editValue, setEditValue] = useState("");
    const [customKeyValue, setCustomKeyValue] = useState("");

    const valueRef = useRef();
    const customKeyRef = useRef();

    useEffect(() => setAddMeOns(props.addMeOns), [props.addMeOns]);

    const handleSaveAddMeOn = async () => {
        setLoading(true);
        const postBody = {
            email: localStorage.getItem("emailSet"),
            key: addMeOnPicked,
        };
        addMeOnPicked === "custom" ?
            postBody.custom = {label: customKeyRef.current.value, link: valueRef.current.value}
            :
            postBody.value = valueRef.current.value;
        const res = await fetch('/api/users/addmeons/edit', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postBody)
        });
        const data = await res.json();
        await setAddMeOns(data.addMeOns);
        console.log(data);

        setLoading(false);
        setVisible(false);
        handlers.close();
    }

    const handleDeleteAddMeOn = async () => {
        setLoading(true);
        const res = await fetch('/api/users/addmeons/edit', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: localStorage.getItem("emailSet"),
                key: addMeOnPicked,
                delete: true,
                custom: addMeOnPicked === "custom" ?
                    addMeOns.custom.find(el => el.label === customKeyValue && el.link === editValue)
                    : null,
            })
        });
        const data = await res.json();
        await setAddMeOns(data.addMeOns);
        console.log(data);

        setLoading(false);
        setVisible(false);
        handlers.close();
    }

    const handleBannerClick = (addMeOn, edit, customObject) => {
        console.log(customObject)
        setEditValue("");
        setCustomKeyValue("");
        if (edit) {
            setEditMode(true);
            setEditValue(addMeOn === "custom" ? customObject.link : addMeOns[addMeOn].link);
            setCustomKeyValue(customObject !== null ? customObject.label : "")
        }
        setAddMeOnPicked(addMeOn);
        handlers.open();
        setVisible(true);
    }

    let addMeOnBannersEdit = [];
    let customIndex = 0;
    for (const key in addMeOns) {
        let cI = customIndex;
        if(key === "custom" && addMeOns.custom.length <1 ) break;
        addMeOnBannersEdit.push(
            <AddMeOnBanner
                edit
                handler={() => handleBannerClick(key, true, key === "custom" ? addMeOns.custom[cI] : null)}
                gradientFrom={addMeOnsDef[key].gradient.from}
                gradientTo={addMeOnsDef[key].gradient.to}
                icon={addMeOnsDef[key].icon}
                name={key === "custom" ? addMeOns.custom[cI].label : addMeOnsDef[key].name}
                textColor={addMeOnsDef[key].textColor}
            />
        );
        if (key === "custom") customIndex++;
    }

    let addMeOnBanners = [];
    for (const key in addMeOnsDef) {
        if (addMeOns[key] === undefined && key!=="custom") addMeOnBanners.push(
            <AddMeOnBanner
                handler={() => handleBannerClick(key)}
                gradientFrom={addMeOnsDef[key].gradient.from}
                gradientTo={addMeOnsDef[key].gradient.to}
                icon={addMeOnsDef[key].icon}
                name={addMeOnsDef[key].name}
            />
        );
    }
    console.log(addMeOnBanners)


    return (
        <>

            <Modal centered={true} opened={opened} onClose={() => {
                close();
                handlers.close();
            }} title=" " size="lg">
                {visible && <Overlay zIndex={1000000} color="#000" opacity={0.85}/>}
                <Text py="sm">What kind of link would you like to add?</Text>

                <Group position="apart">
                    <Button color="dark" variant="outline" size="xs" rightIcon={<IconSearch/>} onClick={""}>
                        <Text>Search </Text>
                    </Button>
                    <Button color="dark" variant="outline" size="xs" rightIcon={<IconEdit/>}
                            onClick={() => handleBannerClick("custom")}>
                        <Text>Custom</Text>
                    </Button>
                </Group>

                <>
                    <ScrollArea type="never">
                        <SimpleGrid py="sm" spacing="sm" cols={2}>
                            {addMeOnBanners}
                        </SimpleGrid>
                    </ScrollArea>
                </>
            </Modal>


            <Modal centered={true} opened={opened2}
                   onClose={() => {
                       setVisible(false);
                       handlers.close();
                       setEditMode(false);
                   }}
                   title={(editMode ? "Edit" : "Add")
                       + " your " + addMeOnPicked +
                       (addMeOnPicked === "mobile" ? " number" : " link")}
                   style={{zIndex: 100000000000000000000000000}}>
                {addMeOnPicked === "custom" &&
                    <TextInput
                        ref={customKeyRef}
                        icon={<IconAbc/>}
                        data-autofocus
                        placeholder={"Button Display Name"}
                        value={customKeyValue}
                        onChange={(e) => setCustomKeyValue(e.currentTarget.value)}
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
                        : "Enter your " + addMeOnPicked + " link including 'https://'"}
                    value={editValue}
                    onChange={(e) => setEditValue(e.currentTarget.value)}
                />
                <Group position={editMode ? "apart" : "right"}>
                    {editMode && <Button color="red" variant="outline"
                                         loading={loading}
                                         onClick={handleDeleteAddMeOn}
                                         leftIcon={<IconTrash/>}>
                        Delete
                    </Button>}
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
                                Object.entries(addMeOns).length > 0 ?
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
                                    {addMeOnBannersEdit}
                                </SimpleGrid>
                            </ScrollArea>
                        </>

                    </Stack>
                </Stack>
            </Center>
        </>
    )
}
