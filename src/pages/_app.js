import {AppProps} from 'next/app';
import Head from 'next/head';
import {MantineProvider} from '@mantine/core';
import {useViewportSize} from "@mantine/hooks";

export default function App(props) {
    const {Component, pageProps} = props;

    const {height, width} = useViewportSize();
    const isMobile = height > width;

    return (
        <>
            <Head>
                <title>Page title</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"/>
            </Head>

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    /** Put your mantine theme override here */
                    colorScheme: 'light',
                }}
            >
                <Component {...pageProps} isMobile={isMobile} userAgentHeight={height} userAgentWidth={width}/>
            </MantineProvider>
        </>
    );
}
