import "animate.css";
import {Group, Stack, Text} from "@mantine/core";
import {useEffect} from "react";
import styles from "@/styles/Userpath.module.css";


export default function Animation(props) {
    useEffect(() => {
        let visited = localStorage.getItem("visited");
        if (!visited) {
            document.getElementById("share").style.color = "black";
            document.getElementById("share").className = "animate__animated animate__fadeInLeft";
            setTimeout(() => {
                document.getElementById("your").style.color = "black";
                document.getElementById("your").className = "animate__animated animate__fadeInDown"
            }, 400)
            setTimeout(() => {
                document.getElementById("socials").style.color = "black";
                document.getElementById("socials").className = "animate__animated animate__fadeInRight"
            }, 800)
            setTimeout(() => {
                document.getElementById("addmeonText").className = styles.boujee;
                document.getElementById("addmeon").style.color = "black";
                document.getElementById("addmeon").className = "animate__animated animate__fadeIn"
            }, 2000)
        }
    }, []);


    return (
        <div style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            height: "100vh", width: "100vw"
        }}
             className="animate__animated animate__fadeOut animate__delay-4s"
        >
            <Stack justify="center" align="center"
                   py={props.isMobile ? props.userAgentHeight * 0.4 : props.userAgentHeight * 0.3}>
                <Group spacing="lg" position="center"
                >
                    <div id="share" style={{color: "white"}}>
                        <Text
                            size="5vh"
                            weight="700"
                        >
                            Share
                        </Text>
                    </div>
                    <div id="your" style={{color: "white"}}>
                        <Text
                            size="5vh"
                            weight="700"

                        >
                            Your
                        </Text>
                    </div>
                    <div id="socials" style={{color: "white"}}>
                        <Text
                            size="5vh"
                            weight="700"
                        >
                            Socials
                        </Text>
                    </div>
                </Group>
                <div id="addmeon" style={{color: "white"}}>
                    <Text id="addmeonText" style={{fontSize: props.isMobile ? "10vh" : "10vw"}}
                          align="center">addmeon</Text>
                </div>
            </Stack>
        </div>

    );
}
