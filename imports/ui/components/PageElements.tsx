import React from 'react';
import { Stack, Box, Icon, Flex, Heading, IconButton } from '@chakra-ui/core';
import { Link, useHistory } from 'react-router-dom';
import Headroom from 'react-headroom';
import styled from '@emotion/styled';
import path from '../path';
import { BreakLayout } from '/imports/ui/components';
import theme from '/imports/lib/theme';
import { Accounts } from 'meteor/accounts-base';

const Navbar = styled.header`
  min-height: 48px;
  height: 65px;
  position: relative;
  margin: 0;
  z-index: 95299999999239;
  vertical-align: middle;
  background: white;
  padding: ${theme.custom.defaultWrapper};
  /* padding: .70rem 1rem .75rem 1.1rem; */
  /* padding-right: calc(5% + 4px); */
`;

const LinkList = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  list-style: none;
`;

const LogoHeader: React.FC = (): JSX.Element => {
  const isUserId = Accounts.userId();

  return (
    <BreakLayout marginT="-10px">
      <Headroom
        wrapperStyle={{ marginBottom: '2.5rem' }}
        style={{ zIndex: 9999999999999, borderBottom: '1px solid #ddd' }}
      >
        <Navbar>
          <Flex justifyContent="space-between" alignItems="center">
            <Link to={path.root}>
              <img alt="Baddies in Tech" width="50px" src="/img/bit.png" aria-label="header logo" />
            </Link>

            {isUserId && (
              <Flex>
                {/* <Link to={path.root}>
                                <LinkList>
                                    <IconButton icon="unlock" aria-label="Settings" variant="outline" variantColor="pink" border="2px solid" borderRadius="1px" />
                                </LinkList>
                            </Link> */}
                <Link to={path.account}>
                  <LinkList>
                    <IconButton
                      icon="drag-handle"
                      aria-label="Settings"
                      variant="outline"
                      variantColor="pink"
                      border="2px solid"
                      borderRadius="1px"
                    />
                    {/* Settings */}
                  </LinkList>
                </Link>
              </Flex>
            )}
          </Flex>
        </Navbar>
      </Headroom>
    </BreakLayout>
  );
};

interface IPageHeader {
  useHeader?: boolean;
  title?: string;
  subTitle?: string;
  useTitle?: boolean;
}
export const PageHeader: React.FC<IPageHeader> = (props): JSX.Element => {
  const { useHeader, title, useTitle, subTitle } = props;
  const history = useHistory();
  return (
    <React.Fragment>
      {useHeader ? (
        <LogoHeader />
      ) : (
        <Box my="4" bg="inherit">
          <Box my="2" width="100px" onClick={() => history.goBack()}>
            <Icon name="arrow-back" size="28px" />
          </Box>
          <Stack spacing={3}>
            <Heading color="blue.700" as="h1" size="lg">
              {title}
            </Heading>
            <Heading as="h6" size="sm">
              {subTitle}
            </Heading>
          </Stack>
        </Box>
      )}

      {useTitle && (
        <Box my="4" mb="10">
          <Heading color="blue.700" as="h1" size="lg">
            {title}
          </Heading>
          <Heading as="h6" fontWeight="normal" size="sm">
            {subTitle}
          </Heading>
        </Box>
      )}
    </React.Fragment>
  );
};

export const DesktopLayout: React.FC<any> = (props): JSX.Element => {
  return (
    <Stack maxWidth="800px" margin="auto" px={[3, 4, 6, 8]} {...props}>
      {props.children}
    </Stack>
  );
};
