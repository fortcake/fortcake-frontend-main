import React from 'react'
import { Text } from 'fortcake-uikit-v2'
import styled, { keyframes, css } from 'styled-components'

export interface ActionPanelProps {
  details?: string
  expanded: boolean
}

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0px;
  }
`

const Container = styled.div<{ expanded }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 200ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 60px 32px;
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 60px 32px;
  }
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({ details, expanded }) => {
  return (
    <Container expanded={expanded}>
      <Text>{details}</Text>
    </Container>
  )
}

export default ActionPanel
