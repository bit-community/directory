import React from 'react'
import styled from '@emotion/styled'
import { withTracker } from 'meteor/react-meteor-data'
import {
  Flex,
  Stack,
  Box,
  Input,
  Avatar,
  Tag,
  Text,
  TagLabel,
  TagIcon,
  InputGroup,
  InputLeftElement,
  Heading,
  Icon,
} from '@chakra-ui/core'
import {
  ActionButton,
  PageHeader,
  BorderedDesktopLayout,
  InputField,
} from '/imports/ui/components/'
// import { greeting, formatNumber } from '/imports/lib/formatter'
import path from '/imports/ui/path'
import { Accounts } from 'meteor/accounts-base'
import { Profile } from '/imports/api/collections'
import { Loader } from '/imports/lib/loader'
import { ProfileInterface } from '/imports/api/schema'
import theme from '/imports/lib/theme'
import { useHistory } from 'react-router-dom'

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`

const CardWrapper = styled(Flex)`
  border: 1px solid;
  width: 100%;
  max-width: 310px;
  margin: 10px;
  margin-right: 0;
  border-bottom-width: 4px;
  border-radius: 4px;
  transition: ease-in-out 0.2s;
  :hover {
    opacity: 0.9;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: ${theme.custom.defaultShadow};
  }
`

export const StatusText = styled(Text) <{ fsize?: string }>`
  margin: 0;
  padding: 0;
  font-size: ${(props) => (props.fsize ? props.fsize : '.65rem')};
  line-height: 90%;
`
type TProfileProps = Partial<ProfileInterface>

export const ProfileCard = (props: TProfileProps): JSX.Element => {
  const {
    fullName,
    _id,
    skills,
    yearsOfExperience,
    cityOrState,
    countryOfResidence,
    professionalTitle,
    profilePhoto,
  } = props
  const history = useHistory()

  const viewProfile = (id: string | undefined) => {
    history.push(path.baddie + '/' + id)
  }
  console.log(professionalTitle)

  return (
    <CardWrapper
      flexDirection="column"
      onClick={() => viewProfile(_id)}
      justifyContent="space-between"
      position="relative"
      p={4}
    >
      <Flex justifyContent="flex-start" pb="3" alignItems="flex-start">
        <Avatar name={fullName} src={profilePhoto} size="md" />
        <Stack justifyContent="flex-start" pl={2}>
          <Heading as="h5" size="sm" margin="0" mb="0" lineHeight="10px">
            {fullName}
          </Heading>
          <StatusText margin="0" fsize="13px" lineHeight="6px">
            {' '}
            {professionalTitle}{' '}
          </StatusText>
          <StatusText fsize="11px">{yearsOfExperience} +years Experience</StatusText>
          <StatusText fsize="11px" textTransform="uppercase">
            {cityOrState + ', ' + countryOfResidence}
          </StatusText>
        </Stack>
      </Flex>

      {/* ==Layout Skills Tag == */}
      <Stack spacing={2} isInline pt={2} mb={4}>
        {Array.isArray(skills) ? (
          skills.map((val: string, index: number) => {
            return (
              <Tag key={[index, val].join('-')} variantColor="blue" border="1px solid" size="sm">
                <TagIcon icon="at-sign" size="12px" />
                <TagLabel>{val}</TagLabel>
              </Tag>
            )
          })
        ) : (
            <Tag variantColor="blue" border="1px solid" size="sm">
              <TagIcon icon="at-sign" size="12px" />
              <TagLabel>{skills}</TagLabel>
            </Tag>
          )}
      </Stack>
      {/* ==Layout Skills Tag == */}
      <ActionButton
        buttonName="View Profile"
        analyticName="Click View Profile"
        handleAction={() => viewProfile(_id)}
      />
    </CardWrapper>
  )
}


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
    <Box>
      <PageHeader useHeader />
      <Wrapper>
        <Heading as="h1" size="xl">
          Find a woman of color to connect with, hire, or mentor
        </Heading>
        <InputGroup color="blue.800" width="100%" maxWidth="600px" size="lg" my="5">
          <InputLeftElement children={<Icon name="search" color="blue.800" />} />
          <Input
            placeholder="Search by name or role"
            color="blue.800"
            borderRadius="1px"
            focusBorderColor="blue.800"
            borderColor="blue.800"
          />
        </InputGroup>

        <Flex width="100%" mt="10" justifyContent="flex-start" flexWrap="wrap">
          {profiles &&
            profiles.map((val, _index) => {
              return (
                <ProfileCard
                  key={val._id}
                  fullName={val.fullName}
                  profilePhoto={val.profilePhoto}
                  professionalTitle={val.professionalTitle || ''}
                  yearsOfExperience={val.yearsOfExperience}
                  professionalBio={val.professionalBio}
                  skills={val.skills}
                  _id={val._id}
                  cityOrState={val.cityOrState}
                  countryOfResidence={val.countryOfResidence}
                />
              )
            })}
        </Flex>

      </Wrapper>
    </Box>
  )
}

export default withTracker(() => {
  // const id: string | null = Accounts.userId()

  return {
    user: Accounts.user(),
    profileCount: Profile.find().count(),
    profiles: Profile.find({}).fetch(),
  }
})(DirectoryPage)
