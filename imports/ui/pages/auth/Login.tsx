import React from 'react';
import { Link } from 'react-router-dom'
import { InputGroup, Stack, Box, Input, Button, InputRightElement } from '@chakra-ui/core'
import { Meteor } from 'meteor/meteor';
import * as Analytics from '/imports/ui/analytics';
import { PageHeader, BorderedDesktopLayout } from '/imports/ui/components'
import path from '../../path'
import Path from '../../path';





const Login: React.FunctionComponent = (): JSX.Element => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    interface AuthInterface {
        username: string,
        password: string
    }
    const authInit: AuthInterface = {
        username: "",
        password: ""
    }
    const [value, setValue] = React.useState<AuthInterface>(authInit);
    const handleChange = (input: string, event: any) => {
        let updatedValue: AuthInterface = value
        switch (input) {
            case 'password':
                updatedValue['password'] = event.target.value
                break;
            case 'username':
                updatedValue['username'] = event.target.value
                break;
            default:
                updatedValue = value
                break;
        }
        setValue(Object.assign(value, updatedValue));
        console.log(value)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await Analytics.identify(value.username)
        await Analytics.track("User Login", value)
        await Meteor.loginWithPassword(value.username, value.password, (error) => {
            if (error) {
                console.log(error.message);
                return alert(error.message)
            }
            else {
                // alert(`LOGIN WAS SUCCESSFUL FOR ${JSON.stringify(Meteor.user())}`)
                window.location.replace(Path.root)
            }
        });
    }


    return (
        <Box margin="auto" textAlign="center">
            <PageHeader useHeader useTitle title="Login to your Account" subTitle="Have an account fill the form to login" />
            <BorderedDesktopLayout marTop="0" padTop="3rem">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Stack spacing="6" >
                        <Input
                            borderRadius="1px"
                            size="lg"
                            type={'email'}
                            onChange={(e: any) => handleChange('username', e)}
                            placeholder="Your Email Address"
                        />

                        <InputGroup size="lg">
                            <Input
                                borderRadius="1px"
                                pr="4.5rem"
                                size="lg"
                                onChange={(e: any) => handleChange('password', e)}
                                type={show ? "text" : "password"}
                                placeholder="Enter your password"
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>

                        <Button width="100%" borderRadius="1px" variantColor="pink" variant="outline" type="submit" size='lg'>Login</Button>
                        <Link to={path.auth.signupRoute}>Don't have an account, Create one</Link>
                    </Stack>
                </form>
            </BorderedDesktopLayout>
        </Box>
    );
}

export default Login