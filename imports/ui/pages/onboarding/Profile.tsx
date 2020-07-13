import React from 'react'
import { useHistory } from 'react-router-dom';
import path from '/imports/ui/path'

import { Box } from '@chakra-ui/core'
// import { Box, Accordion, AccordionItem, AccordionHeader, AccordionPanel, Icon } from '@chakra-ui/core'
//@ts-ignore
import FileInputComponent from 'react-file-input-previews-base64'
import * as Validator from '/imports/lib/validator'
import { Formik, Field, FieldProps, FormikProps } from 'formik'

import { InputField, DesktopLayout, MultipleFileInputField, SingleFileInputField, TextAreaField, PageHeader, FormikForm, SelectField, CheckField } from '/imports/ui/components'
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
    projects: any[],
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
        history.push(`${path.onboarding}/complete`)
    }

    const skillsOption: string[] = ['Front-End', 'Full Stack', 'Sales', 'Data Analysis', 'Back-End', 'Branding', 'Graphic Design', 'Mobile Development', 'Product Management', 'Social Media Marketing', 'Systems Administration', 'UI Design', 'UX Design', 'Web Development', 'Wordpress Development', 'Branding', 'Motion Graphics/Animation', 'IT Support', 'Cybersecurity', 'Quality Assurance', 'Project Management', 'AWS', 'Email Marketing', 'SEO']





    return (
        <React.Fragment>
            <PageHeader useHeader title="Directory Profile" subTitle="Fill the form to add a your profile to our directory" />
            <Layout>
                <Box mb="5">
                    <p>Please carefully fill out the form below to apply to join the BiT Directory. You will receive an email with your access link once your profile has been approved!</p>
                </Box>

                <Formik
                    initialValues={authInit}
                    onSubmit={async (values, actions) => {
                        setTimeout(() => {
                            Meteor.call('profile.insert', values)
                            actions.setSubmitting(false);
                            handleSubmit(values)
                        }, 300);
                    }}
                >
                    {(props: FormikProps<any>) => (
                        <FormikForm isLoading={props.isSubmitting} analyticName="Directory Application" formProps={props} withIcon buttonName="Create Profile">
                            <InputField label="Full Name" placeholder="Allie Tsahey" name="fullName" validate={Validator.isRequired} />
                            <InputField label="Email Address" type="email" placeholder="allie@baddiesintech.co" name="emailAddress" validate={Validator.isEmail} />
                            <InputField label="Country of Residence" placeholder="Ghana" name="countryOfResidence" validate={Validator.isRequired} />
                            <InputField label="City /State" placeholder="Accra" name="cityOrState" validate={Validator.isRequired} />
                            <SingleFileInputField
                                name="profilePhoto"
                                label="Upload Profile Photo"
                            />
                            <InputField label="Professional Title" placeholder="Network Engineer" name="professionalTitle" validate={Validator.isRequired} />
                            <TextAreaField label="Professional Bio" placeholder="Network Engineer with 40+ years experience in ..." name="professionalBio" validate={Validator.isRequired} />
                            <InputField label="Years of Experience" placeholder="4" name="yearsOfExperience" validate={Validator.isNumeric} />
                            {/* // Move this skills to the first page of onboarding enhancement */}
                            <SelectField label="Skills" placeholder="Your Skills" name="skills" options={skillsOption} validate={Validator.isRequired} />

                            <InputField label="Website URL" type="url" placeholder="Link to portfolio" name="websiteUrl" validate={Validator.isRequired} />
                            <InputField label="Instagram Profile" type="url" placeholder="https://instagram.com/baddiesintech" name="instagramProfile" />
                            <InputField label="Twitter Profile" type="url" placeholder="https://twitter.com/baddiesintech" name="twitterProfile" />
                            <InputField label="Facebook Profile" type="url" placeholder="https://facebook.com/baddiesintech" name="facebookProfile" />

                            <Box mt="6" fontWeight="bold">Other Information</Box>
                            <MultipleFileInputField
                                name="projects"
                                label="Upload images of your portfolio (Up to 4 shots)"
                            />



                            {/* <InputField label="Project Attachments" type="file" placeholder="projects" name="projects" /> */}
                            <CheckField name="mentorshipConsent" boxLabel="Would you like to mentor other women in tech?" />
                            <CheckField name="waiverOfLiability" boxLabel="Accept our Waiver of Liability" validate={Validator.isRequired} />



                            <Box height="2rem"></Box>
                        </FormikForm>
                    )}
                </Formik>
            </Layout>

        </React.Fragment >
    );
}

export default ProfileForm