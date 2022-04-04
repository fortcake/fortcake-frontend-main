import React, { useState, useRef } from 'react'
import { Input, Button, Flex, Text, dark } from 'fortcake-uikit-v2'
import styled from 'styled-components'
import axios, { AxiosRequestConfig } from 'axios'
import { string } from 'yup'
import Loading from '../Loader/CircleLoader'

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
  color: ${dark.colors.text};
  max-width: 244px;
`

const StyledButton = styled(Button)`
  height: 40px;
`

const Loader = () => (
  <Flex minWidth="125px" height="40px" justifyContent="center" alignItems="center">
    <Loading style={{ width: '22px', height: 'auto' }} />
  </Flex>
)

const emailSchema = string().email()
const url = 'https://api.fortcake.io/subscribe'

const SearchInput: React.FC = () => {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputEmail = useRef(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputEmail.current.style.borderColor = dark.colors.inputSecondary
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!email) {
        inputEmail.current.style.borderColor = dark.colors.failure
        throw new Error('Enter email address')
      }
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
      inputEmail.current.style.borderColor = dark.colors.failure
      setIsLoading(false)
      console.info({ error })
    }
  }

  return (
    <MainWrapper>
      <WrapWrapper>
        <Text mb="24px" lineHeight="1" color={dark.colors.text}>
          Receive the latest releases & giveaways in your inbox
        </Text>
        {!success ? (
          <form>
            <InputWrapper>
              <StyledInput value={email} onChange={onChange} placeholder="Enter your email address" ref={inputEmail} />
              {!isLoading && (
                <StyledButton variant="primary" type="submit" onClick={handleSubmit}>
                  Subscribe
                </StyledButton>
              )}
              {isLoading && <Loader />}
            </InputWrapper>
          </form>
        ) : (
          <Flex minHeight={40} alignItems="center" pl="">
            <Text color={dark.colors.secondary}>Thank you for subscribing!</Text>
          </Flex>
        )}
      </WrapWrapper>
    </MainWrapper>
  )
}

export default SearchInput
