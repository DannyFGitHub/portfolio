import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { pages } from "./MiscPages";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";

export function MiscLandingPage() {
  const navigate = useNavigate();

  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography variant="h3">Collection of Miscellanous Things...</Typography>
      <Box>
        {pages.map((page) => (
          <Button
            key={page.display}
            onClick={() => {
              navigate(page.location);
            }}
          >
            <Typography sx={{ textAlign: "center" }}>{page.display}</Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
}
