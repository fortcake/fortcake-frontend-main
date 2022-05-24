import React, { useEffect, useRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { Flex as Div } from 'fortcake-uikit-v2'
import useTheme from 'hooks/useTheme'

const TERMLY_ID_COOKIE = '72792c01-ecd2-4713-8e7f-df1d4bae71f5'
const TERMLY_ID_PRIVACY = 'cca5cfd1-f35e-49ea-922f-e6e77016ab14'
const TERMLY_ID_TERMS = '24b5da12-074b-458e-8b9d-9d3d9017e2db'

const Box = styled(Div)`
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`

const Legal = (props: RouteComponentProps<{ policy: string }>) => {
  const {
    match: {
      params: { policy },
    },
  } = props

  const { isDark, toggleTheme } = useTheme()
  // TODO scrollTo func (clicking on hashlinks of iframe table of contents) within iframe not working when using router link
  // const [initState, setState] = useState(false)
  const termlyId = policy === 'cookies' ? TERMLY_ID_COOKIE : policy === 'privacy' ? TERMLY_ID_PRIVACY : TERMLY_ID_TERMS

  const ele = useRef(null)

  useEffect(() => {
    if (isDark) {
      // setState(true)
      toggleTheme()
    }
    return () => !isDark && toggleTheme()
  }, [isDark, toggleTheme])

  useEffect(() => {
    const termlyElement = ele.current as HTMLDivElement
    termlyElement.setAttribute('name', 'termly-embed')

    const scriptId = 'termly-jssdk'

    const embedPolicy = (d, s, id) => {
      const tjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      const js = d.createElement(s)
      js.id = id
      js.src = 'https://app.termly.io/embed-policy.min.js'
      js.async = true
      tjs.parentNode.insertBefore(js, tjs)

      js.onload = () => {
        const child = termlyElement.childNodes[0] as HTMLDivElement
        child.style.width = '100%'
      }
    }

    embedPolicy(document, 'script', scriptId)

    return () => {
      document.getElementById(scriptId).remove()
    }
  }, [policy])

  return <Box ref={ele} data-id={termlyId} data-type="iframe" />
}

export default Legal
