import React from 'react'
import { useHistory } from 'react-router-dom';
import path from '/imports/ui/path'

import { Box, Accordion, AccordionItem, AccordionHeader, AccordionPanel, Icon } from '@chakra-ui/core'
import * as Validator from '/imports/lib/validator'
import { Formik, FormikProps } from 'formik'

import { InputField, DesktopLayout, PageHeader, FormikForm, SelectField, CheckField } from '/imports/ui/components'
import { Meteor } from 'meteor/meteor';
import styled from '@emotion/styled'

const Layout = styled(DesktopLayout)`
    border: 2px solid;
    margin-top: -100px;
    padding-top: 100px;
    padding-bottom: 50px;
    border-bottom: 4px solid
`




interface IAuthInterface {
    fullName: string,
    emailAddress: string,
    countryOfResidence: string,
    cityOrState: string,
    profilePhoto: string,
    professionalTitle: string,
    professionalBio: string,
    yearsOfExperience: string,
    skills: string[],
    websiteUrl: string,
    instagramProfile: string,
    twitterProfile: string,
    facebookProfile: string,
    projects: string[],
    mentorshipConsent: boolean,
    waiverOfLiability: boolean
}

export interface OnboardingProps {
    data: any;
    updateState: (v: IAuthInterface) => void;
}

const ProfileForm: React.FunctionComponent<OnboardingProps> = (props) => {
    const history = useHistory()

    const authInit: IAuthInterface = {
        fullName: "",
        emailAddress: "",
        countryOfResidence: "",
        cityOrState: "",
        profilePhoto: "",
        professionalTitle: "",
        professionalBio: "",
        yearsOfExperience: "",
        skills: [],
        websiteUrl: "",
        instagramProfile: "",
        twitterProfile: "",
        facebookProfile: "",
        projects: [],
        mentorshipConsent: false,
        waiverOfLiability: false
    }



    const handleSubmit = async (value: IAuthInterface) => {
        await props.updateState(value)
        console.log(value)
        history.push(`${path.onboarding}/success`)
    }





    return (
        <React.Fragment>
            <PageHeader useHeader title="Directory Profile" subTitle="Fill the form to add a your profile to our directory" />
            <Layout>
                <Box mb="5">
                    <p>Please carefully fill out the form below to apply to join the BiT Directory. You will receive an email with your access link once your profile has been approved!</p>
                </Box>

                <Formik
                    initialValues={authInit}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            handleSubmit(values)
                            Meteor.call('profile.insert', values)
                            actions.setSubmitting(false);
                        }, 300);
                    }}
                >
                    {(props: FormikProps<any>) => (
                        <FormikForm isLoading={props.isSubmitting} analyticName="Directory Application" formProps={props} withIcon buttonName="Create Profile">
                            <InputField label="Full Name" placeholder="Allie Tsahey" name="fullName" validate={Validator.isRequired} />
                            <InputField label="Email Address" type="email" placeholder="allie@baddiesintech.co" name="emailAddress" validate={Validator.isEmail} />
                            <InputField label="Country of Residence" placeholder="Ghana" name="countryOfResidence" validate={Validator.isEmail} />
                            <InputField label="City / State" placeholder="Accra" name="cityOrState" validate={Validator.isRequired} />
                            <InputField label="Professional Title" placeholder="Accra" name="professionaTitle" validate={Validator.isRequired} />
                            <InputField label="Professional Bio" placeholder="Accra" name="professionalBio" validate={Validator.isRequired} />
                            <InputField label="Years of Experience" placeholder="Accra" name="yearsOfExperience" validate={Validator.isNumeric} />
                            <SelectField label="Skills" placeholder="Accra" name="skills" options={["UX Designer", 'Frontend Developer']} validate={Validator.isRequired} />
                            <InputField label="Website URL" type="url" placeholder="Link to portfolio" name="websiteUrl" validate={Validator.isRequired} />
                            <InputField label="Instagram Profile" type="url" placeholder="https://instagram.com/baddiesintech" name="instagramProfile" />
                            <InputField label="Twitter Profile" type="url" placeholder="https://twitter.com/baddiesintech" name="twitterProfile" />
                            <InputField label="Facebook Profile" type="url" placeholder="https://facebook.com/baddiesintech" name="facebookProfile" />

                            <Box mt="6" fontWeight="bold">Others</Box>
                            <InputField label="Profile Photo" type="file" placeholder="Accra" name="profilePhoto" />
                            <InputField label="Project Attachments" type="file" placeholder="projects" name="projects" />
                            <CheckField name="mentorshipConsent" boxLabel="Would you like to mentor other women in tech?" validate={Validator.isRequired} />
                            <CheckField name="waiverOfLiability" boxLabel="Accept our Waiver of Liability" validate={Validator.isRequired} />



                            <Box height="2rem"></Box>

                            {/* Add Accordion Section for Optional Guarantor Form */}
                            {/* <Accordion defaultIndex={3} allowToggle>
                                <AccordionItem>
                                {({ isExpanded }) => (
                                    <>
                                    <AccordionHeader>
                                    <Box flex="1" textAlign="left">Add a Guarantor</Box>
                                    <Icon size="12px" name={isExpanded ? "minus" : "add"} />
                                    </AccordionHeader>
                                    <AccordionPanel pb={8}>
                                    <InputField label="Name" placeholder="Benjamin Kwame" name="name" />
                                    <InputField label="Address" placeholder="12 Aluguntugui street" name="address" />
                                    <InputField label="Phone Number" placeholder="0244-973-237" name="phonenumber" />
                                    <InputField label="Email" placeholder="benj@getBaddies in Tech.co" name="email" />
                                    
                                    </AccordionPanel>
                                    </>
                                    )}
                                    </AccordionItem>
                                </Accordion> */}
                        </FormikForm>
                    )}
                </Formik>
            </Layout>

        </React.Fragment >
    );
}

export default ProfileForm