import { Box, Typography, useColorScheme } from "@mui/material";
import BubbleVerseCanvas from "./BubbleVerseCanvas";
import { FontSwitchingDannyVerse } from "./SwitchingAnimationFonts.tsx";
import { ScrollIndicatorAnimated } from "./ScrollDownIndicator.tsx";
import { Key, useEffect } from "react";

export const PORTFOLIO_NAME = "Danny J. Falero";

export const fonts = [
  "atomic",
  "bruno",
  "megrim",
  "concert",
  "faculty",
  "jac",
  "jersey",
  "lavish",
  "start",
  "shrik",
  "sixty",
  "sour",
  "viaoda",
];

export function NameLetterSpread(props: { text: string }) {
  const letters = props.text
    .split("")
    .map((letter: string, index: Key | null | undefined) => (
      <Box
        key={index}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {letter.toUpperCase()}
      </Box>
    ));

  return (
    <Box
      sx={{
        display: "grid",
        width: "100%",
        gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
        gap: 1,
        py: 2,
      }}
    >
      {letters}
    </Box>
  );
}

export function IntroductionOverlay() {
  const { setMode } = useColorScheme();

  useEffect(() => {
    setMode("dark");
  }, []);

  return (
    <Box width="100%" height="100%">
      <Box
        position="fixed"
        style={{
          width: "100%",
          top: 0,
          left: 0,
        }}
        zIndex="1"
      >
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="space-between"
          style={{ opacity: 0.2 }}
        >
          {fonts.map((fontName, index) => {
            return (
              <Typography key={index} variant="body1" fontFamily={fontName}>
                {fontName}
              </Typography>
            );
          })}
        </Box>
      </Box>

      <Box height="100%">
        <Box
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={2}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            <Box
              flex={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <Typography
                width="100%"
                align="justify"
                variant="h1"
                fontFamily="sixty"
              >
                <NameLetterSpread text={PORTFOLIO_NAME} />
              </Typography>
              <Box justifyContent="center">
                <Typography align="center" variant="h3" fontFamily="concert">
                  Software Engineer, Machine Learning Engineer
                </Typography>
              </Box>
              <Box justifyContent="center">
                <Typography align="center" variant="h4" fontFamily="concert">
                  Applied Researcher and PhD Student
                </Typography>
              </Box>
            </Box>
            <Box flex={1}></Box>
            <Box
              flex={1}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                variant="body1"
                component="span"
                align="center"
                fontFamily="faculty"
              >
                Explore the
              </Typography>
              <FontSwitchingDannyVerse />
              <ScrollIndicatorAnimated />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box height="100%">
        <BubbleVerseCanvas
          responses={[
            {
              id: "0",
              data: {
                line1: "Danny",
                line2: "Work",
                navPath: "/work",
              },
            },
            {
              id: "1",
              data: {
                line1: "Danny",
                line2: "Research",
                navPath: "https://arxiv.org/pdf/2410.12589v1",
              },
            },
            {
              id: "2",
              data: {
                line1: "Danny",
                line2: "Projects",
                navPath: "",
              },
            },
            {
              id: "3",
              data: {
                line1: "Danny",
                line2: "Theology",
                navPath: "",
              },
            },
            {
              id: "4",
              data: {
                line1: "Danny",
                line2: "Music",
                navPath: "",
              },
            },
            {
              id: "5",
              data: {
                line1: "Danny",
                line2: "Misc",
                navPath: "/misc",
              },
            },
            {
              id: "6",
              data: {
                line1: "Danny",
                line2: "Advocacy",
                // navPath: "/abolish",
              },
            },
            {
              id: "7",
              data: {
                line1: "Danny",
                line2: "Gallery",
                navPath: "/gallery",
              },
            },
          ]}
          onStopLoadSound={() => {}}
        />
      </Box>
    </Box>
  );
}
