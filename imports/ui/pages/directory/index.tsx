import React from 'react';
import styled from '@emotion/styled'
import { withTracker } from 'meteor/react-meteor-data'
import { Flex, Stack, Box, Avatar, Stat, StatNumber, StatHelpText, StatGroup, Heading, Icon } from '@chakra-ui/core'
import { ActionCard, ActionCardRow, StatusText, PageHeader, BorderedDesktopLayout } from '/imports/ui/components/'
// import { greeting, formatNumber } from '/imports/lib/formatter'
// import path from '../../path'
import { Accounts } from 'meteor/accounts-base'
import { Profile } from '/imports/api/collections'
import { Loader } from '/imports/lib/loader'
import { ProfileInterface, IBreakLayout } from '/imports/api/schema'



const Dashboard = styled.main`
  display: flex;
  flex-direction: column;
`



const BreakLayout = styled.section<IBreakLayout>`
  padding: 0;
  margin-top: ${props => props.marginT ? props.marginT : '1.5rem'};
  margin-left: calc(-${ props => props.theme.custom.defaultBox});
  margin-right: calc(-${ props => props.theme.custom.defaultBox});
`

interface DirectoryProps {
  profiles: ProfileInterface[]
}

export const DirectoryPage: React.FC<DirectoryProps> = (props): JSX.Element => {


  const { profiles } = props

  if (!props.profiles || props.profiles.length === 0) {
    return (
      <Flex align="center" justify="center" margin="auto">
        <Loader />
      </Flex>
    )
  }
  return (
    <Dashboard>

      <PageHeader useHeader />
      <BorderedDesktopLayout>
        <Flex>
          <Avatar name="Helen Mwangi" src="#" />
          <Stack>
            <Heading as="h5" size="xl">Helen Ofor</Heading>
            {/* <Text>Software Engineer</Text> */}
          </Stack>
        </Flex>

        {/* <div>Welcome Home</div> */}
        <div>{JSON.stringify(profiles)}</div>

      </BorderedDesktopLayout>
    </Dashboard>


  )
}



export default withTracker(() => {
  // const id: string | null = Accounts.userId()

  return {
    user: Accounts.user(),
    profileCount: Profile.find().count(),
    profiles: Profile.find({}).fetch(),
    // payments: Profile.find({}, { fields: { amountPaid: 1, amountDue: 1 } }).fetch(), // select Query

  };
})(DirectoryPage);







