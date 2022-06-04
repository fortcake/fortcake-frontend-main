import { createGlobalStyle } from "styled-components";
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from "fortcake-uikit-v2/dist/theme";
import Bg from "assets/images/bg.svg";
// import BgPink from '../assets/images/bg_pink.png'

declare module "styled-components" {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

export enum GLOBALCLASSES {
  GAMESTYLES = "gameStyles",
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};
    background-image: ${({ theme }) =>
      theme.isDark
        ? `url(${Bg.src})`
        : `url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPC9zdmc+)`};
    ${({ theme }) =>
      theme.isDark &&
      `background-size: cover; background-position: center center;`}        
    img {
      height: auto;
      max-width: 100%;
    }
    &.${GLOBALCLASSES.GAMESTYLES} {
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

export default GlobalStyle;
