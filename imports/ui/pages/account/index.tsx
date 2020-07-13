import React from 'react'
import { Link } from 'react-router-dom'

import { Icon, Box, Heading } from '@chakra-ui/core'
import styled from '@emotion/styled'
import path from '../../path'
import { PageHeader, DesktopLayout } from '/imports/ui/components'

const Layout = styled(DesktopLayout)`
  border: 2px solid;
  padding-top: 50px;
  padding-bottom: 50px;
  border-bottom: 4px solid;
`

const DrawerLink = styled.li`
  text-decoration: none;
  padding: 10px 1.2rem;
  font-weight: bold;
  list-style: none;
  border-bottom: 1px solid #eee;
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

      <Layout>
        <NavWrapper>
          <DrawerLink>
            <Link to={path.root}>Home</Link>{' '}
          </DrawerLink>
          <DrawerLink>
            <Link to={path.onboarding + '/profile'}>Create Profile</Link>{' '}
          </DrawerLink>
          <DrawerLink>
            <Link to={path.profile}>Manage your Profile</Link>{' '}
          </DrawerLink>

          <Box mt="5" width="100%">
            <Heading as="h1" size="md" pl="4">
              User Account
            </Heading>
            <DrawerLink>
              <Link to={path.auth.loginRoute}>Login</Link>
            </DrawerLink>
            {/* <DrawerLink><Link to={path.auth.signupRoute}>Signup<Icon name="external-link" mx="2px" /></Link></DrawerLink> */}
            <DrawerLink>
              <Link to={path.auth.resetPasswordRoute}>
                Reset Password <Icon name="external-link" mx="2px" />
              </Link>
            </DrawerLink>
            <DrawerLink>
              <Link to={path.auth.logoutRoute}>Logout</Link>
            </DrawerLink>
          </Box>
        </NavWrapper>
      </Layout>
    </div>
  )
}
