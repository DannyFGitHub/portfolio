import Box from "@mui/material/Box";
import { BookshelfCanvas } from "./components/BookshelfCanvas.tsx";
import { useEffect } from "react";
import { useColorScheme } from "@mui/material/styles";

export function IntroductionPage() {
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    setMode("dark");
  }, []);

  return (
    <Box width="100%" height="100%">
      <BookshelfCanvas />
    </Box>
  );
}
