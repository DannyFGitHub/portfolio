/**
 * FilmMaking
 */

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

export function FilmMakingContainer() {
  const isDarkTheme = useTheme().palette.mode === "dark";

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box m={6} maxWidth="lg">
        <Typography
          align="left"
          variant="h2"
          fontFamily="faculty"
          style={{
            backgroundImage: `radial-gradient(circle,  ${isDarkTheme ? "white" : "black"}, ${isDarkTheme ? "#222" : "#ddd"})`,
            // Using background has a bug that shows a block background, backgroundImage works better
            color: "transparent",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          "The whole point of making a movie is to design a narrative around the{" "}
          <Link href="https://en.wikipedia.org/wiki/Wilhelm_scream">
            Wilhelm scream
          </Link>
          ."{" "}
        </Typography>
        <Typography m={4} align="right" variant="h4" fontFamily="megrim">
          - Danny J. Falero
        </Typography>
      </Box>
    </Box>
  );
}
