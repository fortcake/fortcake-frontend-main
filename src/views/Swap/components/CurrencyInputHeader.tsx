import React from 'react'
import styled from 'styled-components'
import {
  // ChartIcon,
  Flex,
  HistoryIcon,
  IconButton,
  NotificationDot,
  useModal,
  // ChartDisableIcon,
} from 'fortcake-uikit-v2'
import TransactionsModal from 'components/App/Transactions/TransactionsModal'
import GlobalSettings from 'components/Menu/GlobalSettings'
import useTheme from 'hooks/useTheme'
import { useExpertModeManager } from 'state/user/hooks'
import { Text, Heading } from './styleds'

interface Props {
  title: string
  subtitle: string
  noConfig?: boolean
  setIsChartDisplayed?: React.Dispatch<React.SetStateAction<boolean>>
  isChartDisplayed?: boolean
}

const CurrencyInputContainer = styled(Flex)`
  align-items: center;
  padding: 24px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  /* ${({ theme }) => !theme.isDark && `background-color: ${theme.colors.tertiary}`} */
`

// const ColoredIconButton = styled(IconButton)`
//   color: ${({ theme }) => theme.colors.textSubtle};
// `

const CurrencyInputHeader: React.FC<Props> = ({ title, subtitle }) => {
  const [expertMode] = useExpertModeManager()
  // const toggleChartDisplayed = () => {
  //   setIsChartDisplayed((currentIsChartDisplayed) => !currentIsChartDisplayed)
  // }
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)
  const { isDark } = useTheme()

  return (
    <CurrencyInputContainer>
      <Flex width="100%" alignItems="flex-start" justifyContent="space-between">
        {/* {setIsChartDisplayed && (
          <ColoredIconButton onClick={toggleChartDisplayed} variant="text" scale="sm">
            {isChartDisplayed ? <ChartDisableIcon color="textSubtle" /> : <ChartIcon width="24px" color="textSubtle" />}
          </ColoredIconButton>
        )} */}
        <Flex flexDirection="column">
          <Heading as="h2" mb="8px">
            {title}
          </Heading>
          <Flex alignItems="center">
            <Text fontSize="14px">{subtitle}</Text>
          </Flex>
        </Flex>
        <Flex>
          <NotificationDot show={expertMode}>
            <GlobalSettings color={isDark ? 'textSubtle' : 'textSubtle2'} mr="0" />
          </NotificationDot>
          <IconButton onClick={onPresentTransactionsModal} variant="text" scale="sm">
            <HistoryIcon color={isDark ? 'textSubtle' : 'textSubtle2'} width="24px" />
          </IconButton>
        </Flex>
      </Flex>
    </CurrencyInputContainer>
  )
}

export default CurrencyInputHeader
