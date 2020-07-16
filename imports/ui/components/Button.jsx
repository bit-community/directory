import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Box as ChakraBox, Button } from '@chakra-ui/core';
import * as Analytics from '/imports/ui/analytics';
const Box = styled(ChakraBox) `
  /* width: 16.8rem; */
  display: block;
  width: 100%;
  height: ${(props) => props.theme.custom.buttonHeight};
`;
const StyledButton = styled(Button) `
  border-radius: 1px;
  min-height: 54px;
  justify-content: ${(props) => (props.withIcon ? 'space-between' : 'center')};
  align-content: center;
`;
export const SubmitButton = (props) => {
    const { withIcon, isLoading, buttonName, ...rest } = props;
    return (<StyledButton mt={10} withIcon={withIcon} variantColor="blue" type="submit" isLoading={isLoading} 
    //@ts-ignore
    rightIcon={withIcon && 'arrow-forward'} width="100%" {...rest}>
      {buttonName}
    </StyledButton>);
};
export const FormButton = (props) => {
    const { analyticName, type, handleAction, borderColor, buttonColor, buttonName, color, border } = props;
    const handleClick = (analyticName) => {
        // we will write the handle analytics here
        console.log('console me', analyticName, handleAction);
        Analytics.track(analyticName, {
            component: `Click LinkTo${buttonName}`,
        });
        handleAction && handleAction();
    };
    return (<Box as="button" fontWeight="bold" type={type} width="16.5rem" rounded="0" bg={buttonColor || 'blue.500'} size="lg" border={border} borderColor={borderColor} color={color} px={4} h={8} {...props} onClick={() => handleClick(analyticName)}>
      {buttonName}
    </Box>);
};
export const LinkButton = (props) => {
    const { analyticName, borderColor, buttonColor, buttonLink, buttonName, color, border } = props;
    const handleClick = (analyticName) => {
        // we will write the handle analytics here
        console.log('console me', analyticName);
        Analytics.track(analyticName, {
            component: `Click LinkTo${buttonName}`,
        });
    };
    return (<Link to={buttonLink}>
      <Box as="button" width="16.5rem" rounded="1px" bg={buttonColor || 'blue.500'} size="lg" border={border} borderColor={borderColor} color={color} px={4} h={8} {...props} onClick={() => handleClick(analyticName)}>
        <strong> {buttonName}</strong>
      </Box>
    </Link>);
};
export const ActionButton = (props) => {
    const { analyticName, handleAction, buttonName } = props;
    const handleClick = () => {
        // we will write the handle analytics here
        console.log('console me', analyticName, handleAction);
        Analytics.track(analyticName, {
            component: `Click LinkTo${buttonName}`,
        });
        handleAction && handleAction();
    };
    return (<Button fontWeight="normal" variant="solid" bg="#E06594" rounded="5px" size="md" px={4} h={8} onClick={() => handleClick()} {...props}>
      {buttonName}
    </Button>);
};
