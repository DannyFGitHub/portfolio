import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

const verseFonts = ["atomic", "bruno", "jac", "jersey", "shrik", "sour"];

export function FontSwitchingDannyVerse() {
  const [currentVerseFontIndex, setCurrentVerseFontIndex] = useState<number>(0);

  useEffect(() => {
    const fontSwitchInterval = setInterval(
      () =>
        setCurrentVerseFontIndex((prevState) => {
          return (prevState + 1) % verseFonts.length;
        }),
      1000
    );

    return () => clearInterval(fontSwitchInterval);
  }, []);

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h4"
          component="span"
          fontFamily={
            verseFonts[currentVerseFontIndex + (1 % verseFonts.length)]
          }
        >
          Danny
        </Typography>
        <Typography
          variant="h3"
          component="span"
          fontFamily={verseFonts[currentVerseFontIndex]}
        >
          Verse
        </Typography>
      </Box>
    </>
  );
}
