import {Button, Text} from "@mantine/core";


const AddMeOnBanner = (props) => {
    return (
        <>
            <Button
                onClick={props.handler}
                variant={props.gradientTo==='#ffffff' && props.gradientFrom==='#ffffff' ? "outline": "gradient"}
                gradient={{from: props.gradientFrom, to: props.gradientTo}}
                color="gray"
                radius="xl"
                leftIcon={props.icon}>
                <Text color={props.textColor}>{props.name}</Text>
            </Button>
        </>
    )
}

export default AddMeOnBanner;
