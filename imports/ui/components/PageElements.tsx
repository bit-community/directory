import React from 'react'
import { Stack, Box, Icon, Heading } from '@chakra-ui/core'
import { Link, useHistory } from 'react-router-dom'
import Headroom from 'react-headroom'
import styled from '@emotion/styled'
import path from '../path'
import { BreakLayout } from '/imports/ui/components'

const Navbar = styled.header`
    min-height: 48px;
    height: 65px;
    position: relative;
    margin: 0;
    z-index: 95299999999239;
    background: white;
    padding: .70rem 1rem .75rem 1.1rem;
    padding-right: calc(5% + 4px);
`


const LogoHeader: React.FC = (): JSX.Element => {
    return (
        <BreakLayout marginT="-10px">
            <Headroom
                wrapperStyle={{ marginBottom: '2.5rem' }}
                style={{ zIndex: 9999999999999, borderBottom: '1px solid #ddd' }}
            >
                <Navbar >
                    <Link to={path.root}>
                        <img alt="Baddies in Tech" width="40px" src="/img/bit.png" aria-label="header logo" />
                    </Link>
                </Navbar >
            </Headroom >
        </BreakLayout>
    )
}


interface IPageHeader {
    useHeader?: boolean,
    title?: string,
    subTitle?: string,
    useTitle?: boolean
}
export const PageHeader: React.FC<IPageHeader> = (props): JSX.Element => {
    const { useHeader, title, useTitle, subTitle } = props
    const history = useHistory()
    return (
        <React.Fragment>
            {
                useHeader ? <LogoHeader /> :
                    <Box my="4" bg="inherit">
                        <Box my="2" width="100px" onClick={() => history.goBack()}>
                            <Icon name="arrow-back" size="28px" />
                        </Box>
                        <Stack spacing={3}>
                            <Heading color="blue.700" as="h1" size="lg">{title}</Heading>
                            <Heading as="h6" size="sm">{subTitle}</Heading>
                        </Stack>
                    </Box>
            }

            {useTitle && (
                <Box my="4" mb="10">
                    <Heading color="blue.700" as="h1" size="lg">{title}</Heading>
                    <Heading as="h6" fontWeight="normal" size="sm">{subTitle}</Heading>
                </Box>
            )}
        </React.Fragment>
    )
}


export const DesktopLayout: React.FC<any> = (props): JSX.Element => {
    return (
        <Stack maxWidth="800px" margin="auto" px="6" {...props}>
            {props.children}
        </Stack>
    )
}