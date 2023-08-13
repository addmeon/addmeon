import {
    IconBrandDiscord, IconBrandFacebook,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandPaypal,
    IconBrandSnapchat, IconBrandTiktok, IconBrandTwitter,
    IconPhone
} from "@tabler/icons-react";

const addMeOns = {
    instagram: {
        name: "Instagram",
        gradient: {from: "purple", to: "orange"},
        icon: <IconBrandInstagram/>,
        textColor:"white"
    },
    mobile: {
        name: "Mobile",
        gradient: {from: "#fff", to: "#fff"},
        icon: <IconPhone color="black"/>,
        textColor:"black"
    },
    snapchat: {
        name: "Snapchat",
        gradient: {from: "#FFFC00", to: "#FFFC00"},
        icon: <IconBrandSnapchat color="black" style={{fill: "white"}}/>,
        textColor:"black"
    },
    linkedin: {
        name: "LinkedIn",
        gradient: {from: "blue", to: "blue"},
        icon: <IconBrandLinkedin/>,
        textColor:"white"
    },
    bereal: {
        name: "BeReal.",
        gradient: {from: "#000", to: "#000"},
        textColor:"white"
    },
    paypal: {
        name: "PayPal",
        gradient: {from: "#1E477A", to: "#1E477A"},
        icon: <IconBrandPaypal/>,
        textColor:"white"
    },
    tiktok: {
        name: "TikTok",
        gradient: {from: "#000", to: "#000"},
        icon: <IconBrandTiktok/>,
        textColor:"white"
    },
    discord: {
        name: "Discord",
        gradient: {from: "#7289da", to: "#7289da"},
        icon: <IconBrandDiscord/>,
        textColor:"white"
    },
    facebook: {
        name: "facebook",
        gradient: {from: "#4267B2", to: "#4267B2"},
        icon: <IconBrandFacebook/>,
        textColor:"white"
    },
    twitter: {
        name: "twitter",
        gradient: {from: "#1DA1F2", to: "#1DA1F2"},
        icon: <IconBrandTwitter/>,
        textColor:"white"
    },
    custom: {
        name: "Custom",
        gradient: {from: "#fff", to: "#fff"},
        textColor:"black"
    },
}

export default addMeOns;
