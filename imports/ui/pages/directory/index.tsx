import React from 'react';
import styled from '@emotion/styled'
import { withTracker } from 'meteor/react-meteor-data'
import { Flex, Stack, Box, Avatar, Stat, StatNumber, StatHelpText, StatGroup, Heading, Icon } from '@chakra-ui/core'
import { ActionCard, ActionCardRow, StatusText, PageHeader, TransactionList } from '/imports/ui/components/'
// import { greeting, formatNumber } from '/imports/lib/formatter'
// import path from '../../path'
import { Accounts } from 'meteor/accounts-base'
import { Profile } from '/imports/api/collections'
import { Loader } from '/imports/lib/loader'



const Dashboard = styled.main`
  display: flex;
  flex-direction: column;
`


interface IBreakLayout {
  marginT?: string,
  theme?: { custom: { defaultBox: string } }
}
const BreakLayout = styled.section<IBreakLayout>`
  padding: 0;
  margin-top: ${props => props.marginT ? props.marginT : '1.5rem'};
  margin-left: calc(-${ props => props.theme.custom.defaultBox});
  margin-right: calc(-${ props => props.theme.custom.defaultBox});
`



export const DashboardPage = (props): JSX.Element => {


  const { profiles } = props

  if (!props.profiles) {
    return (
      <Flex align="center" justify="center" margin="auto">
        <Loader />
      </Flex>
    )
  }
  return (
    <Dashboard>

      <PageHeader useHeader />
      <div>Welcome Home</div>
      <div>{JSON.stringify(profiles)}</div>






    </Dashboard>


  )
}



export default withTracker(() => {
  const id: string | null = Accounts.userId()

  return {
    user: Accounts.user(),
    profileCount: Profile.find().count(),
    profiles: Profile.find({}).fetch(),
    // payments: Profile.find({}, { fields: { amountPaid: 1, amountDue: 1 } }).fetch(),

  };
})(DashboardPage);







