import React from "react";
import { Box, Text, Flex } from "fortcake-uikit-v2";
import Image from "next/image";
import styled from "styled-components";
import green from "assets/images/gamelist/greenfortcakesize.png";
import orange from "assets/images/gamelist/orangefortcakesize.png";
import red from "assets/images/gamelist/redfortcakesize.png";
import yellow from "assets/images/gamelist/yellowfortcakesize.png";
import QuestionHelper from "components/QuestionHelper";

const Wrapper = styled.div`
  position: relative;
`;
const ChildWrapper = styled.div<{ text: string }>`
  &::after {
    content: ${({ text }) => `"${text}"`};
    position: absolute;
    bottom: -15px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 11px;
    width: 50px;
    text-align: center;
    left: -5px;
  }
`;

const ImgWrapper = ({ src, text }: { src: string; text: string }) => (
  <Wrapper>
    <ChildWrapper text={text}>
      <Image width={40} height={40} style={{ width: "38px" }} src={src} />
    </ChildWrapper>
  </Wrapper>
);

const ScoresExplanation = () => {
  return (
    <Box mt={["40px", "40px", "0"]} style={{ alignSelf: "flex-end" }}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="12px">FORTCAKE SCORE METER</Text>
        <QuestionHelper
          text={`
              Score is based on the average of Coingecko Score, Community Score, and Liquidity Score
        `}
          ml="4px"
        />
      </Flex>

      <Flex
        alignItems="center"
        justifyContent="space-between"
        height={40}
        minWidth={185}
      >
        <ImgWrapper src={green.src} text="100-75%" />
        <ImgWrapper src={yellow.src} text="74-50%" />
        <ImgWrapper src={orange.src} text="49-25%" />
        <ImgWrapper src={red.src} text="24-0%" />
      </Flex>
    </Box>
  );
};

export default ScoresExplanation;
