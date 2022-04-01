import React from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Menu as UikitMenu, Button, Flex, GamesLink } from 'fortcake-uikit-v2'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import config from './config/config'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'
import { footerLinks } from './config/footerConfig'
import NewsLetter from '../Newsletter'
// import UserMenu from './UserMenu'
// import GlobalSettings from './GlobalSettings'

// logos
import LogoMain from '../../assets/images/logo/logo_main.png'

const LogoImg = styled.img`
  width: 35vw;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 30vw;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 16vw;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 12vw;
  }
`

const StyledLink = styled(Link)`
  font-size: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 12px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`

const DappLink: React.FC = () => (
  <Button as="button" variant="primary" scale="sm">
    <StyledLink to={GamesLink.link}>Launch App</StyledLink>
  </Button>
)

const HomeLink: React.FC = () => (
  <Flex alignItems="center">
    <Link to="/">
      <LogoImg src={LogoMain} />
    </Link>
  </Flex>
)

const Menu = (props) => {
  const { isDark, toggleTheme } = useTheme()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const { pathname } = useLocation()

  const activeMenuItem = getActiveMenuItem({ menuConfig: config(t), pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })
  return (
    <UikitMenu
      userMenu={pathname.includes(GamesLink.link) ? <></> : <DappLink />}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      links={config(t)}
      subLinks={activeMenuItem?.hideSubNav ? [] : activeMenuItem?.items}
      footerLinks={footerLinks(t)}
      activeItem={activeMenuItem?.href}
      activeSubItem={activeSubMenuItem?.href}
      logo={<HomeLink />}
      isInGamesPage={pathname.includes(GamesLink.link)}
      newsLetterComponent={<NewsLetter />}
      {...props}
    />
  )
}

export default Menu
