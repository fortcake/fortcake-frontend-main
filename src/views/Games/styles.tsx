import styled from 'styled-components'
import { Image, Text } from 'fortcake-uikit-v2'
import { Heading } from '../FortCakeHome/styles'

export const H2 = styled(Heading)`
  font-size: 1.6rem;
  line-height: 2.4rem;
`

export const LandingText = styled.div`
  ${({ theme }) => theme.mediaQueries.md} {
    flex-basis: 60%;
  }
`

export const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`
export const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

export const StyledImage = styled(Image)`
  display: none;
  &.showOnMobile {
    display: flex;
    ${({ theme }) => theme.mediaQueries.md} {
      display: none;
    }
  }
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`
