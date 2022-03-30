import React from 'react'
import styled from 'styled-components'
import { Heading as PancakeHeading, Image, Flex, ImageProps, Link } from 'fortcake-uikit-v2'

export const Heading = styled(PancakeHeading)<{ override?: boolean }>`
  color: ${({ theme, override }) => (override ? theme.colors.text : theme.colors.secondary)};
  /* text-shadow: 0 0 4px lightseagreen; */
`

export const Section = styled.section`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 36px 20px;
    margin-bottom: 40px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 36px 0;
  }
  h2,
  h3 {
    text-align: center;
  }
  &.landingSection,
  &.featuresSection {
    min-height: calc(100vh - 80px);
    h4 {
      line-height: 1.5;
    }
  }
  &.landingSection {
    justify-content: flex-end;
    padding: 8vh 0;
    .socialLinks {
      width: 100%;
      margin: 6vh 0;
      ${({ theme }) => theme.mediaQueries.md} {
        width: 75%;
        align-self: flex-start;
      }
    }
    .cta {
      width: 100%;
      justify-content: space-evenly;
      ${({ theme }) => theme.mediaQueries.md} {
        justify-content: flex-start;
      }
    }
  }
  &.featuresSection {
    justify-content: space-evenly;
    padding: 0;
  }
  &.participateSection {
    min-height: 50vh;
    padding-top: 0;
    justify-content: flex-start;
  }
`

export const SectionFlex = styled(Flex)`
  max-width: 1200px;
  align-items: center;
  justify-content: space-evenly;
  .imgHideOnMobile {
    display: none;
  }
  .imgShowOnMobile {
    ${({ theme }) => theme.mediaQueries.md} {
      display: none;
    }
  }
  &.address {
    min-height: 21vh;
    align-items: flex-end;
    flex-direction: column;
    width: 100%;
    justify-content: space-evenly;
    > a {
      justify-content: center;
      &:first-child {
        margin-top: 40px;
      }
      &:not(:last-child) {
        margin-bottom: 40px;
      }
      ${({ theme }) => theme.mediaQueries.md} {
        &:first-child {
          margin-top: 0;
        }
        &:not(:last-child) {
          margin-bottom: 0;
        }
      }
    }
    ${({ theme }) => theme.mediaQueries.md} {
      flex-direction: row;
    }
  }
  &.features {
    flex-direction: column;
    svg {
      margin-bottom: 20px;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      flex-direction: row;
    }
  }
  &.participate {
    flex-direction: column;
    margin: 20px 0;
    padding: 0 20px;
    ${({ theme }) => theme.mediaQueries.md} {
      margin: 0;
    }
    h2 {
      margin-bottom: 10px;
      text-align: left;
      ${({ theme }) => theme.mediaQueries.md} {
        text-align: center;
      }
    }
    h2,
    h4 {
      width: 100%;
      line-height: 1.5;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      max-width: 55%;
    }
  }
  &.tokenomics {
    flex-direction: column;
    &.reversed {
      flex-direction: column-reverse;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      flex-direction: row;
      &.reversed {
        flex-direction: row;
      }
    }
  }
  &.grid {
    > div {
      margin-bottom: 20px;
      ${({ theme }) => theme.mediaQueries.md} {
        display: flex;
        flex-direction: column;
        flex-basis: 50%;
      }
      align-items: center;
      > h2 {
        text-align: start;
        align-self: start;
        margin-bottom: 12px;
      }
    }
  }
  &.small {
    > div:first-child {
      max-width: 250px;
      max-height: 204px;
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      > div:first-child {
        max-width: 400px;
        max-height: 326px;
      }
    }
  }
`

export const PageHeader = styled.div`
  padding: 0 20px;
  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 0;
  }
`

export const Features = styled(Flex)`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  > div {
    margin-bottom: 20px;
  }
`

export const ListWrapper = styled.ul`
  text-align: start;
  padding: 0;
`

export const ListItems = styled.li`
  list-style-type: none;
  margin-bottom: 20px;
`

export const SocialLink = styled(Link)`
  width: 100%;
  justify-content: space-evenly;
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: flex-start;
  }
`

export const LazyImage: React.FC<ImageProps> = (props, { height, width, src, className }) => (
  <Image loading="lazy" height={height} width={width} src={src} className={className} {...props} />
)
