import {
  Box,
  Paper,
  ThemeProvider,
  Typography,
  useColorScheme,
} from "@mui/material";

import { FontSwitchingDannyVerse } from "./SwitchingAnimationFonts.tsx";
import { ScrollIndicatorAnimated } from "./ScrollDownIndicator.tsx";
import { Key, useEffect } from "react";
import { theme } from "../../../themes/MainTheme.tsx";

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
  return (
    <ThemeProvider theme={theme}>
      <Box minHeight="100vh" minWidth="100vw">
        <Paper>
          <Box
            width="100%"
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100%"
              p={4}
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
                  component="div"
                  width="100%"
                  align="justify"
                  fontSize={{
                    xs: "4ch",
                    sm: "5ch",
                    md: "8ch",
                    lg: "11ch",
                    xl: "14ch",
                  }}
                  fontFamily="sixty"
                >
                  <NameLetterSpread text={PORTFOLIO_NAME} />
                </Typography>
                <Box justifyContent="center">
                  <Typography align="center" variant="h3" fontFamily="faculty">
                    Software Engineer, Machine Learning Engineer
                  </Typography>
                </Box>
                <Box justifyContent="center" p={1}>
                  <Typography align="center" variant="h4" fontFamily="faculty">
                    Applied Researcher and PhD Student
                  </Typography>
                </Box>
              </Box>

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
                  Scroll to explore the
                </Typography>
                <FontSwitchingDannyVerse />
                <ScrollIndicatorAnimated />
              </Box>
            </Box>
          </Box>
        </Paper>
        <Box
          width="100%"
          height="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        ></Box>
      </Box>
    </ThemeProvider>
  );
}
