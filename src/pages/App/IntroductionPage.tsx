import { Box, Typography } from "@mui/material";
import BubbleVerseCanvas from "./components/BubbleVerseCanvas";
import { FontSwitchingDannyVerse } from "./components/SwitchingAnimationFonts.tsx";

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

export function NameLetterSpread(props) {
  const letters = props.text.split("").map((letter, index) => (
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

export function IntroductionPage() {
  return (
    <Box display="flex" flexDirection="column" width="100%" height="100%">
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

      <Box
        flex="1"
        width="100%"
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
        >
          <Box display="flex" justifyContent="center" width="100%">
            <Typography
              width="100%"
              align="center"
              variant="h1"
              fontFamily="megrim"
            >
              <NameLetterSpread text={PORTFOLIO_NAME} />
            </Typography>
          </Box>
          <Box justifyContent="center">
            <Typography variant="h6" fontFamily="viaoda">
              Software Engineer, Machine Learning Engineer
            </Typography>
          </Box>
          <Box justifyContent="center">
            <Typography variant="body1" fontFamily="viaoda">
              Applied Researcher and PhD Student
            </Typography>
          </Box>
          <Box
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
          </Box>
        </Box>
      </Box>
      <Box flex="4">
        <BubbleVerseCanvas
          responses={[
            {
              id: "0",
              data: {
                line1: "Danny",
                line2: "Work",
                // navPath: "/work"
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
            // {
            //   id: "2",
            //   data: {
            //     line1: "Danny",
            //     line2: "Projects",
            //     navPath: "",
            //   },
            // },
            // {
            //   id: "3",
            //   data: {
            //     line1: "Danny",
            //     line2: "Theology",
            //     navPath: "",
            //   },
            // },
            // {
            //   id: "4",
            //   data: {
            //     line1: "Danny",
            //     line2: "Music",
            //     navPath: "",
            //   },
            // },
            {
              id: "5",
              data: {
                line1: "Danny",
                line2: "Misc",
                navPath: "/misc",
              },
            },
            // {
            //   id: "6",
            //   data: {
            //     line1: "Danny",
            //     line2: "Advocacy",
            //     // navPath: "/abolish",
            //   },
            // },
            // {
            //   id: "7",
            //   data: {
            //     line1: "Danny",
            //     line2: "Gallery",
            //     // navPath: "/gallery",
            //   },
            // },
          ]}
          onStopLoadSound={() => {}}
        />
      </Box>
    </Box>
  );
}
