import { Box } from "@mui/material";
import { BookshelfCanvas } from "./components/BookshelfCanvas.tsx";
import { IntroductionOverlay } from "./components/IntroductionOverlay.tsx";

export function IntroductionPage() {
  return (
    <Box height="100%" width="100%">
      <Box position="fixed" width="100%" height="100%" zIndex={-1}>
        <BookshelfCanvas />
      </Box>
      <IntroductionOverlay />
    </Box>
  );
}
