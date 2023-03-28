import {IconBrandPaypal} from "@tabler/icons-react";
import {Button, Text} from "@mantine/core";


const AddMeOnButton = (props) => {
    return (
        <>
            <Button
                onClick={props.handler}
                variant="gradient" gradient={{from: props.gradientFrom, to: props.gradientTo}}
                radius="xl" style={{width: "50vw"}}
                leftIcon={props.icon}>
                <Text style={{width: "25vw", padding: "5vw"}} color={props.textColor}>{props.name}</Text>
            </Button>
        </>
    )
}

export default AddMeOnButton;
