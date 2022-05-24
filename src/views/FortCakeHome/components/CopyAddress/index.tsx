import React, { useState } from 'react'
import { Box, Button, CopyIcon } from 'fortcake-uikit-v2'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  border-radius: 10px;
  font-size: 14px;
`

const StyledCopyIcon = styled(CopyIcon)`
  fill: ${({ theme }) => theme.colors.primary};
`

const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline-block' : 'none')};
  position: absolute;
  padding: 8px;
  top: 0;
  left: calc(100% + 10px);
  text-align: center;
  background-color: ${({ theme }) => theme.colors.contrast};
  color: ${({ theme }) => theme.colors.invertedContrast};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.contrast};
  opacity: 0.7;
  width: 100px;
  font-size: 14px;
`

const CopyAddressToClipboard = ({ address }: { address: string }) => {
  const truncatedAddress = `${address.slice(0, 6)}...${address.slice(address.length - 6)}`
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)
  const handleClick = () => {
    if (navigator.clipboard && navigator.permissions) {
      navigator.clipboard.writeText(address).then(() => displayTooltip())
    } else if (document.queryCommandSupported('copy')) {
      const ele = document.createElement('textarea')
      ele.value = address
      document.body.appendChild(ele)
      ele.select()
      document.execCommand('copy')
      document.body.removeChild(ele)
      displayTooltip()
    }
  }

  function displayTooltip() {
    setIsTooltipDisplayed(true)
    setTimeout(() => {
      setIsTooltipDisplayed(false)
    }, 1000)
  }
  return (
    <Box position="relative" display="inline-flex">
      <StyledButton variant="secondary" scale="sm" onClick={handleClick}>
        {truncatedAddress}
        <StyledCopyIcon ml="10px" />
      </StyledButton>
      <Tooltip isTooltipDisplayed={isTooltipDisplayed}>Copied</Tooltip>
    </Box>
  )
}

export default CopyAddressToClipboard
