import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Avatar, Icon, Flex, Box, Heading } from '@chakra-ui/core';
import { StatusText } from '/imports/ui/components';
const CustomerStyle = styled.section `
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const CustomerList = (props) => {
    const { customerName, iconName, date, LinkCard, PhoneNumber } = props;
    return (<Link to={LinkCard}>
      <Flex align="center" justify="space-between" direction="row" py="2" borderBottom="1px" borderColor="gray.100">
        <Box display="flex" flexDir="row" justifyContent="flex-start">
          <Avatar name={customerName} size="sm"/>
          <Box flexDir="column" pl="3">
            <Heading as="h4" size="sm">
              {customerName}
            </Heading>
            <StatusText fsize=".75rem">{PhoneNumber}</StatusText>
          </Box>
        </Box>

        <Icon name={iconName} size="1rem" color="blue.500" {...props}/>
      </Flex>
    </Link>);
};
const CustomerSearch = (props) => {
    const { customerName, phoneNumber } = props;
    return (<Flex align="center" justify="space-between" direction="row" py="2" borderBottom="1px" cursor="pointer" borderColor="gray.100" {...props}>
      <Box display="flex" flexDir="row" justifyContent="flex-start">
        <Avatar name={customerName} size="sm"/>
        <Box flexDir="column" pl="3">
          <Heading as="h4" fontWeight="normal" size="sm">
            {customerName}
          </Heading>
          <StatusText fsize=".75rem">{phoneNumber}</StatusText>
        </Box>
      </Box>
      <Icon name="chevron-right" size="1rem" color="blue.500"/>
    </Flex>);
};
export { CustomerStyle, CustomerList, CustomerSearch };
