import React, { useState } from 'react'
import { Input, Button, Flex, Text, dark } from 'fortcake-uikit-v2'
import styled from 'styled-components'
// import debounce from 'lodash/debounce'
import axios, { AxiosRequestConfig } from 'axios'
import { string } from 'yup'

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

const emailSchema = string().email()
const url = 'https://api.fortcake.io/subscribe'

const SearchInput: React.FC = () => {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!email) throw new Error('Nothing here')
      const eadd = await emailSchema.validate(email)
      setIsLoading(true)

      const options: AxiosRequestConfig = {
        method: 'POST',
        url,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          email: eadd,
        },
      }

      const { data } = await axios.request(options)
      if (data[0].email === email) {
        setIsLoading(false)
        setSuccess(true)
      }
    } catch (error) {
      setIsLoading(false)
      console.info({ error })
    }
  }

  return (
    <MainWrapper>
      <WrapWrapper>
        <Text mb="24px" lineHeight="1" color={dark.colors.text}>
          Receive the latest games and news in your inbox
        </Text>
        {!success ? (
          <form>
            <InputWrapper>
              <StyledInput value={email} onChange={onChange} placeholder="Enter your email address" />
              {isLoading && <h1>WAIT</h1>}
              <StyledButton variant="primary" type="submit" onClick={handleSubmit}>
                Subscribe
              </StyledButton>
            </InputWrapper>
          </form>
        ) : (
          <Text>Talk to you soon!</Text>
        )}
      </WrapWrapper>
    </MainWrapper>
  )
}

export default SearchInput
