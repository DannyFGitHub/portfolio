import { Box } from "@mui/material";
import { BookshelfCanvas } from "./components/BookshelfCanvas.tsx";

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
