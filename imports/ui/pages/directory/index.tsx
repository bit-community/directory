import React from 'react';
import styled from '@emotion/styled'
import { withTracker } from 'meteor/react-meteor-data'
import { Flex, Stack, Box, Text, Avatar, Tag, TagLabel, TagIcon, Heading, Icon } from '@chakra-ui/core'
import { ActionCard, ActionCardRow, StatusText, PageHeader, BorderedDesktopLayout } from '/imports/ui/components/'
// import { greeting, formatNumber } from '/imports/lib/formatter'
// import path from '../../path'
import { Accounts } from 'meteor/accounts-base'
import { Profile } from '/imports/api/collections'
import { Loader } from '/imports/lib/loader'
import { ProfileInterface, IBreakLayout } from '/imports/api/schema'



const Wrapper = styled.main`
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
    <Wrapper>

      <PageHeader useHeader />
      <BorderedDesktopLayout marTop="0" padTop="1rem">
        <Heading as="h1" size="lg">Find a woman of color to connect with, hire, or mentor</Heading>

        <Flex flexDirection="column" maxHeight="100px" position="relative">
          <Flex justifyContent="space-between">
            <Avatar name="Helen Mwangi" src="#" size="sm" />
            <Stack>
              <Heading as="h5" size="sm" margin="0" lineHeight="100%">Helen Ofor</Heading>
              <Text size="sm" margin="0" lineHeight="12px">Software Engineer</Text>
            </Stack>
          </Flex>

          {/* ==Layout Skills Tag == */}
          <Stack spacing={2} isInline>
            <Tag variantColor="blue" border="1px solid">
              <TagLabel>UX Designer</TagLabel>
              <TagIcon icon="check" size="12px" />
            </Tag>
          </Stack>
          {/* ==Layout Skills Tag == */}

        </Flex>

        {/* <div>Welcome Home</div> */}
        {/* <div>{JSON.stringify(profiles)}</div> */}

      </BorderedDesktopLayout>
    </Wrapper>


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







