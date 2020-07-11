import React from 'react';
import * as Validator from '/imports/lib/validator'
import { Link, useHistory } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor'
import { Formik, FormikProps } from 'formik'
import { InputField, FormikForm, PageHeader, PasswordField, } from '/imports/ui/components'
import path from '../../path'



const Signup: React.FC = () => {
    const history = useHistory()

    interface AuthInterface {
        fullname: string,
        username: string,
        password: string,
        [key: string]: string
    }
    const authInit: AuthInterface = {
        fullname: "",
        username: "",
        password: "",
    }

    const handleFormSubmit = async (values: AuthInterface) => {
        console.log(values);
        const options = values
        await Accounts.createUser({
            email: options.username,
            password: options.password,
            profile: {
                name: options.fullname
            }
        }, (error) => {
            if (error) {
                console.log(error.message);
                return alert(error.message)
            }
            else {
                alert(`SIGNUP WAS SUCCESSFUL FOR ${JSON.stringify(Meteor.user())}`)
                history.push(path.onboarding)
            }
        })
    }


    return (
        <React.Fragment>
            <PageHeader useHeader useTitle title="Create an Account" subTitle="Fill the form below to create an account" />
            <Formik
                initialValues={authInit}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        handleFormSubmit(values)
                        actions.setSubmitting(false);
                    }, 300);
                }}
            >
                {(props: FormikProps<any>) => (
                    <FormikForm mb="2" withIcon isLoading={props.isSubmitting} analyticName="Signup Form" formProps={props} buttonName="Signup">
                        <InputField label="Your Full Name" placeholder="enter your name" name="fullname" validate={Validator.isRequired} />
                        <InputField label="Your Email" placeholder="enter an email address" name="username" validate={Validator.isEmail} />
                        <PasswordField label="Your Password" placeholder="set a password" name="password" validate={Validator.isRequired} />
                    </FormikForm>
                )}

            </Formik>
            <Link to={path.auth.loginRoute}>Already have an account, LogIn</Link>
        </React.Fragment>
    );
}

export default Signup