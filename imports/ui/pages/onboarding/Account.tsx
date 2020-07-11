import React from 'react'
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik'

import { Box, Heading, Divider } from '@chakra-ui/core'
import { FormButton, PageHeader } from '/imports/ui/components';




const WizardFormSecondPage: React.FunctionComponent = (props: any) => {
    const history = useHistory();

    const handleButton = (variable: string) => {
        formik.values.type = variable
        formik.handleSubmit()
    }

    const formik = useFormik({
        initialValues: {
            type: ''
        },
        onSubmit: async values => {
            console.log(values, "FROM FORMIK")
            await props.updateState(values)
            history.push('/onboarding/profile');
        }
    })

    // const handleSubmit = async (values) => {
    //     await props.updateState(values)
    //     history.push('/onboarding/company-setup');
    // }


    return (
        <>
            <PageHeader useHeader useTitle
                title="Profile Personalization"
                subTitle="Choose a major field" />
            <Box margin="auto" width='100%' display="flex" alignItems="center" textAlign="center" justifyContent="center">

                <Box mt="5" maxWidth="400px">
                    <FormButton handleAction={() => handleButton("business")} buttonName="Design" buttonColor="#0B69FF" color="#FFF" mb="10" />
                    <FormButton handleAction={() => handleButton("individual")} buttonName="Development" buttonColor="#0B69FF" color="#FFF" mb="10" />
                    <FormButton handleAction={() => handleButton("individual")} buttonName="Marketing" buttonColor="#0B69FF" color="#FFF" mb="10" />
                </Box>
            </Box>
        </>
    );
}

export default WizardFormSecondPage