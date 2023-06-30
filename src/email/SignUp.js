import * as React from 'react';
import { Html } from '@react-email/html';
import { Button } from '@react-email/button';


// TODO: make pretty
export function SignUpEmail(props) {
    const { url } = props;

    return (
        <Html lang="en">
            <h1>Link is valid for 15 minutes</h1>
            <Button href={url}>Click me</Button>
        </Html>
    );
}
