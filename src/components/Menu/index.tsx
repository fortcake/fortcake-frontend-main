import React from 'react'
import Link from 'components/NextLink'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Menu as UikitMenu, Flex, GamesLink, Footer } from 'fortcake-uikit-v2'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import config, { FooterLinks } from './config'
import { Socials } from './config/config'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'
import NewsLetter from '../Newsletter'
import UserMenu from './UserMenu'

// import LogoMain from "../../assets/images/logo/logo_main.png";

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

const HomeLink: React.FC = () => (
  <Flex alignItems="center">
    <Link to="/">
      <LogoImg alt="Fortcake Logo" src="/images/logo_main.png" />
    </Link>
  </Flex>
)

const Menu = (props) => {
  const { isDark, toggleTheme } = useTheme()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const { pathname } = useRouter()

  const menuMemo = React.useMemo(() => {
    const menus = config(t)
    return pathname === GamesLink.link ? menus : menus.filter(({ label }) => !label.toLowerCase().includes('submit'))
  }, [t, pathname])

  const activeMenuItem = getActiveMenuItem({ menuConfig: menuMemo, pathname })
  const activeSubMenuItem = getActiveSubMenuItem({
    menuItem: activeMenuItem,
    pathname,
  })

  return (
    <UikitMenu
      linkComponent={(linkProps) => {
        return <Link to={linkProps.href} {...linkProps} prefetch={false} />
      }}
      userMenu={<UserMenu />}
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
      socialLinks={Socials}
      {...props}
    />
  )
}

export default Menu

export const CustomFooter = () => {
  const { isDark, toggleTheme } = useTheme()
  const { currentLanguage, setLanguage, t } = useTranslation()
  return (
    <Footer
      LinkComponent={(linkProps) => {
        return <Link to={linkProps.href} {...linkProps} prefetch={false} />
      }}
      items={FooterLinks(t)}
      isDark={isDark}
      toggleTheme={toggleTheme}
      newsLetterComponent={<NewsLetter />}
      buyCakeLabel=""
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      socialLinks={Socials}
      pb={['84px', null, '40px']}
    />
  )
}
