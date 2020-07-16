import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
const PageWrapper = styled.section `
    padding: ${(props) => (props.layoutWrapper ? props.layoutWrapper : props.theme.custom.defaultWrapper)};
    /* padding-bottom: calc(${(props) => props.theme.custom.tabNavHeight} + 1.7rem); */
	
`;
export default class Wrapper extends React.Component {
    render() {
        const { layoutWrapper } = this.props;
        return <PageWrapper layoutWrapper={layoutWrapper}>{this.props.children}</PageWrapper>;
    }
}
Wrapper.propTypes = {
    layoutWrapper: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
