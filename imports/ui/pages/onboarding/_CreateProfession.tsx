import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

import { Box } from '@chakra-ui/core'
import * as Validator from '/imports/lib/validator'
import { Formik, FormikProps } from 'formik'
import { PageHeader, FormikForm, CustomerSearch, CustomerSearchField } from '/imports/ui/components'
import Path from '/imports/ui/path'

// API related imports
import { withTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Profile as Customers } from '/imports/api/collections'
import { ICustomer } from '/imports/api/schema';

type CreateProps = {
    customers: ICustomer[],
    [key: string]: any
}

const Create: React.FunctionComponent<CreateProps> = (props) => {
    const history = useHistory();
    const [list, showList] = useState(true)
    const inputArr = props.customers

    interface ICustomerInterface {
        customerName: string,
        customerAddress: string,
        customerEmail: string,
        customerNumber: string,
        name: string,
        address: string,
        select: string,
        phonenumber: string,
        [key: string]: string
    }
    const authInit: { customer: ICustomerInterface } = {
        customer: {}
    }

    const handleSubmit = async (values: ICustomerInterface) => {
        await props.updateState(values)

        console.log(values)
        history.push(`${Path.workspace.createTransaction}/item`)
    }

    // Use this function to trigger a Hide function for the Lists rendered before user begins a search
    const handleCustomerList = () => {
        console.log(list);
        showList(false)
    }




    return (
        <React.Fragment>
            <PageHeader title="Create a Transaction" subTitle="" />
            <Box py={3}>
                <Formik
                    initialValues={authInit}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            handleSubmit(values)
                            actions.setSubmitting(false);
                        }, 1000);
                    }}
                >
                    {(props: FormikProps<any>) => (
                        <FormikForm isLoading={props.isSubmitting} analyticName="Search Customer" formProps={props} buttonName="Save" withIcon>
                            <CustomerSearchField onInput={handleCustomerList} placeholder="Type to find a customer" name="customer" label="Search Customer" validate={Validator.isRequired} options={inputArr} />

                            {/* //Render a list of customers */}
                            {list &&
                                <Box pt="3">
                                    {inputArr.map((val, index) => {
                                        return (
                                            <CustomerSearch
                                                key={[val.customerName, index].join('-')}
                                                customerName={val.customerName}
                                                phoneNumber={val.phonenumber}
                                                onClick={() => handleSubmit({ customer: val })}
                                            />

                                        )
                                    })}
                                </Box>
                            }

                        </FormikForm>
                    )}

                </Formik>


            </Box>
        </React.Fragment>
    );
}




export default withTracker(() => {
    Meteor.subscribe('customers')
    return {
        customers: Customers.find().fetch()
    };
})(Create);