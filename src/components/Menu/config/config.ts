import { MenuItemsType, FooterLinkType } from 'fortcake-uikit-v2'

type socialLinksTypes = {
  label: string
  icon: string
  href: string
  items?: socialLinksTypes[]
}

export enum Links {
  BASE_URL = 'fortcake.io',
  GAMES = '/play',
  BNB = '/swap',
  COOKIES = '/legal/cookies',
  PRIVACY = '/legal/privacy',
  TERMS = '/legal/terms',
  SUBMITGAME = 'https://forms.gle/dwGAFXQ9yP8e5VcR8',
  TWITTER = 'https://twitter.com/fortcake',
  TELEGRAM = 'https://t.me/joinchat/iPHYn9_M_cxiMTMx',
  REDDIT = 'https://www.reddit.com/user/fortcakeofficial',
  INSTAGRAM = 'https://www.instagram.com/fortcake_official/',
  GITHUB = 'https://github.com/fortcake/',
  DISCORD = 'https://discord.com/invite/FAqUbJXzN9',
  GOVERNANCE = 'https://snapshot.org/#/fortcake.eth/about',
  GUIDES = 'https://fortcake.gitbook.io/fortcake/',
  FAQ = 'https://fortcake.gitbook.io/fortcake/10.-faq',
  TOKEN = 'https://fortcake.gitbook.io/fortcake/',
  BLOG = 'https://fortcake.medium.com/',
  BSCSCAN = 'https://bscscan.com/token/0x2f477a472f4657f7917126a663b5affe94d5a2b6',
}

export const Nav: MenuItemsType[] = [
  {
    label: 'Home',
    href: `https://${Links.BASE_URL}`,
    icon: 'Home',
  },
  {
    label: 'Play',
    href: Links.GAMES,
    icon: 'Nft',
    useRouterLink: true,
  },
  {
    label: 'Swap',
    href: Links.BNB,
    icon: 'Swap',
    useRouterLink: true,
  },
  {
    label: 'Community',
    href: Links.DISCORD,
    icon: 'Groups',
  },
  {
    label: 'Submit your game',
    href: Links.SUBMITGAME,
    showOnMobile: false,
    isExternal: true,
  },
]

export const Socials: socialLinksTypes[] = [
  {
    label: 'Twitter',
    icon: 'Twitter',
    href: Links.TWITTER,
  },
  {
    label: 'Telegram',
    icon: 'Telegram',
    href: Links.TELEGRAM,
  },
  {
    label: 'Reddit',
    icon: 'Reddit',
    href: Links.REDDIT,
  },
  {
    label: 'Instagram',
    icon: 'Instagram',
    href: Links.INSTAGRAM,
  },
  {
    label: 'Github',
    icon: 'Github',
    href: Links.GITHUB,
  },
  {
    label: 'Discord',
    icon: 'Discord',
    href: Links.DISCORD,
  },
]

export const FooterLinks: Array<FooterLinkType> = [
  {
    label: 'Ecosystem',
    items: [
      {
        label: 'Play',
        href: Links.GAMES,
        useRouterLink: true,
      },
      {
        label: 'Swap',
        href: Links.BNB,
        useRouterLink: true,
      },
      {
        label: 'Governance',
        href: Links.GOVERNANCE,
      },
      {
        label: 'Submit your game',
        href: Links.SUBMITGAME,
      },
      {
        label: 'Community',
        href: Links.DISCORD,
      },
    ],
  },
  {
    label: 'Help',
    items: [
      {
        label: 'Guides',
        href: Links.GUIDES,
      },
      {
        label: 'FAQ',
        href: Links.FAQ,
      },
      {
        label: 'Cookies Policy',
        href: Links.COOKIES,
        isExternal: false,
      },
      {
        label: 'Privacy Policy',
        href: Links.PRIVACY,
        isExternal: false,
      },
      {
        label: 'Terms of Service',
        href: Links.TERMS,
        isExternal: false,
      },
    ],
  },
  {
    label: 'Token',
    items: [
      {
        label: 'Whitepaper',
        href: Links.TOKEN,
      },
      {
        label: 'Blog',
        href: Links.BLOG,
      },
      {
        label: 'BSC Scan',
        href: Links.BSCSCAN,
      },
    ],
  },
  {
    label: 'Social',
    items: [
      {
        label: 'Twitter',
        href: Links.TWITTER,
      },
      {
        label: 'Telegram',
        href: Links.TELEGRAM,
      },
      {
        label: 'Instagram',
        href: Links.INSTAGRAM,
      },
      {
        label: 'Discord',
        href: Links.DISCORD,
      },
    ],
  },
]
