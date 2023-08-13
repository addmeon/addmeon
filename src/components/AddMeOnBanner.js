import {Button, Text} from "@mantine/core";
import {IconEdit} from "@tabler/icons-react";


const AddMeOnBanner = (props) => {
    return (
        <>
            <Button
                onClick={props.handler}
                variant={props.gradientTo === '#fff' && props.gradientFrom === '#fff' ? "outline" : "gradient"}
                gradient={{from: props.gradientFrom, to: props.gradientTo}}
                color="dark"
                radius="xl"
                leftIcon={props.icon}
                rightIcon={props.edit && <IconEdit style={{
                    color:
                        (props.name === "Mobile" || props.name === "Snapchat" || !props.icon)
                            ? "black" : "white"
                }}/>}
            >
                <Text color={props.textColor}>{props.name}</Text>
            </Button>
        </>
    )
}

export default AddMeOnBanner;
