/* eslint-disable no-multi-assign */
import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  useRef,
} from "react";
import { useWeb3React } from "@web3-react/core";
import {
  Heading,
  RowType,
  Text,
  Flex,
  useMatchBreakpoints,
} from "fortcake-uikit-v2";
import Page from "components/Layout/Page";
import Image from "next/image";
import { useGames, useFetchGamePrices } from "state/games/hooks";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { useTranslation } from "contexts/Localization";
import styled from "styled-components";
import PageHeader from "components/PageHeader";
import SearchInput from "components/SearchInput";
import Select, { OptionProps } from "components/Select/Select";
import { CustomFooter as Footer } from "components/Menu";
import ScoresHelper from "./components/ScoresHelper";
import LoadingSkeleton from "./components/Loading";
import Table from "./components/GameTable/GameTable";
import ParallaxBubbles from "./components/ParallaxBubbles";
import { RowProps } from "./components/GameTable/Row";
import useInitUI from "./hooks/useInitUI";
import { GameProps, DesktopColumnSchema, Categories } from "./components/types";
import LogoCake from "../../assets/images/logo/logo_glasses.png";
import useTheme from "../../hooks/useTheme";
import {
  H2,
  LandingText,
  ControlContainer,
  LabelWrapper,
  FilterContainer,
  ImageWrapper,
} from "./styles";

const NUMBER_OF_GAMES_VISIBLE = 120;

const LaxWrapper = styled.div`
  perspective: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
  &::-webkit-scrollbar {
    z-index: 999;
  }
`;

const LaxContent = styled.div`
  height: 100%;
  transform-style: preserve-3d;
  position: relative;
`;

const Games: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const { account } = useWeb3React();
  const { observerRef, isIntersecting } = useIntersectionObserver();
  const chosenGames = useRef(0);
  const { isMobile } = useMatchBreakpoints();
  const [numberOfGamesVisible, setNumberOfGamesVisible] = useState(
    NUMBER_OF_GAMES_VISIBLE
  );
  const { data: games, userDataLoaded } = useGames();
  const [sortOption, setSortOption] = useState("all");
  const ContainerRef = useRef(null);

  const userDataReady = !account || (!!account && userDataLoaded);

  const selectOptions = useMemo(() => {
    const categories = Object.keys(Categories).map((category) => ({
      label: Categories[category],
      value: Categories[category],
    }));

    return [{ label: "All", value: "all" }, ...categories];
  }, []);

  useFetchGamePrices();
  useInitUI(ContainerRef);

  useEffect(() => {
    if (isIntersecting) {
      setNumberOfGamesVisible((gamesCurrentlyVisible) => {
        if (gamesCurrentlyVisible <= chosenGames.current) {
          return gamesCurrentlyVisible + NUMBER_OF_GAMES_VISIBLE;
        }
        return gamesCurrentlyVisible;
      });
    }
  }, [isIntersecting]);

  const searchGame = useCallback(
    (gamesList: GameProps[]) => {
      modifyParallaxBubbleStyles(false);
      if (sortOption !== "all") modifyParallaxBubbleStyles();
      if (!query) return gamesList;
      modifyParallaxBubbleStyles();
      const lowercaseQuery = query.toLowerCase();
      const gamesToDisplay = gamesList.filter((game) =>
        game.title.toLowerCase().includes(lowercaseQuery)
      );
      return gamesToDisplay;
    },
    [query, sortOption]
  );

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const chosenGamesMemoized = useMemo(() => {
    let activeGames = games;
    if (sortOption !== "all") {
      activeGames = activeGames.filter((game) => sortOption === game.category);
    }

    return searchGame(activeGames).slice(0, numberOfGamesVisible);
  }, [games, numberOfGamesVisible, searchGame, sortOption]);

  chosenGames.current = chosenGamesMemoized.length;

  const rowData = chosenGamesMemoized.map((game) => {
    const row: RowProps = {
      game: {
        ...game,
      },
    };

    return row;
  });

  const renderContent = (): JSX.Element => {
    const columnSchema = DesktopColumnSchema;
    const columns = columnSchema.map((column) => ({
      id: column.id,
      name: column.name,
      label: column.label,
      sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
        switch (column.name) {
          case "game":
            return b.id - a.id;
          default:
            return 1;
        }
      },
      sortable: column.sortable,
    }));

    return rowData.length ? (
      <Table data={rowData} columns={columns} userDataReady={userDataReady} />
    ) : (
      <LoadingSkeleton />
    );
  };

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value);
  };

  const mobileHeaderStyle = isMobile
    ? {
        fontSize: "44px",
        marginRight: "10px",
      }
    : {};

  return (
    <LaxWrapper ref={ContainerRef}>
      <PageHeader background="transparent" mt={!isMobile && "5vh"}>
        <Flex justifyContent="space-between">
          <LandingText>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              mb={isMobile ? "30px" : "20px"}
            >
              <div>
                <Heading as="h2" scale="lg" color="secondary" mt="42px">
                  Welcome to
                </Heading>
                <Heading
                  as="h1"
                  scale="xxl"
                  color="secondary"
                  style={{
                    ...mobileHeaderStyle,
                    textShadow: isDark
                      ? "3px -2px 1px rgb(25 159 125), -3px 3px 1px rgb(33 229 180)"
                      : "#f1afc2 3px -2px 1px, #bb5768 -3px 3px 1px",
                  }}
                >
                  FORTCAKE
                </Heading>
              </div>
              <ImageWrapper className="showOnMobile" mt="60px">
                <Image
                  src={LogoCake.src}
                  width={100}
                  height={78}
                  loading="lazy"
                />
              </ImageWrapper>
            </Flex>
            <H2 as="h2" override>
              Find PLAY-TO-EARN games, Swap tokens and join our community!
              Featuring top crypto games on the Binance Smart Chain...
            </H2>
          </LandingText>
          <ImageWrapper mt="20px">
            <Image src={LogoCake.src} width={430} height={336} loading="lazy" />
          </ImageWrapper>
        </Flex>
      </PageHeader>
      <LaxContent>
        <ParallaxBubbles />
        <Page>
          <ControlContainer>
            <FilterContainer>
              <LabelWrapper>
                <Text textTransform="uppercase">{t("Search")}</Text>
                <SearchInput
                  onChange={handleChangeQuery}
                  placeholder="Search Games"
                />
              </LabelWrapper>
              <LabelWrapper style={{ marginLeft: 24 }}>
                <Text textTransform="uppercase">{t("Category")}</Text>
                <Select
                  onOptionChange={handleSortOptionChange}
                  options={selectOptions}
                />
              </LabelWrapper>
            </FilterContainer>
            <ScoresHelper />
          </ControlContainer>
          {renderContent()}
          <div ref={observerRef} />
        </Page>
        <Footer />
      </LaxContent>
    </LaxWrapper>
  );
};

export default Games;

function modifyParallaxBubbleStyles(addClass = true) {
  const styleClassName = "overrideStyles";
  const bubblesClassName = "parallaxBubbles";
  const bubbles = Array.from(
    document.getElementsByClassName(
      bubblesClassName
    ) as HTMLCollectionOf<HTMLElement>
  );
  bubbles.forEach((bubble) => {
    if (addClass) {
      bubble.classList.add(styleClassName);
    } else {
      bubble.classList.remove(styleClassName);
    }

    setTimeout(() => {
      // eslint-disable-next-line no-param-reassign
      bubble.style.opacity = addClass ? "0" : "1";
    }, 400);
  });
}
