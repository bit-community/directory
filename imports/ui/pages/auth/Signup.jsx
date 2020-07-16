import React from 'react';
import * as Validator from '/imports/lib/validator';
import { Link, useHistory } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Box, useToast } from '@chakra-ui/core';
import { Formik } from 'formik';
import { InputField, FormikForm, PageHeader, BorderedDesktopLayout, PasswordField, } from '/imports/ui/components';
import path from '../../path';
const Signup = () => {
    const history = useHistory();
    const toast = useToast();
    const authInit = {
        fullname: "",
        username: "",
        password: "",
    };
    const handleFormSubmit = async (values) => {
        console.log(values);
        const options = values;
        await Accounts.createUser({
            email: options.username,
            password: options.password,
            profile: {
                name: options.fullname
            }
        }, (error) => {
            if (error) {
                console.log(error.message);
                return alert(error.message);
            }
            else {
                toast({
                    title: "Signup successful.",
                    description: "We've created your account now add a profile.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                history.push(path.onboarding + '/profile');
            }
        });
    };
    return (<Box margin="auto" textAlign="center">
            <PageHeader useHeader useTitle title="BiT Directory" subTitle="We're in private Beta, Please fill the form below to begin creating your profile"/>
            <BorderedDesktopLayout marTop="0" padTop="1rem" textAlign="left">

                <Formik initialValues={authInit} onSubmit={(values, actions) => {
        setTimeout(() => {
            handleFormSubmit(values);
            actions.setSubmitting(false);
        }, 300);
    }}>
                    {(props) => (<FormikForm mb="2" withIcon isLoading={props.isSubmitting} analyticName="Signup Form" formProps={props} buttonName="Signup">
                            <InputField label="Your Full Name" placeholder="enter your name" name="fullname" validate={Validator.isRequired}/>
                            <InputField label="Your Email" placeholder="enter an email address" name="username" validate={Validator.isEmail}/>
                            <PasswordField label="Your Password" placeholder="set a password" name="password" validate={Validator.isRequired}/>
                        </FormikForm>)}

                </Formik>
                <Link to={path.auth.loginRoute}>Already have an account, LogIn</Link>
            </BorderedDesktopLayout>
        </Box>);
};
export default Signup;
