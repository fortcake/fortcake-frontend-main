import React from 'react'
import {
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalBody,
  Button,
  useModal,
  Text,
  Link,
  Flex,
  Heading,
  InjectedModalProps,
} from 'fortcake-uikit-v2'
import styled from 'styled-components'
import { Links } from 'components/Menu/config/config'
import { useDispatch } from 'react-redux'
import { setAcceptedCookie } from 'state/user/actions'
import { AppDispatch } from 'state'
import CookieIcon from './CookieIcon'

const StyledModalBody = styled(ModalBody)`
  padding: 10px 24px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 24px;
  }
`

const StyledModalContainer = styled(ModalContainer)`
  width: min(100% - 60px, 420px);
`

const InlineLink = styled(Link)`
  display: inline-block;
`

const Footer = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 64px;
  border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

export const CookiesNoticeModal = React.memo(({ onDismiss }: InjectedModalProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleDismiss = () => {
    dispatch(setAcceptedCookie())
    onDismiss()
  }

  return (
    <StyledModalContainer minWidth="280px">
      <ModalHeader>
        <ModalTitle>
          <Heading>Cookies Policy</Heading>
          <CookieIcon fill="white" width={28} ml={10} />
        </ModalTitle>
      </ModalHeader>
      <StyledModalBody>
        <Text>
          We use cookies to improve your experience on our site. By continuing to view this website, you agree to our{' '}
          <InlineLink href={Links.TERMS}>Terms of Service</InlineLink>,{' '}
          <InlineLink href={Links.COOKIES}>Cookies Policy</InlineLink>, and{' '}
          <InlineLink href={Links.PRIVACY}>Privacy Policy</InlineLink>.
        </Text>
      </StyledModalBody>
      <Footer>
        <Button scale="sm" onClick={handleDismiss}>
          Accept
        </Button>
      </Footer>
    </StyledModalContainer>
  )
})

const PresentCookiesNotice = () => {
  return useModal(<CookiesNoticeModal onDismiss={() => null} />)
}

export default PresentCookiesNotice
