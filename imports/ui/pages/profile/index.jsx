import React from 'react';
import { Box, Heading } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { PageHeader, DesktopLayout } from '/imports/ui/components';
const Layout = styled(DesktopLayout) `
  border: 2px solid;
  padding-top: 50px;
  padding-bottom: 50px;
  border-bottom: 4px solid;
`;
const DrawerLink = styled.li `
  text-decoration: none;
  padding: 10px 1.2rem;
  font-weight: bold;
  list-style: none;
  border-bottom: 1px solid #eee;
`;
const NavWrapper = styled.ul `
  text-decoration: none;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  margin: 0;
`;
export default function AccountPage() {
    return (<div>
      <PageHeader useHeader title="Your Transactions"/>

      <Layout>
        <NavWrapper>
          
          <Heading as="h4" size="md">
            Profile Manager is currently in progress
          </Heading>
          
          

          <Box mt="5" width="100%">
            
            
            
            
            
          </Box>
        </NavWrapper>
      </Layout>
    </div>);
}
