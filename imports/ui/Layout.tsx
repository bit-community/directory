import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

interface IPageWrapper {
	layoutWrapper?: string,
	theme?: {
		custom: { defaultWrapper: string, tabNavHeight: string }
	}
}

const PageWrapper = styled.section<IPageWrapper>`
    padding: ${props => props.layoutWrapper ? props.layoutWrapper : props.theme.custom.defaultWrapper};
    padding-bottom: calc(${props => props.theme.custom.tabNavHeight} + 1.7rem);
	
`

export default class Wrapper extends React.Component<{ layoutWrapper?: string }> {

	static propTypes = {
		layoutWrapper: PropTypes.string,
		children: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.node),
			PropTypes.node
		]).isRequired
	}

	render() {
		const { layoutWrapper } = this.props
		return (
			<PageWrapper layoutWrapper={layoutWrapper}>
				{this.props.children}
			</PageWrapper>
		)
	}
}
