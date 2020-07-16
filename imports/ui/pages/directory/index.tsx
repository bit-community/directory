/* eslint-disable react/no-children-prop */
import React, { ChangeEvent, useState } from 'react'
import styled from '@emotion/styled'
import { withTracker } from 'meteor/react-meteor-data'
import Fuse from 'fuse.js'
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
import { ActionButton, PageHeader } from '/imports/ui/components/'
import path from '/imports/ui/path'
import { Accounts } from 'meteor/accounts-base'
import { Profile } from '/imports/api/collections'
import { Loader } from '/imports/lib/loader'
import { ProfileInterface } from '/imports/api/schema'
import theme from '/imports/lib/theme'
import { useHistory } from 'react-router-dom'
import FlagIcon from '/imports/ui/components/FlagIcon'
import { getCode } from '/imports/lib/countriesList'

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
  margin: 7px;
  border-radius: 4px;
  transition: ease-in-out 0.2s;
  border: 1px solid rgba(41, 63, 88, 0.6);
  background-color: #f2f3fc;
  :hover {
    opacity: 0.9;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: ${theme.custom.defaultShadow};
  }
`

export const StatusText = styled(Text)<{ fsize?: string; noMargin?: boolean }>`
  margin: ${(props) => !props.noMargin && 0};
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
    countryOfResidence,
    professionalTitle,
    profilePhoto,
  } = props
  const history = useHistory()

  const viewProfile = (id: string | undefined) => {
    history.push(path.baddie + '/' + id)
  }

  return (
    <CardWrapper
      flexDirection="column"
      onClick={() => viewProfile(_id)}
      justifyContent="space-between"
      position="relative"
      p={4}
    >
      <Flex justifyContent="flex-start" pb="3" alignItems="center">
        <Avatar name={fullName} src={profilePhoto} size="md" />
        <Stack justifyContent="flex-start" pl={2}>
          <Heading as="h5" size="sm" margin="0" mb="0" lineHeight="10px" fontWeight={400}>
            {fullName}
          </Heading>
          <StatusText fsize="13px" lineHeight="6px" fontWeight={600} pb="3">
            {professionalTitle}
          </StatusText>
          <StatusText mt="8px" fsize="12px" noMargin>
            {yearsOfExperience}+years experience
          </StatusText>
        </Stack>
        <FlagIcon country={getCode(countryOfResidence ?? '')} size={38} style={{ marginLeft: 'auto' }} />
      </Flex>

      {/* ==Layout Skills Tag == */}
      <Stack spacing={2} isInline pt={2} mb={4}>
        {Array.isArray(skills) ? (
          skills.map((val: string, index: number) => {
            return (
              <Tag key={[index, val].join('-')} rounded="full" size="sm" bg="#E4E7F9">
                <TagIcon icon="at-sign" size="12px" />
                <TagLabel>{val}</TagLabel>
              </Tag>
            )
          })
        ) : (
          <Tag variantColor="blue" border="1px solid" size="sm">
            {/* <TagIcon icon="at-sign" size="12px" /> */}
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

/**===========================================================
 * The section below renders the directory profiles
 **===========================================================*/

interface DirectoryProps {
  profiles: ProfileInterface[]
}

interface ISearchResult {
  item: ProfileInterface
  refIndex?: number
  score?: number
}

export const DirectoryPage: React.FC<DirectoryProps> = (props): JSX.Element => {
  const { profiles } = props
  const [result, setResult] = useState<ISearchResult[]>([])

  // useEffect(() => {
  //   // profiles && localStorage.setItem('dir', JSON.stringify(profiles))
  //   return () => {
  //     setResult(profiles)
  //   }
  // }, [])

  if (!props.profiles || props.profiles.length === 0) {
    return (
      <Flex align="center" justify="center" margin="auto">
        <Loader />
      </Flex>
    )
  }

  const useFuse = (value: string): React.SetStateAction<ISearchResult> => {
    const fuse = new Fuse(profiles, {
      keys: ['fullName', 'professionalTitle', 'skills', 'cityOrState', 'countryOfResidence'],
      includeScore: true,
    })

    const result: Fuse.FuseResult<ISearchResult[]> | any = fuse.search(value)
    setTimeout(() => {
      setResult(result)
    }, 200)
    return result
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    // Fix this later and use a debounce [lodash]
    useFuse(e.target.value)
  }

  return (
    <Box>
      <PageHeader useHeader />
      <Wrapper>
        <Heading as="h1" size="xl" maxW="600px" textAlign="center">
          Find a woman of color to connect with, hire, or mentor
        </Heading>
        <InputGroup color="blue.800" width="100%" maxWidth="600px" size="lg" my="5">
          <InputLeftElement children={<Icon name="search" color="blue.800" />} />
          <Input
            variant="outline"
            placeholder="Search by name or role"
            color="blue.800"
            borderRadius="5px"
            focusBorderColor="blue.800"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e)}
          />
        </InputGroup>

        <Flex width="100%" mt="10" justifyContent={['center', 'flex-start']} flexWrap="wrap">
          {result.length >= 1
            ? result.map((res, _index) => {
                const { item }: ISearchResult = res
                return (
                  <ProfileCard
                    key={[item._id, _index].join('-')}
                    fullName={item.fullName}
                    profilePhoto={item.profilePhoto}
                    professionalTitle={item.professionalTitle || ''}
                    yearsOfExperience={item.yearsOfExperience}
                    professionalBio={item.professionalBio}
                    skills={item.skills}
                    _id={item._id}
                    cityOrState={item.cityOrState}
                    countryOfResidence={item.countryOfResidence}
                  />
                )
              })
            : profiles.map((val, _index) => {
                return (
                  <ProfileCard
                    key={[val._id, _index].join('-')}
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
