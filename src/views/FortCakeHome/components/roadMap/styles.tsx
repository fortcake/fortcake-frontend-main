import React from 'react'
import styled from 'styled-components'
import { Box, Flex, Text } from 'fortcake-uikit-v2'
import { PonPink, PonGreen, PonBlank } from './svgs'

enum Progress {
  DONE,
  INPROGRESS,
  FUTURE,
}

export const Container = styled(Flex)`
  --border-primary: 2px solid ${({ theme }) => theme.colors.secondary};
  --border-secondary: 1px solid #63b9a3;
  --theme-primary: ${({ theme }) => theme.colors.secondary};
  --text-title-future: #1c3e36;
  --text-title-inprogress: #91344e;

  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: initial;
  }
`

export const MainHq = styled(Box)`
  position: relative;
  top: 10px;
  ${({ theme }) => theme.mediaQueries.lg} {
    position: absolute;
    top: -13px;
    left: -103px;
  }
`

export const Line1 = styled.div`
  border-top: var(--border-primary);
  position: absolute;
  width: 100px;
  bottom: -13px;
  right: -34px;
  transform: rotate(25deg);
  ${({ theme }) => theme.mediaQueries.lg} {
    box-shadow: 5px 0px 9px 1px var(--theme-primary);
  }
`

export const Line2 = styled.div`
  width: calc(50% + 45px);
  height: 50px;
  align-self: flex-start;
  border-bottom: var(--border-primary);
  border-right: var(--border-primary);
`

export const BorderBox = styled(Box)`
  border: var(--border-primary);
  transform: rotate(45deg);
  width: 149px;
  height: 149px;
  position: absolute;
  top: 30px;
  right: -75px;
  &.q1 {
  }
  &.q3 {
    left: -75px;
    border-right: none;
    border-top: none;
  }
  &.q4 {
    border-bottom: none;
    border-left: none;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    &.q1 {
      box-shadow: inset -9px 9px 10px -10px var(--theme-primary);
    }
    &.q3 {
      box-shadow: inset 9px -9px 10px -10px var(--theme-primary);
    }
    &.q4 {
      box-shadow: inset -9px 9px 10px -10px var(--theme-primary);
    }
  }
`

export const BorderBox1 = styled(BorderBox)`
  top: 240px;
  right: -75px;
  border-bottom: none;
  border-left: none;
`

// Row Wrapper

export const MainWrapper = styled(Flex)`
  position: relative;
  width: min(100%, 550px);
  &:where(.first, .third, .fifth) {
    border-left: var(--border-primary);
  }
  &:where(.second, .fourth, .sixth) {
    border-right: var(--border-primary);
  }
  &.sixth::after {
    // hide border for last
    content: '';
    position: absolute;
    bottom: -3px;
    left: -3px;
    width: 30%;
    height: 6px;
    z-index: 10;
    background-color: ${({ theme }) => theme.colors.background};
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: initial;
  }
  &.lastWrapper {
    top: -1px;
    left: 68px;
  }
`

export const FlexListContainer = styled(Flex)`
  border-bottom: var(--border-primary);
  align-items: flex-end;
  position: relative;
  justify-content: space-evenly;
  height: 210px;
  min-width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    border-bottom: none;
    &::after {
      content: '';
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 2px;
      box-shadow: 0px 1px 10px 1px var(--theme-primary);
      min-width: initial;
      border: none;
      z-index: -10;
    }
    &.hideExtendedShadow::after {
      right: 2px;
      width: 90%;
    }
  }
`

export const FlexListContainer1 = styled(FlexListContainer)`
  left: 69px;
`

// Each Wrapper

export const FlexPonWrapper = styled(Flex)`
  max-width: 100px;
  ${({ theme }) => theme.mediaQueries.lg} {
    min-width: 135px;
    border-bottom: var(--border-primary);
  }
  &.last {
    border: none;
    > div:first-child::before {
      content: '';
      position: absolute;
      min-width: 75px;
      border-bottom: var(--border-primary);
      bottom: 35px;
      right: -20px;
      z-index: -10;
    }
  }
`

export const FlexPon = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 35px;
  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: flex-end;
  }
`

// Text components

export const TextContainer = styled(Flex)<{ progress?: number }>`
  ${({ progress }) => progress === Progress.FUTURE && `border: var(--border-secondary);`}
  max-width: 96px;
  text-align: center;
  border-radius: 6px;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 115px;
  }

  > div {
    &:first-child {
      // Title
      color: ${({ theme }) => !theme.isDark && 'white'};
      background-color: ${({ progress, theme }) =>
        progress === Progress.DONE ? `${theme.colors.primary}EE` : 'var(--text-title-future)'};
    }
    &:last-child {
      // TextContent
      color: ${({ theme, progress }) => {
        if (theme.isDark) {
          if (progress === Progress.INPROGRESS) return 'white'
          if (progress === Progress.DONE) return `${theme.colors.background}`
        } else {
          return progress !== Progress.FUTURE && 'white'
        }
        return theme.colors.text
      }};
      background-color: ${({ theme, progress }) =>
        progress === Progress.INPROGRESS
          ? `${theme.colors.primary}DD`
          : progress === Progress.FUTURE
          ? theme.colors.background
          : theme.colors.success};
    }
  }
`

export const Title = styled(Text)`
  border-radius: 6px 6px 0 0;
  padding: 4px 0;
  font-size: 14px;
  width: 100%;
  font-weight: 600;
`

export const TextContent = styled(Text)`
  padding: 8px;
  font-size: 13px;
  border-radius: 0 0 6px 6px;
  max-width: 100%;
`

export const RoadMapInProgress = ({ title, text }: { title: string; text: string }) => (
  <FlexPonWrapper>
    <FlexPon>
      <TextContainer flexDirection="column" alignItems="center" progress={Progress.FUTURE}>
        <Title>{title}</Title>
        <TextContent>{text}</TextContent>
      </TextContainer>
      <PonPink height={80} width={100} />
    </FlexPon>
  </FlexPonWrapper>
)
export const RoadMapDone = ({ title, text }: { title: string; text: string }) => (
  <FlexPonWrapper>
    <FlexPon>
      <TextContainer flexDirection="column" alignItems="center" progress={Progress.DONE}>
        <Title>{title}</Title>
        <TextContent>{text}</TextContent>
      </TextContainer>
      <PonGreen height={80} width={100} />
    </FlexPon>
  </FlexPonWrapper>
)
export const RoadMapFuture = ({ title, text, className }: { title: string; text: string; className?: string }) => (
  <FlexPonWrapper className={className}>
    <FlexPon>
      <TextContainer flexDirection="column" alignItems="center" progress={Progress.FUTURE}>
        <Title>{title}</Title>
        <TextContent>{text}</TextContent>
      </TextContainer>
      <PonBlank height={80} width={100} style={{ zIndex: 20 }} />
    </FlexPon>
  </FlexPonWrapper>
)
