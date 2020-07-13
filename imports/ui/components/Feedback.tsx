import React from 'react';
import { LinkButton, PageHeader, BorderedDesktopLayout } from '/imports/ui/components'

import { Box, Icon, Heading, Stack } from '@chakra-ui/core'
import { FormButton, } from '/imports/ui/components';
import PropTypes from 'prop-types'




interface IFeedback {
    children?: any,
    message: string,
    color?: string;
    buttonName: string,
    iconName: string | any,
    buttonLink: string,
    iconSize?: string

}

export const PositiveFeedback: React.FC<IFeedback> = (props) => {
    const { iconName, message, color, buttonLink, iconSize, buttonName, ...rest } = props
    return (
        <>
            <PageHeader useHeader />
            <BorderedDesktopLayout marTop="0" padTop="0">

                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Stack spacing="8" alignItems="center">
                        <Box py="6" display="flex" justifyContent="center" alignItems="center">
                            <Icon textAlign="center" margin="auto" name={iconName} size="6rem" color={color || 'green.500'} />
                        </Box>
                        <Heading as="h1" size="md">{message}</Heading>
                        <LinkButton buttonLink={buttonLink} buttonName={buttonName} analyticName="Complete Funnel" buttonColor="green.500" color="#FFF" {...rest} {...props} />
                        {/* <small onClick={returnHome}>Click the button below if you're not redirected in 10 seconds</small> */}
                    </Stack>
                </Box>
            </BorderedDesktopLayout>
        </>


    )
};

PositiveFeedback.propTypes = {
    children: PropTypes.element,
    message: PropTypes.string.isRequired,
    buttonName: PropTypes.string.isRequired,
    buttonLink: PropTypes.string.isRequired,
    iconName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.any
    ]),
    iconSize: PropTypes.any
}
