import React from "react";
import { ModalProvider, light, dark } from "fortcake-uikit-v2";
import { Web3ReactProvider } from "@web3-react/core";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
// import { useThemeManager } from "state/user/hooks";
import { getLibrary } from "utils/web3React";
import { LanguageProvider } from "contexts/Localization";
import { RefreshContextProvider } from "contexts/RefreshContext";
import { ToastsProvider } from "contexts/ToastsContext";
import { Store } from "@reduxjs/toolkit";
import {
  ThemeProvider as NextThemeProvider,
  useTheme as useNextTheme,
} from "next-themes";

const StyledThemeProvider = (props) => {
  const { resolvedTheme } = useNextTheme();
  return (
    <ThemeProvider theme={resolvedTheme === "dark" ? dark : light} {...props} />
  );
};

const Providers: React.FC<{ store: Store }> = ({ children, store }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ToastsProvider>
          <HelmetProvider>
            <NextThemeProvider>
              <StyledThemeProvider>
                <LanguageProvider>
                  <RefreshContextProvider>
                    <ModalProvider>{children}</ModalProvider>
                  </RefreshContextProvider>
                </LanguageProvider>
              </StyledThemeProvider>
            </NextThemeProvider>
          </HelmetProvider>
        </ToastsProvider>
      </Provider>
    </Web3ReactProvider>
  );
};

export default Providers;
