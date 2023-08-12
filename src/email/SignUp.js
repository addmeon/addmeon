import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Section,
    Text,
    Button
} from '@react-email/components';
import * as React from 'react';


export const SignUpEmail = ({url}) => (
    <Html>
        <Head />
        <Body style={main}>
            <Container style={container}>
                <Heading style={primary}>
                    AddMeOn
                </Heading>
                <Heading style={secondary}>
                    Please click the button below to confirm your sign in
                </Heading>
                <Section style={codeContainer}>
                    <Button style={code} href={url}>Confirm</Button>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default SignUpEmail;

const main = {
    backgroundColor: '#ffffff',
    fontFamily: '"Helvetica Neue", sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #eee',
    borderRadius: '5px',
    boxShadow: '0 5px 10px rgba(20,50,70,.2)',
    marginTop: '20px',
    width: '360px',
    margin: '0 auto',
    padding: '68px 0 130px',
};

const primary = {
    color: '#000',

    fontFamily: 'HelveticaNeue-Bold',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '20px',
    marginTop: '0',
    textAlign: 'center',
};

const secondary = {
    color: '#000',
    display: 'inline-block',
    fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '24px',
    marginBottom: '0',
    marginTop: '0',
    textAlign: 'center',
};

const codeContainer = {
    background: '#FFF',
    borderRadius: '4px',
    margin: '16px auto 14px',
    verticalAlign: 'middle',
    width: '280px',
    border: '2px solid black',
};

const code = {
    color: '#000',
    display: 'inline-block',
    fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
    fontSize: '24px',
    fontWeight: 300,
    lineHeight: '28px',
    paddingBottom: '8px',
    paddingTop: '8px',
    margin: '0 auto',
    width: '100%',
    textAlign: 'center',
};

