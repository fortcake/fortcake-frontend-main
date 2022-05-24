import { MenuItemsType, FooterLinkType } from 'fortcake-uikit-v2'
import { ContextApi } from 'contexts/Localization/types'
import { Links, Nav, FooterLinks as footerLinks } from './config'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const NavMenu: (t: ContextApi['t']) => ConfigMenuItemsType[] = (t) =>
  Nav.map((menu) => ({ ...menu, href: menu.href, label: t(menu.label) }))

export default NavMenu

export const FooterLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) =>
  footerLinks.map(({ label, items }) => ({
    label: t(label),
    items: items.map((subItem) => ({ ...subItem, label: t(subItem.label), href: subItem.href })),
  }))

export const Socials = [
  {
    label: 'Twitter',
    href: Links.TWITTER,
  },
  {
    label: 'Discord',
    href: Links.DISCORD,
  },
  {
    label: 'Instagram',
    href: Links.INSTAGRAM,
  },
  {
    label: 'Medium',
    href: Links.BLOG,
  },
  {
    label: 'BscScan',
    href: Links.BSCSCAN,
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
    href: Links.TELEGRAM,
  },
]
