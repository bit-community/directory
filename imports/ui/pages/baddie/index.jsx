import React from 'react';
import styled from '@emotion/styled';
import { Stack, Text, Avatar, Box, Flex, Image, Tag, TagIcon, TagLabel, Heading, Link, } from '@chakra-ui/core';
import { Loader } from '/imports/lib/loader';
import { withTracker } from 'meteor/react-meteor-data';
import { PageHeader, BreakLayout } from '/imports/ui/components';
//imports for API call
import { Profile } from '/imports/api/collections';
import theme from '/imports/lib/theme';
const RowText = styled(Link) `
  margin: 0;
  line-height: 100%;
  border: 1px solid #eee;
  cursor: pointer;
  padding: 5px 12px;
  margin-bottom: 5px;
`;
const ProfileWrapper = styled(Flex) `
  flex-wrap: wrap;
  min-height: 100vh;
  @media (max-width: 486px) {
    flex-direction: column;
  }
`;
const ProjectsWrapper = styled(Flex) `
  flex-wrap: wrap;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-width: 200px;
  box-shadow: ${theme.custom.lightShadow};
  @media (max-width: 486px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 100%;
  }
`;
export const Baddie = (props) => {
    const { profilePhoto, websiteUrl, countryOfResidence, yearsOfExperience, mentorshipConsent, cityOrState, instagramProfile, twitterProfile, facebookProfile, fullName, professionalBio, professionalTitle, projects, skills, } = props;
    return (<Box marginTop={'-' + theme.custom.fixedMarginTop}>
      <BreakLayout>
        <ProfileWrapper flexWrap="wrap">
          
          <Stack width={['100%', '100%', '25%', '25%']} bg="gray.50" p={6} paddingTop={theme.custom.fixedMarginTop}>
            <Box mb={6}>
              <Avatar alignItems="center" name={fullName} size="2xl" src={profilePhoto}/>
            </Box>
            {websiteUrl && (<RowText isExternal href={websiteUrl}>
                {websiteUrl}
              </RowText>)}
            {instagramProfile && (<RowText isExternal href={instagramProfile}>
                {instagramProfile}
              </RowText>)}
            {twitterProfile && (<RowText isExternal href={twitterProfile}>
                {twitterProfile}
              </RowText>)}
            {facebookProfile && (<RowText isExternal href={facebookProfile}>
                {facebookProfile}
              </RowText>)}
            {mentorshipConsent && (<Box bg="green.600" color="white" width="max-content" p="1" px="3" fontStyle="italic">
                Available for mentorship
              </Box>)}
          </Stack>
          

          
          <Box width={['100%', '100%', '75%', '75%']} p={6} paddingTop={theme.custom.fixedMarginTop} borderLeft="2px solid" borderColor="blue.800">
            <Flex flexDirection="column">
              <Heading as="h1" size="md">
                {fullName}
              </Heading>
              <Heading as="h4" size="sm">
                {professionalTitle}, with {yearsOfExperience} years of experience
              </Heading>

              
              {skills.length !== 0 && (<Stack spacing={2} isInline pt={2} mb={4}>
                  {Array.isArray(skills) ? (skills.map((val, index) => {
        return (<Tag key={[index, val].join('-')} variantColor="blue" border="1px solid" size="sm">
                          <TagIcon icon="at-sign" size="12px"/>
                          <TagLabel>{val}</TagLabel>
                        </Tag>);
    })) : (<Tag variantColor="blue" border="1px solid" size="sm">
                      <TagIcon icon="at-sign" size="12px"/>
                      <TagLabel>{skills}</TagLabel>
                    </Tag>)}
                </Stack>)}
              

              <Text as="a">
                <strong>Location:</strong> {cityOrState}, {countryOfResidence}
              </Text>
            </Flex>

            <Stack my={6}>
              <Heading as="h3" size="md">
                About Me
              </Heading>
              <Text>{professionalBio}</Text>
            </Stack>

            <Stack width="100%">
              <Heading as="h3" size="md">
                My Projects
              </Heading>
              <Text>Some of my amazing works</Text>

              
              <Flex flexWrap="wrap" justifyContent={['center', 'flex-start']} width="100%">
                {projects &&
        projects.map((val, index) => {
            return (<ProjectsWrapper m="2" p="2" key={[index, val.name].join('-')}>
                        <Image size="200px" width="100%" objectFit="cover" src={val.base64}/>
                      </ProjectsWrapper>);
        })}
              </Flex>
              
            </Stack>
          </Box>
          
        </ProfileWrapper>
      </BreakLayout>
    </Box>);
};
const BaddieProfile = (props) => {
    const { profile } = props;
    return (<Box>
      <PageHeader useHeader/>
      {!props.profile ? (<Flex align="center" justify="center" margin="auto">
          <Loader />
        </Flex>) : (<Baddie {...profile}/>)}
    </Box>);
};
export default withTracker((props) => {
    const id = props.match.params.id;
    return {
        profile: Profile.findOne({ _id: id }),
    };
})(BaddieProfile);
