import React from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Menu as UikitMenu, Flex, GamesLink } from 'fortcake-uikit-v2'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import config, { FooterLinks } from './config/config'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'
import NewsLetter from '../Newsletter'
import UserMenu from './UserMenu'
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

// const StyledLink = styled(Link)`
//   font-size: 16px;
//   ${({ theme }) => theme.mediaQueries.sm} {
//     font-size: 12px;
//   }
//   ${({ theme }) => theme.mediaQueries.md} {
//     font-size: 16px;
//   }
// `

const DappLink: React.FC = () => {
  return <UserMenu />
  // return (
  //   <Button as="button" variant="primary" scale="sm">
  //     <StyledLink to={GamesLink.link}>Launch App</StyledLink>
  //   </Button>
  // )
}

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

  const menuMemo = React.useMemo(() => {
    const menus = config(t)
    return pathname === GamesLink.link ? menus : menus.filter(({ label }) => !label.toLowerCase().includes('submit'))
  }, [t, pathname])

  const activeMenuItem = getActiveMenuItem({ menuConfig: menuMemo, pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })

  return (
    <UikitMenu
      userMenu={<DappLink />}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      links={menuMemo}
      subLinks={activeMenuItem?.hideSubNav ? [] : activeMenuItem?.items}
      footerLinks={FooterLinks(t)}
      activeItem={pathname}
      activeSubItem={activeSubMenuItem?.href}
      logo={<HomeLink />}
      newsLetterComponent={<NewsLetter />}
      {...props}
    />
  )
}

export default Menu
