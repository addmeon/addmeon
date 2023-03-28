import {useRouter} from "next/router";
import {MongoClient, ServerApiVersion} from "mongodb";
import {Avatar, BackgroundImage, Button, Group, Paper, ScrollArea, Stack, Text, Title} from "@mantine/core";
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
        .findOne({userPath: context.query.userpath})
    if (databaseReturn === null) return {
        props: {
            userNotFound: true
        }
    };
    return {
        props: {
            profilePicture: JSON.parse(JSON.stringify(databaseReturn.profilePicture)),
            addMeOns: JSON.parse(JSON.stringify(databaseReturn.addMeOns)),
        }, // will be passed to the page component as props
    }
}


export default function UserPage(props) {
    const router = useRouter();
    const {userpath} = router.query;

    if (props.userNotFound) return (
        <>
            <Text>User doesn't exist yet</Text>
        </>
    );

    const phoneHandler = () => {
        window.location = ("data:text/x-vcard;urlencoded," + "BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3BCHARSET%3DUTF-8%3ATriest%3BEmil%3B%3B%3B%0AFN%3BCHARSET%3DUTF-8%3A%20Emil%20Triest%0AURL%3BPRIVATE%3Ahttps%3A%2F%2Femil.triest.de%0AEMAIL%3Btype%3DHOME%3Aemil%40triest.de%0ATEL%3Btype%3DHOME%3BVOICE%3A%2B4917672576806%0APHOTO%3BTYPE%3DJPEG%3BENCODING%3DBASE64%3A%2F9j%2F4AAQSkZJRgABAQEAYABgAAD%2F%2FgA%2BQ1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBkZWZhdWx0IHF1YWxpdHkK%2F9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy%2F9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy%2F8AAEQgAuQC5AwEiAAIRAQMRAf%2FEAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC%2F%2FEALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29%2Fj5%2Bv%2FEAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC%2F%2FEALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5%2Bjp6vLz9PX29%2Fj5%2Bv%2FaAAwDAQACEQMRAD8A2ddljXxBqCGRA7XMmF3cn5j2p1rb3MljIkdtMzGQEAoUzgHpuwO9Wdcuri31G%2B8mTyw93MCEUL0b279eayDPcTgLLNI4zxvYnH515MuWMme9D2koLZfj%2FkWmtbpG2MkUb90kmAb8hmo8w8ObpGHeNI23fmcCk05Sb5D2GTn8KoRSxvny3DkdQnzH9KV1a6Q7PmtKX5I1Z720kdWeCWbCheX2YA6dMg0ltJGZJjHbQxtsZg6r83A4yf8A61UUjlmOEgnJ%2FwBqMp%2F6Fir9mkkSzGePyC0TIvmsvJP0JrSLm3qZTVBRsnd%2BtyE3M78GQ%2FgMfypsksswzI8kgUfxMTgU4wbIixurZWyNyozPxn8KVpGt4LZMK95OVA2KcoCucYzg9MfjUOMnuzT2tOPwr8CIKzcKpOemBWhLDceeqm2doWwS2OBgcEn0x74pltqBbWI7a1T%2FAEgRFvmYrg%2B%2B1cDHTn9an1Qi2YOZiiFgFCAhsg7SD2yeg5GcH0oStoZVKvM9BiS28lx5e2dZOFd4hldzZ2k9%2Bnf3565q1FbwW8KiFCELEFV5xk4J56nOevr36niNT11rK5eWOQRsgLb1jO1xk9D68Ht68nGaQatNHq13crMypsUvvLZYdBx25x357U3czvc3ItWL6g8QDS%2BZgDadpySuAOOoyRjpz25rUgvlit2WyuZ8q%2BAxlJ5yeTg8%2FdIJz2%2FCvJ7vX1M88sT%2BXLIp344Uc9R6cY79uvWug8OapMyNyWedNyfIWYMRnCYOCfY9SAc07O1xX10O3XUr2Wd0TWblRs8wGNyMDPHJOP0p013cozRvrGsSuOwuSmOAf4cGuKt9Slmt7u1S4AdVUI1rIeScZIb6E59a07DTrmxkSe3vLmUFS7W8zlw4PoTyMA9uf51fM0g0k%2Fe2Ogg1i%2Bt1IjvL8n1kvZH%2FAPQiak%2Ft%2FVv%2Bf%2BcH181v8ahltdyK0fKkF8heMYB%2B936j%2BlUJbiC2H76aKM%2F7TgVDqT7nVGjRtdJGu%2Bu6tIuG1K4x%2Fsvj%2BVNGr6n%2FANBG8%2F7%2FALf41lrdwOmUcyA%2F88kL%2FwAgacJ8jKW9y%2Ft5RX%2F0LFF5vuNujHt%2BBsyapqQtYG%2FtG73Fmz%2B%2Bb296hOs6mM%2F8TG7%2FABmb%2FGq0ks89tbiGymbbu3KWQbTx1y3t2qL7PqrsAljbAHvJckEfgEP86uXPcwp1KKTvbd%2FmXv7a1M%2F8xG7%2FAO%2Fzf40v9san%2FwBBG7%2F7%2FP8A41UNhqCrvee0iwMlRG0n65H8qrbdQ%2F57J%2F34P%2FxdFp9y%2Fa0ei%2FAva9PYtqt4jNdeZHdS5CqoBy5zySTWWTafZvOW2l3hwPmuXx09BirOt2V%2FLr2pNDYTyIbqXDjaAfmPqRUCWcps2jdoIpQ%2Bdks6jj8CahqXM9BRdPlWt%2FmxY70R4aKztI5B0kRDuH4k1Gb%2B5c4MuPdVCn8wKelgxXDXlmp6nZJ5nH4YojgsEOZNRWX2it2B%2FU1Np9X%2BJadHpH8AvHk3hXdm%2BVTgt3Kiq4NXru402aUOGvAcAFQqYOAB9abGLCdZmNtMBGm4f6Q655A7fWhwvLccajjFe6%2FwILq5FrbxyNnKtlm%2B9gDAzx0FU4vGeYZnSLymji2E9WYKRkgk%2FTj2OecGszxJqn2HGYl8hxhkLbuPUHrkf%2BzD3rmrSJ5mTZJMFhDAqX27c5Ofyx%2BIpxRzVJXkdDH4qAgzHIVhQOPLRFWOU9AWXA3FR1zxwO%2BS2dqHiSe72XUqkspWOTJJJTBIYn1OfoMLT5vDVzLYlYRmItuBPzFuuOT%2BFVP%2BEdkMTKd%2BG%2B%2BoyM8cc9fb6VVle5CTM%2BzvhPdgXEqhozv3RrlWcMMDH4YHHX0FXor%2B3lkeaeQzJJlH38sCVC8E98kDPYZoPhu7hgm2Iyb8bweARzwf896z7jS7wFcxEBSSyg9MDj64xVNphys526doJriObIeMlXUOQGwcY46jJB7ZHetjwzrc8dykkz70jKttI5bBGAMfl%2BNVptDuJWVyhI6EkcntmpIdPKJ5cKyIufmc8bvT%2BdaynBxsQoTUrs3IdSltNZvZGkyZZSV8r5gwJyGI9gemOOPSuv0nVEZwssrEvhQzt97KgkE5%2FwA5rz6GxmW7RpA25eCw6rWnEJXTapCLt2Fz1X%2FPSsXqaLQ9ds7u3uNOZtkexGCZbHzAjJHX6H%2F61VY54klJt7SCMJ%2FcQfT0ri7LWTYFmdmYNlnOMAL%2BJwBz%2FwDW5rqLCZZrNZl%2B68J5z7cUQbTKlGMoO5bbULmQYMmF9ATimG6mHR1GfRQKqNcQR%2F6yeJcf3nApq3tpJwlzC59FcGo5pPqdip0o9EXDcztgGZ%2BPeo2kZursfxqE3EUZwS5%2F3UY%2FyFR%2Fa4s%2FcufwtpP%2FAImizHzwXVFtSDwRmlwvoPyqul3GWCLFOWPYxlf54qxul%2F59Jv8AvpP%2FAIqnyy7C9tT%2FAJkM8Sgf21d4HW4l%2FwDRjVk8AVseIblDrV%2BjWls5S5lAd03N98%2Bpqgg%2F0aSRUjUhlHyxqOufb2qZqLk9SIOcYLT8f%2BAR6e6%2FasFgBsfv%2Fsmqsc8JJxMhPs2a0IL%2B5iYhGRfpGv8AhTZbudxhpMg%2BwFK8bWKtUvfQqNKpxgSn%2FdjY5%2FSr1mrywXAWGbLRgKDGwJO4eop10zxCApKwJhViVbHPNQLc3EikNPK2TyC55p%2B6mTapOO6OR8RJdorJJG5hL7gABuj9eOw9PQH8p%2FCGlm%2Bni2TBBbOzNtb74OAP5cg9eDVbxQjPMZVkYDhHGMluBz%2BRArr%2FAAHbww2DrEvBb72PvD29O9arRHG9Zam7P5CqkEMRmkIwFUDj%2FCr2naGscYaf55DyfQGr1tAkZY7fmPfvVhXxxnpUI39DKuNIjkGwj5Qc81Wbw%2FAV%2B4n4CugDhj0%2FSg47UpFJnMt4bgdCpjAyOmKpjwpGkp2rtLDG4D9a7DjFPQLuGRkd6mw7nI%2F8I1DIojlDbR0HH%2BFc54q0abTLY3VquY%2BhXbkD8Pzr1KaNMcdcdKy9Xt1udNmiZd2UJ6elNaMmSTR4Eiy6lcOgYRxuW3tnAA56DueTivRtLdf7LhCxwlWj27lz8y%2Fw56dsVxlxoYGsPArlYHl%2BZjGpyucDBHHb%2FwCua7W1jjtbWOKNlVAoAHStJSa2Jo01L4kXFuPL4jjjT%2FdB4pRcSg5DAH%2FdB%2FnVQyxDOZkH%2FAhSi8tR1uoR9XAqOeXc6PZUl0Rp%2BY7WiyFvnL7c47AVEZZA2fMbPsaSSe3j0%2B2c3MW1ix3bwAenSqrX1kT%2FAMfkGfaQVUm7kUVCzem7%2FMu%2FaZj1mlx7uaTzn%2F56P%2BdVVubXqJ0I9mzTvtdr%2FwA91qbM15oLqi14gt4xrt%2BXvEBa5lbaYjx8544NVAbdbdohdrywOfLbsD%2FjVrxPHIfEF2yxSsDNIAQhIzvPtWIu58BUkJzjhD%2FhTlzKTtEwpuDgrz%2FFFtIA27ZcqSFLHEZ7U3bFxuupCe%2ByIf1p8BaE3AaOUEQkf6tu%2FwCFUvMG77koz0zE3%2BFL3rfCUuRt%2B%2F8AiX7iS1neIi5u1VECkBE5x9aYkEMkTut1dLsxkbI%2Bc9O1Uw%2F%2BxJ%2F37b%2FCrkJ2WMzsGUF1A3IRngk0Jyb1X4CkoJaS%2FE5DX%2FKfVREsjOAdjeZxkHHp7%2Bld34ReI2JaIDGcfTmvPtcLHWj5bBywXZj0xXovhaza30W3R%2F4l3EH3qpPRHMl77OqjYYFToAelU1vbWBB5s6ZxnrVafxDptuiSG6jVD3LDj604xNGzcEan%2FwCvRtA461h2%2FiGzucGC4Vw3901oR3in%2BLPalKxaV0XMYOKFTnIxVZrseuaQX0YI%2BYA%2BhNSOxYkzkD061SvW%2FdsBzkdKtq6yrncOf1qpdDGR7VMhxPOJFWTU4y6h0jYp0yMD7v5ZNbUawfYhKLSDdv28p7ZrDtmB1XUEBOElIOfqa2VO2zRcj5nLY79MVpGTVzN04tK66i5h%2FwCfS3H0Uj%2BtSeZA23fZwNjpnd%2FjUHT0pRk0ueXc6PYUv5UXjex7FVbWIY%2F2nP5c0LfugG2OMYOc7c%2FzqoBxS7TS55dw9hT%2FAJUWJLuWYkvgn8f8atbF%2Fur%2BtZwQ1a8uf%2B6v%2FfZrWm5O%2Bpy4qMIWskZGuzSDX9RKyOM3UvRiP4zUSSSCwWTzH3GUgHcc9Kn11Lf%2B27zbbphpWcsGYEknPY%2B9UzNbrbiE2zbQ275Z3Bz9cmsWkm9ToTk4r3R63l0oOLmYfRzSm7uH5aeUn1LmoCkTRGSMSoqkA%2FvN2c59fpTEKbSftE5PbKIR%2FSlZ9yufvH8i%2FfTSi7AMr52J1b1UZqKGS4adI4pdruwUHgcn3qveTrLcb45HBKqCHQY4GOxpbMTPcx7jHtZio%2BUgk4wOfqRVNO7aZEZRSScfwK3ivw9eW%2Fl3zyJMBHtzGSe4xxx6nmu2t42h0S3CghhEvI%2Blc7axx2XhJIric75g4VHJJDZOMf4V3EEYe3AIGMcCi90Y1I8s3Y8o127gtJHy0pY5J%2FeHAznkn8TXMXt8FaMS2cxZyNh3kg5OB1%2Blevaj4ct5JmuEhVpexfnFcnqunPG5J01SyjG9FU4HPtmri19ozlGX2TmNJ1KKC5j3%2BZE7Ybax3A59D9K9V0iSS5hRlJZT3rze10C71C%2FhL2rIiEAc9AP0Ar1XwxZCyg8lugPA9KTWppBtDNYd7K2MpcKFGSTxivKdV8VSXErKt%2FIBuyTCCRgd%2B3H5ivWvF%2BnjUdPa3BKkoSNvODjj615CPDnks9vc20zxgkb8bupBz09hUxSvqXU5mtDY0PxNcp%2B6%2FtUvjosqnCjp1zx1%2FWu20vU7%2Bc%2BXcpGULcMrdB6dK5i28OWN5ZQ24Ey%2BVko4TawJ65OOfp0rr9A0qSwtRHK%2B%2FaMZ9RSm1fQUE0tTm7ZVhu9QdoYnL3cn3xk4Bx%2FjVhXgLKWtY22jAU%2Fd%2FIVJf3UMMLWu9FC3MrBnbBJLFj%2BHzY%2FCqaSI33XVvoaanLozX2NPqtSwotA277FDu9QBUnk2Mn%2BstAcjBI28%2FmtVxmplzt6U%2FaS7h9XpPoPlsNMEARdOhO%2F%2BIgbvzAHemwWmmQxhWsFdu7Fl%2FwDiakYkbAf7vr7mm45NVKcrmdKhTcbtd%2FzFaHT%2BfLshHn%2B6R%2FhT8w%2F9Nv8Av6aiwaTBpe0l3NHhqT6FHUJ4p72WZL63bc33Skgx%2BOKia0utiMfsiq43KWulXcPUZFUZtKv4GJktZhzz8pP8qmvwXgsVDAlINpGeh3Mf61PduJCeyjP8jRWxvhZOqWckpaRT%2B6KsOA3cH3qg%2FmwDE1tPGfeMn%2BWapiKQdVP5VZ08ul9CvzBWYBh6jNJOLsrFNVIpu%2F4f8EaW3uGCvj1KMP6VaJVIIvnXJyQM1TudRu1uZQLmbaHOFLkgc%2BlNk1i7dSrtEVPYwJ%2FhR7iugbqOz0Oym0xdVTTbkKGgG1pgOmc5P65Fb%2BnziS2RuxAIrB8I6oraIykRo0TsmFGPlPP8yau2NzGq%2BWuAF4A7elXpbQzk3fU3WCuOf1qlNYxucuOKabwLgluKz7%2FWkiyobpVcysNIvJaQR8Kox9Ks2qhZwQOPpWLYXUcqmWWTBJ7nGK1Le%2Ftzv2yLuA9aate7HYtXgV5BkDGKr%2FYonOSo3fTrUks8TxAsw3ZIx61k3Or%2FAGO8jTOUYdfSspWTuaW0NaKzRTwoqZowqcDH0ptvepMgb%2BVOnlXHBFJ2JOC1d421KZViRghIBOcgk5P6k1Te0iErLvdk3ZIOOT%2BIqXUHji1maOWVAzSbgu4ZIPI4%2BhpXbdNIR3Y1anJRJdKnOpquhEdO00r%2FAMe8u89TvX%2F4mnpY2cWPLNwnHPI6%2Fhil%2BbNPGaXtZFfVqXRfiySaCCVFAu7qMqMDYmO%2Befn569arLbyxk7b13443qR%2F7Man5pMnPen7RgsPFbN%2FeyKSO7yBHecbcnAHGOvVaj23n%2FQR%2F8cH%2FAMTWnaLuFwx6CB%2FxPFU803KyTsiIUm5yXM9PMo6peXNtfGOC5lVRHHkI5APyD0qoNZvlHMocf9NEVs%2FmKV9cinI%2B06bA2AAPKZo%2BB%2BJq3IuhGKB5jfQNMm8BNrqoyRyTg9j2qNW24yDRJKcPyY21uY5rO4nltoS8eMFVxnJxzg0tveWayiRoJVYc5WU4z9MVLBa6eYZ4LXVLeQSbeZMxbcH1bANRjw%2FfPE0sCpcIP4oHDj8%2BlX%2B80tqQvY682n3oqTCxkZnE1yCTnG1cU46dBJAJhexIhbaN6HJP16Ux9Jv0Yj7JKT6Kuf5VFfq0GlwRSApKZnOxuD0HapV9eaJb5dOSX43L1lYTW93G8NxEykjcsc4JYemAa1tPubiBnWdMEu%2BABggZJ6fTFcOWYDpWzoMsXkzqU%2Feo28HPJGPz7fTmmpJqyRFSEl7zdzp7q%2BcR%2FLyT096xxuuLgebKeDggA8f1NW0kNxEy4%2BbHBz0NZssN95ubWNXIJDK7YB6%2FX%2FJqUtdRKTtoX9YtrO5sWhEjbhwdpx%2BFY%2BmSz2LMImnMfTEjE7Tx0J%2FlVmbVLlUMcmjXh2jBGA4P5ZP%2FAOuootXgjjMVxp1yyucsx3A5Prn6Vq4msYykacuopeNFFLcyqikcxuU3En1BGRWreQ29xaxiKRVZeFLE4%2FOsK0vo8RrDptyq7t3CMx%2FH5cVb1C4umt8W9hcFOAzOQB68dSTx1xWcomj5orU2LGeW2bypeD14Oav3l%2F5Fm8p52qTjNZNqmIxM5JIABz3%2FAM8Vm63O72ikZUO%2BFCHLd85H0x%2Bf5ZpXZm5dzN%2B3szs8sUUjt95iCCfyIp32izlfdNp8TdvlOP55qiY2QAt8uf73FOCt1xWvPND9lSl0RoSS2DoBFbzW5HeOUH9ABVq1tracBbe4u3lPaQ4A%2FEMf5VjDcMcGtfRZNhkJGDgYz9aqE23ZmdalGMHKOnzY1jtmZPt5jVSV5XOTn12nipVYsdqXsDHPBdcDH47azp5N0zsO5JqIuaTmuyNFRfST%2B83Ua7jglXZFMWXCmBlJPTPAJNVvJ1T%2FAKBc%2FwD49%2F8AE1lhhxxTt6%2B9Nzi90SqM4ttT38hs%2BkQrOYheQBx2kyvHrk8VNqek3JtrR4o98UduAzqQRnJ9%2BaZrNvKL%2BQtG4AAByCMYAHNZzO8RDxuyMOjKcGolZNpoKalJKSkQNGyZDZU%2BjDB%2FWruh701q2wSvzc%2FlVyzu7mSyupZJPNZAoDSjeeT71FbaikNwkhs4wyHJaIlGP16j9KUVFNO45Oo01Yhh1bULYkRXk6r%2FAHRIcfl0q43iG9lUJcCCdB%2FC8KjP1K4JqB30xvm3XUJz93arj8%2Bv6U4WEckPnRXULKW2jdlBn6n%2FAAqkpfZYpOH24%2FgSWtxY3l0kMul26mVgoMPyYz3%2FAMmoLifS7YO1it1DcxkgDOUb65Of%2Fr4qxZadcQ3kM4TdEjgmRCGUfjWFOjoS8isgJ6uCAfzptzSu0ZqNKUrJ%2FidBp84lhWQStjCjJ6kge3etuyKBsA89a5l45oNJgvYACjIBKvJPynGf05rQ0zUY5gpyV387SeTyeeKGupCdnY3bi4VG%2BZcY74%2FWqn9rTox2pvUdSwzj0zmrghjni%2BdgzZycHj8axJrHy75WDYKnhv7v%2BTS5mjeM5LY6KzvxcjDkFeo2ng1cmZWjxsGAeAao6ZZMkUeZAQAFAz%2Fn3qe%2FmjtomO%2FBAHT69qiTbLcm9yjcFikLAHy9wzjHIyOv5n8K5C61KU6nNJDKfLRikeQrZHGT07kfpWunn6xepBA7LBGcTMp25GPug%2Fz544%2FCpqug3NreSFYQYmO%2BPy242nnvjp0%2BoNXGL6GLlHeWwljfzXc6QOI8sTllQA4x7UkuoQGQrNYxOqkj5WOf%2FHs1HpkTW2pRyPHINvYofp16HrWfLuaVyOeecVo5TUSYwpSm9jV%2B06XIcPBdQj%2FYfd%2FLbVi3ubFGJjvJI%2FaROv5Z%2FnWASwPQijcec1HtGauhBq2v3m%2B1l5y77e7tXA654P6kVG%2BnXYOEgVxjkqSR%2BgNYnmYP41L9plP%2FAC1f0%2B8aOaL3QezmtpFxw0cmxoJd3fGP6kGpcj%2Fng3%2FfBq3FLJDpiXKk7y20s3PHpz9M1D%2Fatx%2FeT%2Fv2v%2BFW4wJjKs72aMgavf2yokd3MEXohbcv%2FfJ4rQur9GgtmuLKCSSaIO8gBRzyRwRwOAO1Qai%2BnR6lJbvZYjULtaFyMZAJ%2BU8Hr7VNPHZX0cAt76NWijEaxz%2FITgk5Lfd71CTV0mJuMrSlH%2BvkOjvtONrPEqTW%2FmlcAgSAY9Twf0qobbMoME8VwO4B2H8mxmmzabd267pIXCEZDAZB%2BnrRpi41aAH%2BFxkfrS95tKSKTjZuEiKaCfABglVjzgoc1cdSuh2w%2FwCmj5HvxWXFcXFu58uWRM9drEZqw%2BpvKoW4jjlwMAsuMe4xjmiLhr0HJVNOthisyMGUlWHQg4NTrql6vHns4PH7wB%2F55pkH2e6njjj86EngncH3H8eg%2FOuv8P8Age%2Bmu7bUbho47GORZAJUIeQA52hT646nAwcjNVTpTk%2FcIqVoRX7xF%2B%2F0%2BK1c2OEIiRFfaMAttBY49yc4964O%2Fsp9EvHuLck2zHJAXOzPT%2Bten%2BJIzDPHe%2F8ALN8RSf7Lfwnp36ZJ7KO9c3eRCVNrDIrWtBwm0zmpyU4Jo5608Qgoq%2FLtyBjjn%2F8AV%2Fn0q7FrME4Bdx5n3cCsHUNAjRy8AMR9F4H1plvo9w7DZOVA9hx%2FnrWDsbRkzsjraRQlsjjpyMZ5%2BvtWY0tx4hdEhdo7ZThph1PsPb3%2BlQ2nh63%2BZrmSSYE52lsD9K3oZIII8RhVUHnHSp9DRXe5f0%2B2gsLbZENqgcsep%2BtP8W6XPB4ZstShd0lgLCUj5W2O2QD34JAx%2FtH3qt4fD%2BJtYMMWTp1owa4kI4lbqIwf1Ptxj5q9FvLeK8sprWUHypEaNsHBwQQf510UaTabZhWrKMkl0PDYtWvEBBlDj%2Fpoob%2BdTf2okihZ7K3kHc4IJ%2FXH6Uuq%2BHNT0SVhdWz%2BWDhZoxuR%2BvQjnseCAayyvzbf4vTvUNzjub8tGe1maw%2FsKcfPb3FsfSM5H6Ff5VIujWlwBNBessXfeAADz1yM%2FrWMMg1rRSf8SaVST2xz05H%2BJojLm3RNSnyJcra1E%2F4RyeUn7NPDcN2WMgn8cE%2FyqrNot%2FbELJbkNnnnGP8AvrFVyxBqxBqV5bxeXDdTRx5%2B4shC%2FlU3g%2BhfJVW0vvRoPG62CwJ84XkkjBHHPt3x17VnbfcfmKuprlyGUyRwShezxAZ%2BpGCfzqz%2FAMJEf%2BgbZf8AkT%2F4qrvBma9rDSyZg3iW17cm4hu0DtjMcvyEYGOvT9aoXNrcRAF4XVeuccfn0pk9rPGVLwuAehxkH8RxVua7u7KKzEU0iZi3Fex%2BZuoPBrJq9%2BZWNU7WUHdFq1nlg0G6ZJJEYSqEKtgqe%2F8AKorfXLpNvmLDOF6eYnI98jBzU1hNNqrCxTTHuZJDnba5Uk%2F3iBkcZ9h6122lfCXdibU72SGEr%2FqVC%2BYD7tyvp0B%2BtbQpznb2ZjOpThf2q3ODR7S7lWKNLmOeRgqIv73cxOAB369gDXZaT8L7262z6lcJa25wQFU%2BYw44wfu8E9eQe1eg6XomjaAW%2Fs3T40lOR5jZLkdxuOTjjp0q%2FJI7EFmyx6AdBXdSwN9ahxVMY7%2FurpGLpXhnQ9DVPsVmsk64P2icb3z6jPTr2ArRnfI6k4FKxw2M%2FWopOQa9CNOMFaKOKU3J3k7lS8tor61kt513RTL5bjofqD2I45rzC0vpYbm50y7b%2FSrWVonJXG7B4YA9iMEfUV6k0oj3lhwvJ%2BleK%2BNr0Q%2BMoNXt4ZooNRgyxflfNRmQgHp91VOP9oHvXFjIJ2Z0YWbTsbsxV%2BMUkWyNcjFZ0F158asD1%2FGmzySAEE15jgegpWLt1qccCMSwyPSsRJ9T8S6pFpWmq2%2BU%2FMeyL3Y%2Bw%2F8ArdTVOaO5vLlILdXkmkbaiL1JP1r2PwFoel6JZTRwSGW%2BJBuJGXBb0x%2Fs1pCldmVStZWN7w%2Fodt4e0aHT7QNsjHLMcs7Hkk%2B5NXc8c%2FWiScbgBVa6kO0RD7x%2BXNdiSWiOS92PBD2xEyiSJlG5X5yDxWNqPgvTb0O9sPIdv7oyv4r%2FAIYrZkAEMijoF4qSPJ8t1JBK4z700k9xXseQa3oU2iyhr%2BwlS3HCz27b4yf0x%2BIqkk0ElgYI7yIFjx5nBHPfpXt6yRyq6TKMcq3HBHuK5XXPhvpepBprIfYpjyDEMxnp1XtwO2Ovesp4eS1jqdMK0HZSujzR9NuSpeNY5UHeN85%2Fp%2BtV3t5owN8Eq%2F8AAcgfUjIqfWvDereHJg11ERGThLiIkoT6Z7HrwcdDVCPVb6PP%2BkM2ePnAb9TXFJJO0lY7oubV4yTHqyvnY6tg84Oal8uT%2B6asWt2mpP5NxZwMQOGC%2FwCOa3f7Jh%2F55r%2BVaQppq6ZjVxDg7SRx099cW1wgt5mVfKjyvVSdo6g8GvQtG%2BHc2qWsN3r3l225QUitf9YQST838IPQ8Z69jWX8O9FfV75tUv40dLRgImAHzyYzyR12jB6dSPSvYTtjjCACuvD4dSXPLZ9DlxGJtaMN11Kml6bZaPbm30y0itYc%2FMVGWY%2B5PJ%2FHNTsfNbAJwvUmkeQhNq9%2BBQQERYx1PWvRjFR0RwOTbuwVQoLkUwc5c9TxSyt0QUwt%2FD6VaERycH61CW4qaf7gI7VVZu1UIdIimMOSB2Oa8tvLS%2BfxbqWiy2oudDmYFuQDA20EMPQ%2Fn27Aiuw8SaONYutNdp2K2k5l%2BzbOJD8uDu%2Fhxg88nBOMHmpYtP8ALuZ55iJJp2DsxXHOAMY%2FCsKseYuOmp5lqGmT%2BHNQ%2BzyM7Wz8wzFfvDuD23Dv9Qe9RNI0ue%2FbFXvGbXlvrZgmaVrKZBcQ5jG2JgNpUOeQDgEjkZI9cjMs5yyjPzenbivMq0nCR6VGfPE7Hwz4YZNIk1l18u7mYpA7DJij6EgMOrc88%2FLjHDEHY0aYweJYI1%2BbzEZGP4Z%2FmK3d1pbeF7Z42aWEwqsKk5JAGBn6d65%2FSra4h1CLU5EYrG%2BTj0PX9K0UbOxzSd7tnbGMAM5b5V61BEGknLt2%2Fma5rwdpmvadFeR61qi33nyLMhVyyr8uCQTjAbrtxgcEdTXUx8L9TmrsRclfkMP9ipbcYhAPamRrvkI7Y5qSDpWiWghNoW7YH7rjmnK0kE%2B0NwwyM8jNLKv75WpbofIjjrWqRLJJFt7qJ4riNNkgKurgFWHOQR9K4rxB8L9PvVefTG%2BxT8ttHzRMeT06ryR04AHSu1RlYAn%2BKnRMyFlVuVPT1FTUpxmrNFwqyg7xZ4Tb6LfaNqz21%2FbNG4UlSfusPUHof8iu%2B8kf3RXZ31hZ6pbmC5iBBORn19Qe3Wm%2F8IvZ%2FwB%2BX%2Fvof4VzKjyaI0qVXVfMzA8MWK6NpMFiyoJUiDTsuMbzjdjjkZ4HsBW28heYYyRjuMcVcP8ArW%2Bv9ac%2F%2Bub612wkopJI5OUpdJdzdBSgEZkbqelWJOlMl%2F1Y%2BlVz3CxWXLOWNRsSr7qtJUM%2FetE7iaI2OR7VUdSrYq0fuj6VDN0WmwSKzA7v61DIMHLdPX0%2Fz%2FnpVh%2FviopOh%2BlQyjlfHWjx6loLSGKJpIMuC6BiikfP7%2FdyQB1Kr7VyvgzQ59V1a5F3ZSWtpbPl42Urz1Cc%2BxySD0I5GRXf%2BJf%2BRbvf%2BvNv%2FQXrD%2BGX%2FIgj%2Fr4f%2BZqa8IuKk0VSm47HSTDz3jhBPkxDCjpgfSr8OMqFACL2qlF99vqKvQ%2FcFckdXdmhYiARMKAAT0AqccnAqJOi1PD981dtSblmNQqmiP5SBQvUfWgfe%2FGrFcldcjnqOaS4H7hcdM1L%2FEPpUU3%2FAB6r9apCYsYG1TSs4R1k9Dg%2FSkT%2FAFf5VHN9w%2FUUwLkRHmMnWr%2Bxf7tZUf8Ar%2FxFa9Y1Ckf%2F2Q%3D%3D%0AREV%3A2023-01-20T17%3A36%3A51%2B01%3A00%0AEND%3AVCARD");
    }

    const instagramHandler = () => {
        window.location = "instagram://user?username=emil.triest";
        window.location = "https://instagram.com/emil.triest";
    }

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
                                    icon={<IconBrandSnapchat color="black" style={{width: "10vw", fill: "white"}}/>}
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


                </BackgroundImage>
            </Paper>

        </>
    );
}
