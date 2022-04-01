import React, { useState } from 'react'
import { Input, Button, Flex, Text, dark } from 'fortcake-uikit-v2'
import styled from 'styled-components'
// import debounce from 'lodash/debounce'
import { useTranslation } from 'contexts/Localization'
import axios, { AxiosRequestConfig } from 'axios'

const MainWrapper = styled(Flex)`
  flex-direction: column;
  align-items: flex-end;
  flex-grow: 1;
`

const WrapWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const InputWrapper = styled(Flex)`
  position: relative;
  flex-direction: row;
  justify-content: space-between;
`

const StyledInput = styled(Input)`
  margin-right: 10px;
  background-color: ${dark.colors.input};
  border-color: ${dark.colors.inputSecondary};
`

const StyledButton = styled(Button)`
  height: 40px;
`

const url = 'https://api.fortcake.com/subscribe'

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
}

const SearchInput: React.FC = () => {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    try {
      event.preventDefault()
      if (!email) throw new Error('Nothing here')
      const validatedEmail = validateEmail(email)
      if (!validatedEmail) throw new Error('Invalid email')

      const options: AxiosRequestConfig = {
        method: 'POST',
        url,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          email,
        },
      }

      const { data } = await axios.request(options)
      console.log({ data })
      setSuccess(!success)
    } catch (e) {
      console.log({ e })
    }
  }

  return (
    <MainWrapper>
      <WrapWrapper>
        <Text mb="24px" lineHeight="1" color={dark.colors.text}>
          Receive the latest games and news in your inbox
        </Text>
        {!success ? (
          <InputWrapper>
            <StyledInput value={email} onChange={onChange} placeholder="Enter your email address" />
            <StyledButton variant="primary" onClick={handleSubmit}>
              Subscribe
            </StyledButton>
          </InputWrapper>
        ) : (
          <Text>Talk to you soon!</Text>
        )}
      </WrapWrapper>
    </MainWrapper>
  )
}

export default SearchInput
