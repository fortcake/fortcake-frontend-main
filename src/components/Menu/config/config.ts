import { MenuItemsType, FooterLinkType } from 'fortcake-uikit-v2'
import { ContextApi } from 'contexts/Localization/types'
import { BASE_URL, Nav, FooterLinks as footerLinks } from 'fortcake-config-files/dist'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

export const baseUrl = BASE_URL

const config: (t: ContextApi['t']) => ConfigMenuItemsType[] = (t) =>
  Nav.map((menu) => ({ ...menu, href: menu.href, label: t(menu.label) }))

export default config

export const FooterLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) =>
  footerLinks.map(({ label, items }) => ({
    label: t(label),
    items: items.map((subItem) => ({ label: t(subItem.label), href: subItem.href })),
  }))

export const Socials = [
  {
    label: 'Twitter',
    href: 'https://twitter.com/fortcake',
  },
  {
    label: 'Discord',
    href: 'https://discord.com/invite/FAqUbJXzN9',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/fortcake_official/',
  },
  {
    label: 'Medium',
    href: 'https://fortcake.medium.com/',
  },
  {
    label: 'BscScan',
    href: 'https://bscscan.com/token/0xe2396e7c39b1ca1990b0e3bd5d44ebc19225ad58',
  },
  {
    label: 'PancakeSwap',
    href: 'https://pancakeswap.finance/',
  },
  {
    label: 'CoinGecko',
    href: 'https://www.coingecko.com/',
  },
  {
    label: 'Telegram',
    href: 'https://t.me/joinchat/iPHYn9_M_cxiMTMx',
  },
]
