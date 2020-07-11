import React from "react";
import { Link } from "react-router-dom";

import { Icon, Box, Heading } from "@chakra-ui/core";
import styled from '@emotion/styled'
import path from '../../../path'
import { PageHeader, BreakLayout } from '/imports/ui/components'


const DrawerLink = styled.li`
    text-decoration: none;
    padding: 10px 1.2rem;
    font-weight: bold;
    list-style: none;
    border-bottom: 1px solid #EEE;
    `
const NavWrapper = styled.ul`
    text-decoration: none;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0;
    margin: 0;

`

export default function AccountPage(this: any) {
  return (
    <div>
      <PageHeader useHeader title="Your Transactions" />

      <BreakLayout>
        <NavWrapper>
          <DrawerLink><Link to={path.onboarding}>Profile</Link> </DrawerLink>
          <DrawerLink><Link to={path.onboarding}>Update Account</Link> </DrawerLink>

          <Box mt="5" width="100%">
            <Heading as="h1" size="md" pl="4">User Account</Heading>
            <DrawerLink><Link to={path.auth.loginRoute}>Login</Link></DrawerLink>
            <DrawerLink><Link to={path.auth.signupRoute}>Signup<Icon name="external-link" mx="2px" /></Link></DrawerLink>
            <DrawerLink><Link to={path.auth.resetPasswordRoute}>Reset Account <Icon name="external-link" mx="2px" /></Link></DrawerLink>
            <DrawerLink><Link to={path.auth.logoutRoute}>Logout</Link></DrawerLink>
          </Box>
        </NavWrapper>
      </BreakLayout>

    </div >
  );
}