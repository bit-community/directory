
import React from 'react';
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { Stack, Text, Box, Flex } from "@chakra-ui/core";
import { LinkButton } from '/imports/ui/components'


import { withTracker } from 'meteor/react-meteor-data';
import { PageHeader } from '/imports/ui/components'

//imports for API call
import { Meteor } from 'meteor/meteor'
import { Profile } from '/imports/api/collections'
import path from '/imports/ui/path'


const StyledCustomers = styled.main`
  display: flex;
  flex-direction: column;
`

const LineDivider = styled.div`
    height: .8px;
    padding: 0px;
    margin: 0;
    margin-left: calc(-${ props => props.theme.custom.defaultBox});
    margin-right: calc(-${ props => props.theme.custom.defaultBox});
    background: #eee;
`


const BaddieProfile: React.FC = (props: any) => {
  const params = useParams()



  console.log(props.customer, params);
  return (
    <Box>

      <PageHeader useHeader useTitle title="Profile Details" />
      <h1>Good Ride</h1>

      <Stack spacing={3}>
        <p>{JSON.stringify(props.customer)}</p>

        {/* <Text fontSize="md"><strong>NAME: </strong>{props.customer ? props.customer.customerName : ''}</Text>
        <Text fontSize="md"><strong>ADDRESS: </strong>{props.customer ? props.customer.customerAddress : ''}</Text>
        <Text fontSize="md"><strong>EMAIL: </strong>{props.customer ? props.customer.customerEmail : ''}</Text>
      <Text fontSize="md"><strong>PHONE: </strong>{props.customer ? props.customer.customerNumber : ''}</Text> */}
      </Stack>
      <LineDivider />


      <Box mt="6">
        <strong>Baddie Info</strong>
      </Box>

    </Box>







  );
}








export default withTracker((props: any) => {
  const id = props.match.params.id;
  return {
    customer: Profile.findOne({ _id: id }),
  };
})(BaddieProfile);
